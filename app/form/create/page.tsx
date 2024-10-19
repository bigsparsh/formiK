"use client";

import OptionField from "@/components/OptionField";
import { currrentFormField, formElements } from "@/recoil/atoms";
import { FieldType } from "@prisma/client";
import { useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

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
  const fieldContainer = useRef<HTMLDivElement>(null);

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
              className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left"
              onClick={() => {
                setFormFields([
                  ...formFields,
                  {
                    type: FieldType.OPTION,
                    index: formFields[formFields.length - 1]
                      ? formFields[formFields.length - 1].index + 1
                      : 0,
                    options: [
                      {
                        index: 1,
                        value: "Option",
                      },
                    ],
                    title: "New Option field",
                    required: false,
                  },
                ]);
              }}
            >
              Options
            </button>
            <button
              className="rounded-xl px-2 py-1 hover:bg-neutral-700 w-full text-left"
              onClick={() => {
                setFormFields((r) => [
                  ...r,
                  {
                    type: FieldType.TEXT,
                    index: r[r.length - 1] ? r[r.length - 1].index + 1 : 0,
                    title: "New Text field",
                    required: false,
                  },
                ]);
              }}
            >
              Text
            </button>
          </div>
        </div>
        <div className="grow p-10 h-[80vh] overflow-y-scroll">
          <div className="">
            {formFields.length === 0 && (
              <h1 className="p-5 rounded-l-xl border-2 border-dotted border-neutral-600">
                Add the fields for your form here
              </h1>
            )}
            <div className="flex flex-col gap-3" ref={fieldContainer}>
              {formFields.map((field) => {
                if (field.type === FieldType.OPTION) {
                  return (
                    // <h1 key={crypto.randomUUID()}>I am a option field</h1>
                    <OptionField
                      id={field.index ? field.index : 0}
                      key={crypto.randomUUID()}
                    />
                  );
                }
                if (field.type === FieldType.TEXT) {
                  return (
                    <h1 className="" key={crypto.randomUUID()}>
                      Hello 111
                    </h1>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateForm;
