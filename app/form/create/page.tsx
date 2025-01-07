"use client";

import { FormInputManager } from "@/classes/FormInputManager";
import NavBar from "@/components/NavBar";
import { formInputElements } from "@/recoil/atoms";
import { FieldType, FontSize, TextFieldType } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCaretRight,
  FaCog,
  FaEdit,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import CreateInventory from "@/components/CreateInventory";
import { Input } from "@/components/ui/input";

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
  const [publicVisibility, setPublicVisibility] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const settingRef = useRef<HTMLDialogElement>(null);
  const path = useSearchParams();

  useEffect(() => {
    const draftId = path.get("draftId");
    if (!manager) {
      setManager(FormInputManager.getInstance(setFormFields, draftId!));
    }
  }, [manager, path, setFormFields]);

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
                className="absolute top-1 right-2 text-white z-50 p-2 rounded-xl hover:bg-neutral-600"
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
                  loading={loading}
                  setLoading={setLoading}
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
            loading={loading}
            setLoading={setLoading}
          />
        )}
        <div
          className={
            "grow p-3 md:p-7 xl:p-10 h-[90vh] md:h-[80vh] overflow-y-scroll mt-5 md:mt-0 " +
            (showNav && "pointer-events-none") +
            (loading && " pointer-events-none blur-lg duration-200")
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
                  defaultValue={manager?.formProperties.title}
                  onChange={(e) => {
                    manager?.setFormTitle(e.target.value);
                  }}
                />
                <dialog
                  ref={settingRef}
                  className="rounded-3xl bg-neutral-700 outline-none text-white max-w-md w-full border-4 border-neutral-700 shadow-2xl shadow-black duration-200"
                >
                  <div className="flex justify-between items-center bg-neutral-700 px-3 md:px-5 py-2 md:py-3">
                    <div className="text-xl md:text-2xl font-semibold flex gap-2 items-center">
                      <FaCog /> Form Settings
                    </div>
                    <FaTimes
                      className="text-2xl cursor-pointer opacity-50"
                      onClick={() => {
                        settingRef.current?.close();
                      }}
                    />
                  </div>
                  <div className="p-3 md:p-5 flex flex-col work space-y-2 rounded-3xl bg-neutral-600">
                    <label className="font-semibold text-sm md:text-base">
                      Public Visibility
                    </label>
                    <button
                      className={
                        "hover:cursor-pointer rounded-full px-3 text-sm md:text-base py-1 border-neutral-400 border box-border outline-none duration-200 w-1/2 font-semibold " +
                        (publicVisibility ? "bg-neutral-500" : "")
                      }
                      onClick={() => {
                        setPublicVisibility((r) => {
                          r = !r;
                          manager?.setPublicVisibility(r);
                          return r;
                        });
                      }}
                    >
                      {publicVisibility ? "Public" : "Private"}
                    </button>
                    <label className="font-semibold text-sm md:text-base">
                      Tags
                    </label>
                    <div className="">
                      <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
                        {tags.map((tag, index) => {
                          return (
                            <div
                              className="text-neutral-50 bg-neutral-700 rounded-full px-2 flex gap-2 items-center group border border-transparent hover:border-red-500 cursor-pointer hover:text-red-500"
                              key={index}
                              onClick={() => {
                                const r = tags.filter((r) => r !== tag);
                                setTags(r);
                              }}
                            >
                              {tag}
                              <FaTrashAlt className="text-xs group-hover:text-red-500" />
                            </div>
                          );
                        })}
                      </div>
                      <Input
                        type="text"
                        className="outline-none rounded-full bg-neutral-700 border-none md:text-base text-sm"
                        placeholder="Use Commas to seperate the tags"
                        onChange={(e) => {
                          if (
                            e.target.value[e.target.value.length - 1] === "," &&
                            e.target.value.length > 1
                          ) {
                            const str = e.target.value.replace(",", "");
                            setTags((r) => [str, ...r]);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                    <label className="font-semibold text-sm md:text-base">
                      Response Count
                    </label>
                    <Input
                      className="outline-none rounded-full bg-neutral-700 border-none md:text-base text-sm"
                      type="text"
                      placeholder="Number of responses for each user"
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        if (e.target.value.length > 3) {
                          e.target.value = e.target.value.slice(0, 3);
                        }
                        if (manager)
                          manager.formProperties.responseCount = parseInt(
                            e.target.value,
                          );
                      }}
                    />
                    <label className="font-semibold text-sm md:text-base">
                      Response Message
                    </label>
                    <Input
                      className="outline-none rounded-full bg-neutral-700 border-none md:text-base text-sm"
                      type="text"
                      placeholder="Reponse after form submission"
                      onChange={(e) => {
                        if (manager)
                          manager.formProperties.responseMessage =
                            e.target.value;
                      }}
                    />
                  </div>
                  {
                    // <button className="work text-xl w-full cursor-pointer py-2 font-semibold">
                    //   Save Settings
                    // </button>
                  }
                </dialog>
                <div className="self-start m-4 text-white text-lg md:text-xl xl:text-2xl  flex gap-3">
                  <FaCog
                    className="cursor-pointer"
                    onClick={() => {
                      settingRef.current?.showModal();
                    }}
                  />
                  <FaEdit
                    className="cursor-pointer"
                    onClick={() => {
                      fileRef.current?.click();
                    }}
                  />
                </div>
              </div>
              {manager?.formFields.length === 0 ? (
                <>
                  <div className="border4 border-neutral-800 border-dashed p-5 rounded-xl work text-base md:text-xl font-medium">
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
