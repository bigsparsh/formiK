"use client";

import { getFormFields } from "@/actions/Form";
import { FormOutputManager, FormState } from "@/classes/FormOutputManager";
import NavBar from "@/components/NavBar";
import Toast from "@/components/Toast";
import {
  errorAtom,
  formOutputElements,
  formOutputStateAtom,
} from "@/recoil/atoms";
import {
  Field,
  Form,
  FormSettings,
  FormTags,
  GoogleSheet,
  Option,
  RatingLabel,
  RatingMapping,
  TextStyle,
} from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";

export type FullFormType =
  | (Form & {
    form: GoogleSheet;
    ratingMappings: (RatingMapping & {
      fields: Field[];
      rating_labels: RatingLabel[];
    })[];
    fields: (Field & {
      options: Option[];
      text_style: TextStyle;
    })[];
    tags: FormTags[];
    settings: FormSettings;
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
  const [toastVisibility, setToastVisibility] = useState<boolean>(false);
  const [error, setError] = useRecoilState<string | null>(errorAtom);
  const setFormState = useSetRecoilState<FormState[]>(formOutputStateAtom);
  const router = useRouter();

  const gets = async () => {
    setManager(
      FormOutputManager.getInstance(
        setFormFields,
        setFormState,
        (await getFormFields(formId)) as FullFormType,
        setError,
      ),
    );
  };

  useEffect(() => {
    if (error) {
      setError(error);
      setToastVisibility(true);
      setTimeout(() => {
        setError(null);
        setToastVisibility(false);
      }, 4000);
    }
  }, [error, setError]);

  useEffect(() => {
    setFormFields(<></>);
    // setError("hello");
    // setToastVisibility(true);
    gets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    manager?.createFrontendForm();
  }, [manager]);

  return (
    <div
      className="ma h-screen text-neutral-900 flex flex-col items-center p-2 relative"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      <NavBar />
      <AnimatePresence>
        {toastVisibility && error ? <Toast message={error} /> : null}
      </AnimatePresence>
      <h1
        className="px-5 pt-20 md:pt-24 xl:pt-28 pb-3 bg-neutral-700 ma text-neutral-50 font-bold text-xl md:text-2xl xl:text-3xl mb-10 max-w-6xl rounded-3xl w-full mx-10"
        style={{
          background: `linear-gradient(transparent, #404040 ), url(${manager?.formFields?.cover_image}) center/cover`,
        }}
      >
        {manager?.formFields?.title}
      </h1>
      <div className="w-full max-w-6xl margin-auto mx-10 rounded-3xl backdrop-blur-lg mb-10">
        <form className="text-neutral-200 flex flex-col bg-neutral-600 p-2 md:p-3 rounded-3xl">
          {formFields}
          <button
            className="w-full ma bg-neutral-300 relative text-neutral-800 font-semibold text-2xl py-2 outline-none hover:bg-neutral-50 duration-200 rounded-3xl mt-4 group overflow-clip"
            onClick={async (e) => {
              e.preventDefault();
              manager?.submitForm(router);
            }}
          >
            <FaCheckCircle className="text-neutral-400 top-0 left-10 absolute scale-[3] md:scale-[4] opacity-50 rotate-12 group-hover:rotate-0 duration-200 group-hover:scale-[2] group-hover:text-green-600" />
            <FaCheckCircle className="text-neutral-400 bottom-0 right-10 absolute scale-[3] md:scale-[4] opacity-50 -rotate-12 group-hover:rotate-0 duration-200 group-hover:scale-[2] group-hover:text-green-600" />
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormPage;
