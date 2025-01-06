/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { createClient } from "redis";

export const draftForm = async (
  form: {
    formFields: FormElement[];
    form_properties: {
      title: string;
      cover: string;
      publicVisibility: boolean;
      tags: string[];
      responseCount: number;
      responseMessage: string;
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

export const getDrafts = async () => {
  const session = await getServerSession();
  if (!session || !session.user) throw new Error("No session found");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) throw new Error("No user found");
  const client = await createClient().connect();
  const drafts = await client.keys(`draft-${user.id}|*`);
  try {
    const draftsData: {
      form_properties: {
        title: string;
        cover_image: string;
      };
      formFields: FormElement[];
    }[] = await Promise.all(
      drafts.map(async (draft) => {
        const data = await client.get(draft);
        return JSON.parse(data as string);
      }),
    );
    await client.disconnect();
    return draftsData;
  } catch (_) {
    await client.disconnect();
    return [];
  }
};
