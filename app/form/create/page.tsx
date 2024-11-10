"use client";

import { FormInputManager } from "@/classes/FormInputManager";
import NavBar from "@/components/NavBar";
import { formInputElements } from "@/recoil/atoms";
import { FieldType, FontSize, TextFieldType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaCaretRight, FaEdit, FaTimes } from "react-icons/fa";
import { useRecoilState } from "recoil";
import CreateInventory from "@/components/CreateInventory";

export type FormElement = {
  type: FieldType;
  title: string;
  required: boolean;
  index: number;
  multi_select?: boolean;
  max_chars?: number;
  text_style?: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    size: FontSize;
  };
  text_field_type?: TextFieldType;
  image?: string | File;
  options?: {
    value: string;
    index: number;
  }[];
};

const CreateForm = () => {
  const [formFields, setFormFields] = useRecoilState(formInputElements);
  const [manager, setManager] = useState<FormInputManager | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fieldContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showNav, setShowNav] = useState<boolean>(false);

  useEffect(() => {
    if (!manager) {
      setManager(FormInputManager.getInstance(setFormFields));
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
      <NavBar />
      <div className="flex h-fit relative grow">
        <button
          className="w-10 h-10 apsect-square text-white bg-neutral-700 rounded-full absolute flex md:hidden items-center justify-end p-1 -left-5 z-10"
          onClick={() => {
            setShowNav(true);
          }}
        >
          {" "}
          <FaCaretRight />{" "}
        </button>
        <AnimatePresence>
          {showNav && (
            <motion.div
              className="absolute block md:hidden z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                ease: "easeIn",
              }}
            >
              <button
                className="absolute top-2 right-2 text-white z-50 p-2 rounded-xl hover:bg-neutral-600"
                onClick={() => {
                  setShowNav(false);
                }}
              >
                {" "}
                <FaTimes />{" "}
              </button>
              {manager && (
                <CreateInventory
                  className="bg-neutral-600 mb-20 rounded-r-3xl overflow-clip text-white work sticky top-12 h-fit "
                  manager={manager}
                  router={router}
                  fileRef={fileRef}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {manager && (
          <CreateInventory
            className="hidden md:block basis-1/6 bg-neutral-600 mb-20 rounded-r-3xl overflow-clip text-white work sticky top-12 h-fit "
            manager={manager}
            router={router}
            fileRef={fileRef}
          />
        )}
        <div
          className={
            "grow p-3 md:p-7 xl:p-10 h-[90vh] md:h-[80vh] overflow-y-scroll mt-5 md:mt-0 " +
            (showNav && "pointer-events-none")
          }
        >
          <div className="">
            <div className="flex flex-col gap-3" ref={fieldContainer}>
              <div
                className="w-full rounded-3xl bg-neutral-600 flex justify-between items-end h-28 overflow-clip"
                style={{
                  background: (fileName &&
                    `url('${URL.createObjectURL(fileRef.current?.files?.[0] as File)}') center/cover`) as string,
                }}
              >
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  accept="image/*"
                  onChange={() => {
                    if (fileRef.current?.files?.[0]) {
                      setFileName(fileRef.current?.files?.[0].name as string);
                    } else {
                      setFileName(null);
                    }
                  }}
                />
                <input
                  type="text"
                  className="py-2 text-lg md:text-2xl xl:text-3xl mix-blend-hard-light bg-neutral-700/50 hover:bg-neutral-700 focus:bg-neutral-700 rounded-r-full px-5 outline-none duration-200 w-2/3 md:w-1/2 text-white font-semibold placeholder-neutral-100"
                  defaultValue={"Untitled Form"}
                  onChange={(e) => {
                    manager?.setFormTitle(e.target.value);
                  }}
                />
                <FaEdit
                  className="self-start m-4 text-white text-lg md:text-xl xl:text-2xl cursor-pointer"
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                />
              </div>
              {manager?.formFields.length === 0 ? (
                <>
                  <div className="border4 border-neutral-800 border-dashed px-5 py-10 rounded-xl work text-xl font-medium">
                    <FaArrowLeft className="animate-bounce" />
                    Start adding fields to your form
                  </div>
                </>
              ) : (
                formFields
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateForm;
