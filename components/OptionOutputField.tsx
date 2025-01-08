"use client";
import { FormElement } from "@/app/form/create/page";
import { FormOutputManager } from "@/classes/FormOutputManager";
import { FormResponseManager } from "@/classes/FormResponseManager";
import { formStateAtom } from "@/recoil/atoms";
import { useAnimate, motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaAsterisk, FaCheck, FaCircle } from "react-icons/fa";
import { useRecoilValue } from "recoil";

const OptionOutputField = ({
  title,
  options,
  field_id,
  className,
  responseManager,
  required,
  multiSelect,
}: {
  required: boolean;
  title: string;
  options: FormElement["options"];
  field_id: string;
  className?: string;
  responseManager: FormResponseManager;
  multiSelect: boolean;
}) => {
  const [check, animate] = useAnimate();
  const [checked, setChecked] = useState<number[]>([]);
  const manager = FormOutputManager.getInstance();
  const formState = useRecoilValue(formStateAtom);

  useEffect(() => {
    responseManager.checkRadioField(field_id, checked);
  }, [checked, field_id, responseManager]);

  useEffect(() => {
    if (!formState || !animate) return;
    if (!multiSelect) {
      animate(
        check.current,
        {
          y: checked[0] * 250 + "%",
          scale: [1, 2, 1],
        },
        {
          duration: 0.25,
          ease: "easeInOut",
        },
      );
    }
  }, [formState, animate, check, checked, multiSelect]);

  return (
    <div
      className={
        "w-full px-3 md:px-7 xl:px-10 pb-5 space-y-3 border border-neutral-600 rounded-3xl bg-neutral-700 relative text-sm md:text-base " +
        className
      }
    >
      {required && (
        <div className="absolute -top-2 -right-2">
          <FaAsterisk
            width={16}
            height={16}
            className="text-3xl font-semibold  bg-neutral-600 border-neutral-300 p-2 rounded-2xl"
          />
        </div>
      )}
      <h1 className="text-base md:text-xl">{title}</h1>
      {!multiSelect ? (
        <div className="space-y-1 md:space-y-2 relative ">
          <motion.div
            initial={{
              y: "0%",
            }}
            className="absolute rounded-full left-2 top-2  md:top-2"
            ref={check}
          >
            <FaCircle className="text-[0.80rem] md:text-sm" />
          </motion.div>
          {options?.map((option) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="flex bg-neutral-600 w-3/4 md:w-1/4 gap-3 0 rounded-xl items-center h-full overflow-hidden cursor-pointer text-white"
                onClick={() => {
                  manager.checkRadioField(field_id, option.index);
                  setChecked([option.index]);
                }}
              >
                <input
                  type="radio"
                  value={option.index}
                  className="hidden"
                  radioGroup="this"
                  checked={checked[0] === option.index}
                  onChange={() => { }}
                />
                <div className="w-7 h-7 bg-neutral-800/90 "> </div>
                <label>{option.value}</label>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-1 md:space-y-2 relative ">
          {options?.map((option) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="flex bg-neutral-600 w-3/4 md:w-1/4 gap-3 0 rounded-xl items-center h-full overflow-hidden cursor-pointer text-white"
                onClick={() => {
                  setChecked((r) => {
                    if (r.includes(option.index)) {
                      return r.filter((i) => i !== option.index);
                    } else {
                      return [...r, option.index];
                    }
                  });
                }}
              >
                <input
                  type="radio"
                  value={option.index}
                  className="hidden"
                  radioGroup="this"
                  checked={checked[0] === option.index}
                  onChange={() => { }}
                />
                <div className="w-7 h-7 bg-neutral-800/90 grid place-items-center">
                  <AnimatePresence mode="popLayout">
                    {checked.includes(option.index) && (
                      <motion.div
                        key={option.index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <FaCheck className="text-[0.80rem] md:text-sm" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <label>{option.value}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default OptionOutputField;
