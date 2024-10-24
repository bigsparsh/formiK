"use server";

import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { FieldType, Form } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createForm = async ({
  formFields,
}: {
  formFields: FormElement[];
  // }): Promise<Form> => {
}): Promise<void> => {
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
      title: "This is a new Form",
      fields: {
        create: formFields.map((field) => {
          if (field.type === FieldType.OPTION)
            return {
              type: field.type,
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
          if (field.type === FieldType.TEXT)
            return {
              type: field.type,
              title: field.title,
              required: field.required,
              index: field.index,
            };
          if (field.type === FieldType.IMAGE)
            return {
              title: field.title,
              type: field.type,
              required: field.required,
              index: field.index,
              image: field.image,
            };
          return {
            type: field.type,
            title: field.title,
            required: field.required,
            index: field.index,
          };
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

export const getFormFields = async (formId: string) => {
  const form = await prisma.form.findUnique({
    where: {
      form_id: formId,
    },
    include: {
      fields: {
        include: {
          options: true,
        },
      },
    },
  });

  return form;
};
