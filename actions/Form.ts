"use server";

import { FormElement } from "@/app/form/create/page";
import { RatingGroup } from "@/classes/FormInputManager";
import { formResponseState } from "@/classes/FormResponseManager";
import { prisma } from "@/prisma";
import { FieldType, FileExtension, FontSize, Form } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createForm = async ({
  formProperties,
  formFields,
  ratingGroups,
}: {
  formProperties: {
    title?: string;
    cover?: string;
    publicVisibility: boolean;
    tags: string[];
    responseCount: number;
    responseMessage: string;
  };
  formFields: FormElement[];
  ratingGroups: RatingGroup[];
}): Promise<Form> => {
  const session = await getServerSession();
  if (!session) throw new Error("User not found: " + session);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) throw new Error("User not found: " + session);

  const [ratingMapping] = await Promise.all([
    await prisma.ratingMapping.createManyAndReturn({
      skipDuplicates: true,
      data: ratingGroups.map((ele) => ({
        user_id: user.id,
        group_name: ele.group_name,
        ratingMapping_id: ele.group_id,
      })),
    }),
  ]);

  ratingGroups.map(async (ele) => {
    const mapping = ratingMapping.find(
      (r) => r.ratingMapping_id === ele.group_id,
    );
    if (!mapping) return;
    await prisma.ratingMapping.update({
      where: {
        ratingMapping_id: ele.group_id,
      },
      data: {
        rating_labels: {
          create: ele.rating_labels,
        },
      },
    });
  });

  const newForm = await prisma.form.create({
    data: {
      user_id: user?.id as string,
      title: formProperties.title || "Untitled Form",
      cover_image: formProperties.cover || "https://picsum.photos/1920/1080",
      tags: {
        createMany: {
          data: formProperties.tags.map((tag) => {
            return {
              tagname: tag,
            };
          }),
        },
      },
      settings: {
        create: {
          response_limit: formProperties.responseCount,
          response_message: formProperties.responseMessage,
        },
      },
      fields: {
        create: formFields.map((field) => {
          const commonData = {
            index: field.index,
            title: field.title,
            required: field.required,
            type: field.type as FieldType,
          };

          switch (field.type) {
            case FieldType.TEXT:
              return {
                ...commonData,
                url: field.url as string,
                text_style: {
                  create: {
                    size: field.text_style
                      ? field.text_style.size
                      : FontSize.MD,
                    bold: field.text_style?.bold,
                    italic: field.text_style?.italic,
                    underline: field.text_style?.underline,
                  },
                },
              };
            case FieldType.TEXT_INPUT:
              return {
                ...commonData,
                text_field_type: field.text_field_type,
                max_size: field.max_size,
                url: field.url as string,
                extenstion: field.extension as FileExtension,
              };
            case FieldType.FILE:
              return {
                ...commonData,
                url: field.url as string,
              };
            case FieldType.OPTION:
              return {
                ...commonData,
                multi_select: field.multi_select,
                options: {
                  create: field.options,
                },
              };
            case FieldType.RATING_GROUP:
              return {
                ...commonData,
                rating_mapping: {
                  connect: {
                    ratingMapping_id: field.group_id,
                  },
                },
              };
            default:
              throw new Error("Invalid field type: " + field.type);
          }
        }),
      },
    },
    include: {
      fields: {
        include: {
          options: true,
        },
      },
      tags: true,
      settings: true,
    },
  });

  return newForm;
};

export const getForms = async () => {
  const session = await getServerSession();
  if (!session) throw new Error("User not found: " + session);
  const form = await prisma.form.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    include: {
      form: true,
      tags: true,
      settings: true,
      fields: {
        orderBy: {
          index: "asc",
        },
        include: {
          options: {
            orderBy: {
              index: "asc",
            },
          },
        },
      },
    },
  });

  return form;
};

export const getFormFields = async (formId: string) => {
  const form = await prisma.form.findUnique({
    where: {
      form_id: formId,
    },
    include: {
      tags: true,
      settings: true,
      form: true,
      fields: {
        orderBy: {
          index: "asc",
        },
        include: {
          options: {
            orderBy: {
              index: "asc",
            },
          },
          text_style: true,
        },
      },
    },
  });

  return form;
};

export const submitForm = async (
  formId: string,
  responseState: formResponseState[],
) => {
  const session = await getServerSession();

  if (!session) throw new Error("User not found: " + session);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) throw new Error("User not found: " + session);

  return await prisma.response.create({
    data: {
      form_id: formId,
      user_id: user.id,
      fields: {
        create: responseState.map((field) => {
          if (field.option) {
            return {
              field_id: field.field_id,
              option_index: field.option,
            };
          }
          if (field.text) {
            return {
              field_id: field.field_id,
              text: field.text,
            };
          }
          return {
            field_id: field.field_id,
          };
        }),
      },
    },
  });
};

export const getStatistics = async () => {
  const session = await getServerSession();
  if (!session) throw new Error("User not found");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) throw new Error("User not found");
  const formCount = await prisma.form.count({
    where: {
      user_id: user.id,
    },
  });
  const responseCount = await prisma.response.count({
    where: {
      user_id: user.id,
    },
  });
  return {
    formCount,
    responseCount,
  };
};
