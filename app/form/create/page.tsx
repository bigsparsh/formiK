"use client";

import FieldAdder from "@/components/FieldAdder";
import { useRef, useState } from "react";

export type FormElement = {
  type: "options" | "text";
  label: string;
  options?: string[];
  id: number;
};
const CreateForm = () => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const fieldContainer = useRef<HTMLDivElement>(null);

  return (
    <div
      className="ma h-screen text-neutral-900 p-10"
      style={{
        background:
          "linear-gradient(#ffffff10 10%, transparent 10%) 0 0/ 15px 15px , linear-gradient(90deg, #ffffff10 10%, transparent 10%) 0 0/ 15px 15px, radial-gradient(120% 150% at 50% 50%,transparent, #ffffff50), linear-gradient(60deg, gray 10% 40%, transparent 50% 60%, gray 70% 100%) ,radial-gradient(25% 100% at 50% 10%, lightgray, gray)",
      }}
    >
      {formElements.length === 0 && (
        <FieldAdder setFormFields={setFormElements}>
          <h1 className="p-5 rounded-l-xl border-2 border-dotted border-neutral-600">
            Add the fields for your form here
          </h1>
        </FieldAdder>
      )}
      <div className="" ref={fieldContainer}>
        {formElements.map((field, index) => {
          if (field.type === "options") {
            return (
              <h1 className="" key={crypto.randomUUID()}>
                Hello
              </h1>
            );
          }
        })}
      </div>
    </div>
  );
};
export default CreateForm;
