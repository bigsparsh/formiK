"use client";

import { getFormFields } from "@/actions/Form";
import NavBar from "@/components/NavBar";
import { FieldType } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

export type FullFormType = {
  form_id: string;
  title: string;
  field_id: string;
  user_id: string;
  fields: {
    title: string;
    field_id: string;
    type: FieldType;
    form_id: string;
    required: boolean;
    image: string | null;
    is_heading: boolean | null;
    index: number;
    options: {
      field_id: string;
      index: number;
      option_id: string;
      value: string;
    }[];
  }[];
} | null;

const FormPage = ({
  params: { formId },
}: {
  params: {
    formId: string;
  };
}) => {
  const [form, setForm] = useState<FullFormType>();

  const gets = async () => {
    setForm((await getFormFields(formId)) as FullFormType);
  };

  useEffect(() => {
    gets();
    console.log(form);
  }, []);
  return (
    <div
      className="ma h-screen text-neutral-900 flex flex-col items-center"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      <NavBar />
      <div className="w-full max-w-6xl bg-neutral-500 margin-auto mx-10 rounded-none xl:rounded-3xl backdrop-blur-lg overflow-clip">
        <h1 className="p-5 bg-neutral-600 ma text-neutral-50 font-bold text-3xl">
          {" "}
          {form?.title}{" "}
        </h1>
        <form className="text-neutral-200 flex flex-col gap-2">
          {form?.fields.map((field) => {
            switch (field.type) {
              case FieldType.TEXT:
                return (
                  <h2
                    key={crypto.randomUUID()}
                    className="px-4 py-2 text-2xl font-semibold"
                  >
                    {field.title}
                  </h2>
                );
              case FieldType.IMAGE:
                return (
                  <Image
                    src={field.image || ""}
                    alt={field.title}
                    width={500}
                    height={500}
                    className=" mx-10 rounded-3xl bg-cover bg-center h-[300px] self-center"
                  />
                );
              case FieldType.OPTION:
                return <h1 key={crypto.randomUUID()}>hello options</h1>;
            }
          })}
        </form>
      </div>
    </div>
  );
};
export default FormPage;
