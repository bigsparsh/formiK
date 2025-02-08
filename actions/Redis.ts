/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { FormElement } from "@/app/form/create/page";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import valkey from "ioredis";

export const draftForm = async (formJSON: string, form_id: string) => {
  const form = JSON.parse(formJSON);
  const client = new valkey(process.env.REDIS_URL as string);
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
};

export const getDraftFromKey = async (key: string) => {
  const session = await getServerSession();
  if (!session || !session.user) throw new Error("No session found");
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) throw new Error("No user found");
  const client = new valkey(process.env.REDIS_URL as string);
  const draft = await client.get(`draft-${user.id}|${key}`);
  const res = JSON.parse(draft as string);
  console.log(res);
  return res;
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
  const client = new valkey(process.env.REDIS_URL as string);
  const drafts = await client.keys(`draft-${user.id}|*`);
  try {
    const draftsData: {
      form_properties: {
        title: string;
        cover_image: string;
      };
      formFields: FormElement[];
      draftId: string;
    }[] = await Promise.all(
      drafts.map(async (draft) => {
        const data = await client.get(draft);
        return {
          ...JSON.parse(data as string),
          draftId: draft.split("|")[1],
        };
      }),
    );
    return draftsData;
  } catch (_) {
    return [];
  }
};

export const removeDraft = async (draftId: string) => {
  const session = await getServerSession();
  if (!session || !session.user) throw new Error("No session found");

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) throw new Error("No user found");

  const draftStr = `draft-${user.id}|${draftId}`;
  const client = new valkey(process.env.REDIS_URL as string);

  await client.del(draftStr);
};
