"use client";
import { FormElement } from "@/app/form/create/page";
import { FormInputManager } from "@/classes/FormInputManager";
import { useState } from "react";

const OptionInputField = ({
  id,
  options,
}: {
  id: number;
  options: FormElement["options"];
}) => {
  const [required, setRequired] = useState<boolean>(false);
  const [mutliSelect, setMultiSelect] = useState<boolean>(false);
  const manager = FormInputManager.getInstance();

  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-3 text-white">
      <input
        type="text"
        className="w-full py-2 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
        placeholder="Enter the title of the field"
        onChange={(e) => {
          manager.setTextToField(id, e.target.value);
        }}
      />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          {options?.map((opt) => {
            return (
              <div className="flex gap-3" key={crypto.randomUUID()}>
                <div className="flex">
                  <p className="bg-neutral-800 grid place-items-center w-[4ch] h-full rounded-l-full">
                    {opt.index}
                  </p>
                  <input
                    type="text"
                    className="w-full py-1 bg-neutral-700 rounded-r-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
                    placeholder={"Option"}
                    onChange={(e) => {
                      manager.setTextToOptionField(
                        id,
                        opt.index,
                        e.target.value,
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="basis-1/4 self-end p-3 bg-neutral-700 rounded-3xl flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="font-medium px-2">
              Enter the number of options:
            </label>
            <input
              type="range"
              min={2}
              max={6}
              className="w-full  bg-neutral-700 rounded-full px-5 accent-neutral-700 outline-none"
              onChange={(e) => {
                manager.editOptionCount(id, parseInt(e.target.value));
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-medium px-2">Attributes:</h1>
            <div className="flex gap-3 items-center">
              <button
                className={
                  "hover:cursor-pointer rounded-full px-3 py-1 border box-border outline-none " +
                  (required ? "bg-neutral-600" : "border-neutral-600")
                }
                onClick={() => {
                  setRequired(!required);
                }}
              >
                Field Required
              </button>
              <button
                className={
                  "hover:cursor-pointer rounded-full px-3 py-1 border box-border outline-none " +
                  (mutliSelect ? "bg-neutral-600" : "border-neutral-600")
                }
                onClick={() => {
                  setMultiSelect(!mutliSelect);
                }}
              >
                Multi Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OptionInputField;
