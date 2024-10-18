"use server";

import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { Form } from "@prisma/client";
import { getServerSession } from "next-auth";

export const createForm = async ({
  formFields,
}: {
  formFields: FormElement[];
}): Promise<Form> => {
  const session = await getServerSession();

  const newForm = await prisma.form.create({
    data: {
      user_id: session?.user.id as string,
      title: "New Form",
      fields: {
        create: formFields.map((field) => {
          return {
            type: field.type,
            title: field.title,
            required: field.required,
            index: field.index,
            create: field.options?.map((opt) => {
              return {
                value: opt.value,
                index: opt.index,
              };
            }),
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
