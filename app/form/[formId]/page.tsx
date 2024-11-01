"use client";

import { getFormFields } from "@/actions/Form";
import { FormOutputManager, FormState } from "@/classes/FormOutputManager";
import NavBar from "@/components/NavBar";
import { formOutputElements, formStateAtom } from "@/recoil/atoms";
import { Field, Form, Option, TextStyle } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export type FullFormType =
  | (Form & {
    fields: (Field & {
      options: Option[];
      text_style: TextStyle[];
    })[];
  })
  | null;

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
  const setFormState = useSetRecoilState<FormState[]>(formStateAtom);

  const gets = async () => {
    setManager(
      FormOutputManager.getInstance(
        setFormFields,
        setFormState,
        await getFormFields(formId),
      ),
    );
  };

  useEffect(() => {
    gets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    manager?.createFrontendForm();
  }, [manager]);

  return (
    <div
      className="ma h-screen text-neutral-900 flex flex-col items-center"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      <NavBar />
      <div className="w-full max-w-6xl bg-neutral-600 margin-auto mx-10 rounded-none xl:rounded-3xl backdrop-blur-lg overflow-clip">
        <form className="text-neutral-200 flex flex-col">
          {formFields}
          <button className="w-full ma bg-neutral-300 text-neutral-800 font-semibold text-2xl py-2">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormPage;
