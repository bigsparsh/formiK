"use server";

import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { FieldType, FontSize, Form, TextFieldType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { FontFormat } from "@/components/TextInputField";

export const createForm = async ({
  formProperties,
  formFields,
}: {
  formProperties: {
    title?: string;
    cover?: string;
  };
  formFields: FormElement[];
}): Promise<Form> => {
  const session = await getServerSession();
  if (!session) throw new Error("User not found: " + session);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const newForm = await prisma.form.create({
    data: {
      user_id: user?.id as string,
      title: formProperties.title || "Untitled Form",
      cover_image: formProperties.cover || "https://picsum.photos/1920/1080",
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
                text_field_type: TextFieldType.TEXT,
                image: field.image as string,
                text_style: {
                  create: {
                    size: field.text_style
                      ? field.text_style.size
                      : FontSize.MD,
                    bold: field.text_style?.format?.includes(FontFormat.BOLD),
                    italic: field.text_style?.format?.includes(
                      FontFormat.ITALIC,
                    ),
                    underline: field.text_style?.format?.includes(
                      FontFormat.UNDERLINE,
                    ),
                  },
                },
              };
            case FieldType.IMAGE:
              return {
                ...commonData,
                image: field.image as string,
              };
            case FieldType.OPTION:
              return {
                ...commonData,
                multi_select: field.multi_select,
                options: {
                  create: field.options,
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
