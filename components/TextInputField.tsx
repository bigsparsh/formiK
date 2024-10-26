"use client";
import { FormManager } from "@/classes/FormManager";
import { useRef } from "react";

const TextInputField = ({ id }: { id: number }) => {
  const manager = FormManager.getInstance();
  const textRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-3 text-white">
      <input
        type="text"
        className="w-full py-2 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
        placeholder={"Enter the title of the field " + id}
        ref={textRef}
        onChange={(e) => {
          manager.setTextToField(id, e.target.value as string);
        }}
      />
    </div>
  );
};
export default TextInputField;
