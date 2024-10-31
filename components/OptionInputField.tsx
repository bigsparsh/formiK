"use client";
import { FormElement } from "@/app/form/create/page";
import { FormInputManager } from "@/classes/FormInputManager";
import { useRef } from "react";

const OptionInputField = ({
  id,
  options,
}: {
  id: number;
  options: FormElement["options"];
}) => {
  const requiredRef = useRef<HTMLInputElement>(null);
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
                  <p className="bg-neutral-800 grid place-items-center w-[4ch] h-full rounded-l-xl">
                    {opt.index}
                  </p>
                  <input
                    type="text"
                    className="w-full py-1 bg-neutral-700 rounded-r-xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
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
        <div className="basis-1/4 self-end py-2 px-4 bg-neutral-700 rounded-xl flex flex-col gap-1">
          <div>
            <label className="font-medium px-2">
              Enter the number of options:
            </label>
            <input
              type="range"
              min={2}
              max={6}
              className="w-full py-2 bg-neutral-700 rounded-full px-5 accent-neutral-700 outline-none"
              onChange={(e) => {
                manager.editOptionCount(id, parseInt(e.target.value));
              }}
            />
          </div>
          <div className="flex gap-3 items-center">
            <input type="checkbox" className="hidden" ref={requiredRef} />
            <button
              className="hover:cursor-pointer rounded-xl px-3 py-1 border border-neutral-600 box-border"
              onClick={(e) => {
                if (requiredRef.current)
                  if (requiredRef.current?.checked) {
                    requiredRef.current.checked = false;
                    (e.target as HTMLButtonElement).className =
                      "hover:cursor-pointer rounded-xl px-3 py-1 border border-neutral-600";
                    manager.setRequired(id, false);
                  } else {
                    requiredRef.current.checked = true;
                    (e.target as HTMLButtonElement).className =
                      "hover:cursor-pointer rounded-xl px-3 py-1 bg-neutral-600 border";
                    manager.setRequired(id, true);
                  }
              }}
            >
              Field Required
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OptionInputField;
