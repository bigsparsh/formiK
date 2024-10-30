"use server";

import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { FieldType, Form } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createForm = async ({
  formFields,
}: {
  formFields: FormElement[];
}): Promise<Form> => {
  // }): Promise<void> => {
  const session = await getServerSession();
  if (!session) throw new Error("User not found: " + session);

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const newFormData = {
    user_id: user?.id as string,
    title: "This is a new Form",
    fields: {
      create: formFields.map((field) => {
        if (field.type === FieldType.OPTION)
          return {
            type: FieldType.OPTION,
            title: field.title,
            required: field.required,
            index: field.index,
            options: {
              create: field.options?.map((opt) => {
                return {
                  value: opt.value,
                  index: opt.index,
                };
              }),
            },
          };
        if (field.type === FieldType.IMAGE)
          return {
            title: field.title,
            type: FieldType.IMAGE,
            required: field.required,
            index: field.index,
            image: field.image,
          };
        return {
          type: FieldType.TEXT,
          title: field.title,
          required: field.required,
          index: field.index,
        };
      }),
    },
  };
  const newForm = await prisma.form.create({
    // @ts-expect-error "no"
    data: newFormData,
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
        },
      },
    },
  });

  return form;
};
