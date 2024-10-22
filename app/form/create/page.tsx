"use client";

import { FormManager } from "@/classes/FormManager";
import { formElements } from "@/recoil/atoms";
import { FieldType } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

export type FormElement = {
  type: FieldType;
  title: string;
  required: boolean;
  index: number;
  options?: {
    value: string;
    index: number;
  }[];
};

const CreateForm = () => {
  const [formFields, setFormFields] = useRecoilState(formElements);
  const [manager, setManager] = useState<FormManager | null>(null);
  // const [fieldRefs, setFieldRefs] = useState<RefObject<HTMLDivElement>[]>();
  const fieldContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!manager) {
      setManager(FormManager.getInstance(setFormFields));
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
      <nav className="p-10 flex justify-between">
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          formiK
        </h1>
      </nav>
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
              manager?.finalizeForm();
            }}
          >
            Finalize Form
          </button>
        </div>
        <div className="grow p-10 h-[80vh] overflow-y-scroll">
          <div className="">
            <div className="flex flex-col gap-3" ref={fieldContainer}>
              {formFields}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateForm;
