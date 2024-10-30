"use client";
import { FormElement } from "@/app/form/create/page";
import { FormOutputManager } from "@/classes/FormOutputManager";
import { formStateAtom } from "@/recoil/atoms";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const OptionOutputField = ({
  title,
  options,
  field_id,
}: {
  title: string;
  options: FormElement["options"];
  field_id: string;
}) => {
  const [check, animate] = useAnimate();
  const manager = FormOutputManager.getInstance();
  const formState = useRecoilValue(formStateAtom);

  useEffect(() => {
    if (!formState || !animate) return;
    const current = formState.find((state) => state.field_id === field_id);
    const checked = current?.options?.find((option) => option.checked);
    animate(check.current, {
      y: (checked?.index as number) * 300 + "%",
    });
  }, [formState, animate, field_id, check]);

  return (
    <div className="w-full px-10 py-3 space-y-3">
      <h1 className="text-xl">{title}</h1>
      <div className="space-y-2 relative">
        <div
          className="absolute w-3 h-3 rounded-full bg-neutral-400 left-2 top-2"
          ref={check}
        ></div>
        {options?.map((option) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="flex text-lg bg-neutral-700 w-1/4 gap-3 0 rounded-xl items-center h-full overflow-hidden cursor-pointer"
              onClick={() => {
                manager.checkRadioField(field_id, option.index);
              }}
            >
              <input
                type="radio"
                value={option.index}
                className="hidden"
                radioGroup="this"
              />
              <div className="w-7 h-7 bg-neutral-800 "> </div>
              <label>{option.value}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OptionOutputField;
