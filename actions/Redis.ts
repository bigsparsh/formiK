"use server";
import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { createClient } from "redis";

export const draftForm = async (
  form: {
    formfields: FormElement[];
    form_properties: {
      title: string;
      cover: string;
    };
  },
  form_id: string,
) => {
  const client = await createClient().connect();
  const session = await getServerSession();
  if (!session || !session.user) throw new Error("No session found");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) throw new Error("No user found");
  const keyname = `draft-${user.id}|${form_id}`;
  console.log(keyname);
  await client.set(keyname, JSON.stringify(form));
  await client.disconnect();
};
