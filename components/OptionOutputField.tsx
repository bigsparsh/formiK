"use client";
import { FormElement } from "@/app/form/create/page";
import { FormOutputManager } from "@/classes/FormOutputManager";
import { FormResponseManager } from "@/classes/FormResponseManager";
import { formStateAtom } from "@/recoil/atoms";
import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const OptionOutputField = ({
  title,
  options,
  field_id,
  className,
  responseManager,
}: {
  title: string;
  options: FormElement["options"];
  field_id: string;
  className?: string;
  responseManager: FormResponseManager;
}) => {
  const [check, animate] = useAnimate();
  const [checked, setChecked] = useState<number>(0);
  const manager = FormOutputManager.getInstance();
  const formState = useRecoilValue(formStateAtom);

  useEffect(() => {
    responseManager.checkRadioField(field_id, checked);
  }, [checked, field_id, responseManager]);

  useEffect(() => {
    if (!formState || !animate) return;
    animate(check.current, {
      y: checked * 300 + "%",
      scale: [1, 2, 1],
    });
  }, [formState, animate, check, checked]);

  return (
    <div
      className={
        "w-full px-10 py-5 space-y-3 border border-neutral-600 rounded-3xl bg-neutral-700 " +
        className
      }
    >
      <h1 className="text-xl">{title}</h1>
      <div className="space-y-2 relative">
        <motion.div
          initial={{
            y: "0%",
          }}
          className="absolute w-3 h-3 rounded-full bg-neutral-50 left-2 top-2"
          ref={check}
        />
        {options?.map((option) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="flex text-lg bg-neutral-600 w-1/4 gap-3 0 rounded-xl items-center h-full overflow-hidden cursor-pointer text-white"
              onClick={() => {
                manager.checkRadioField(field_id, option.index);
                setChecked(option.index);
              }}
            >
              <input
                type="radio"
                value={option.index}
                className="hidden"
                radioGroup="this"
                checked={checked === option.index}
                onChange={() => { }}
              />
              <div className="w-7 h-7 bg-neutral-800/90 "> </div>
              <label>{option.value}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OptionOutputField;
