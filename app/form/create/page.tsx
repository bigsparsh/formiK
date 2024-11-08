"use client";

import { FormInputManager } from "@/classes/FormInputManager";
import NavBar from "@/components/NavBar";
import { formInputElements } from "@/recoil/atoms";
import { FieldType, FontSize, TextFieldType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useRecoilState } from "recoil";

export type FormElement = {
  type: FieldType;
  title: string;
  required: boolean;
  index: number;
  multi_select?: boolean;
  max_chars?: number;
  text_style?: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    size: FontSize;
  };
  text_field_type?: TextFieldType;
  image?: string | File;
  options?: {
    value: string;
    index: number;
  }[];
};

const CreateForm = () => {
  const [formFields, setFormFields] = useRecoilState(formInputElements);
  const [manager, setManager] = useState<FormInputManager | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fieldContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!manager) {
      setManager(FormInputManager.getInstance(setFormFields));
    }
  }, [manager, setFormFields]);

  return (
    <div
      className="ma h-screen text-neutral-900 flex flex-col"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      <NavBar />
      <div className="flex h-fit">
        <div className="basis-1/6 bg-neutral-600 mb-20 rounded-r-3xl overflow-clip text-white work sticky top-12 h-fit">
          <h1 className="px-4 py-2 text-center font-medium text-xl bg-neutral-700">
            Add these to your form
          </h1>
          <div className="px-5 py-2 text-lg">
            <button
              className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left outline-none"
              onClick={() => {
                manager?.addOptionField();
              }}
            >
              Options
            </button>
            <button
              className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left outline-none"
              onClick={() => {
                manager?.addTextField();
              }}
            >
              Text
            </button>
            <button
              className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left outline-none"
              onClick={() => {
                manager?.addImageField();
              }}
            >
              Image
            </button>
          </div>
          <button
            className="bg-neutral-100 text-neutral-800 py-2 text-lg font-medium self-center w-full"
            onClick={() => {
              manager?.finalizeForm(
                fileRef.current?.files?.[0] as File,
                router,
              );
            }}
          >
            Finalize Form
          </button>
        </div>
        <div className="grow p-10 h-[80vh] overflow-y-scroll">
          <div className="">
            <div className="flex flex-col gap-3" ref={fieldContainer}>
              <div
                className="w-full rounded-3xl bg-neutral-600 flex justify-between items-end h-28 overflow-clip"
                style={{
                  background: (fileName &&
                    `url('${URL.createObjectURL(fileRef.current?.files?.[0] as File)}') center/cover`) as string,
                }}
              >
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  accept="image/*"
                  onChange={() => {
                    if (fileRef.current?.files?.[0]) {
                      setFileName(fileRef.current?.files?.[0].name as string);
                    } else {
                      setFileName(null);
                    }
                  }}
                />
                <input
                  type="text"
                  className="py-2 text-3xl mix-blend-hard-light bg-neutral-700/50 hover:bg-neutral-700 focus:bg-neutral-700 rounded-r-full px-5 outline-none duration-200 w-1/2 text-white font-semibold placeholder-neutral-100"
                  defaultValue={"Untitled Form"}
                  onChange={(e) => {
                    manager?.setFormTitle(e.target.value);
                  }}
                />
                <FaEdit
                  className="self-start m-4 text-white text-2xl cursor-pointer"
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                />
              </div>
              {manager?.formFields.length === 0 ? (
                <>
                  <div className="border4 border-neutral-800 border-dashed px-5 py-10 rounded-xl work text-xl font-medium">
                    <FaArrowLeft className="animate-bounce" />
                    Start adding fields to your form
                  </div>
                </>
              ) : (
                formFields
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateForm;
