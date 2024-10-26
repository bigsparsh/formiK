"use client";

import { getFormFields } from "@/actions/Form";
import { FormOutputManager } from "@/classes/FormOutputManager";
import NavBar from "@/components/NavBar";
import { formOutputElements } from "@/recoil/atoms";
import { FieldType } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export type FullFormType = {
  form_id: string;
  title: string;
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
  const [formFields, setFormFields] =
    useRecoilState<JSX.Element>(formOutputElements);
  const [manager, setManager] = useState<FormOutputManager>();

  const gets = async () => {
    setManager(
      FormOutputManager.getInstance(setFormFields, await getFormFields(formId)),
    );
  };

  useEffect(() => {
    gets();
    manager?.createFrontendForm();
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
        <form className="text-neutral-200 flex flex-col gap-2 px-10">
          {formFields}
          <button className="hello">Submit Form</button>
        </form>
      </div>
    </div>
  );
};
export default FormPage;
