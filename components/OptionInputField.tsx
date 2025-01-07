"use client";
import { FormElement } from "@/app/form/create/page";
import { FormInputManager } from "@/classes/FormInputManager";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaAsterisk, FaCog } from "react-icons/fa";

const OptionInputField = ({
  id,
  options,
  defaultValue,
}: {
  id: number;
  options: FormElement["options"];
  defaultValue?: string;
}) => {
  const [required, setRequired] = useState<boolean>(false);
  const [multiSelect, setMultiSelect] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const manager = FormInputManager.getInstance();

  return (
    <motion.div
      className="w-full flex flex-col bg-neutral-600 rounded-3xl p-2 md:p-3 work gap-2 md:gap-3 text-white relative md:text-base text-sm"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      layout
    >
      <AnimatePresence>
        {required && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-2 -right-2"
          >
            <FaAsterisk
              width={16}
              height={16}
              className="text-3xl font-semibold  bg-neutral-600 border-neutral-300 p-2 rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-1 md:gap-2">
        <input
          type="text"
          className="w-full py-2 bg-neutral-700 rounded-full px-5 outline-none focus:ring-4 ring-neutral-700 duration-200"
          placeholder="Enter the title of the field"
          defaultValue={defaultValue}
          onChange={(e) => {
            manager.setTextToField(id, e.target.value);
          }}
        />
        <button
          className="md:text-sm p-2 rounded-3xl border bg-neutral-700 border-neutral-500 items-center justify-center outline-none"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <FaCog className="text-sm md:text-xl" />
        </button>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
        <div className="flex flex-col gap-1 md:gap-2">
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
                    defaultValue={opt.value}
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
        <AnimatePresence mode="popLayout">
          {expand && (
            <motion.div
              className="md:basis-1/4 self-end p-3 bg-neutral-700 rounded-3xl flex flex-col gap-2 w-full"
              initial={{ opacity: 0, filter: "blur(40px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(40px)" }}
              layout
            >
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
                <div className="flex gap-1 md:gap-3 items-center  flex-wrap">
                  <button
                    className={
                      "hover:cursor-pointer rounded-full px-3 py-1 border box-border outline-none " +
                      (required ? "bg-neutral-600" : "border-neutral-600")
                    }
                    onClick={() => {
                      setRequired((r) => {
                        r = !r;
                        manager.setRequired(id, r);
                        return r;
                      });
                    }}
                  >
                    Field Required
                  </button>
                  <button
                    className={
                      "hover:cursor-pointer rounded-full px-3 py-1 border box-border outline-none " +
                      (multiSelect ? "bg-neutral-600" : "border-neutral-600")
                    }
                    onClick={() => {
                      setMultiSelect((r) => {
                        r = !r;
                        manager.setMultipleChoice(id, r);
                        return r;
                      });
                    }}
                  >
                    Multi Select
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default OptionInputField;
