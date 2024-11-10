"use client";
import { FormInputManager } from "@/classes/FormInputManager";
import { FontSize, TextFieldType } from "@prisma/client";
import { AnimatePresence, useAnimate, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaAsterisk, FaUpload } from "react-icons/fa";

export enum FontFormat {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
}

const TextInputField = ({ id }: { id: number }) => {
  const manager = FormInputManager.getInstance();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [tbRef, tbAnimate] = useAnimate();
  const [tbRef2, tbAnimate2] = useAnimate();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<FontSize>(FontSize.MD);
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<TextFieldType>(TextFieldType.TEXT);
  const [isInput, setIsInput] = useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(false);

  useEffect(() => {
    manager.editTextFieldType(id, fieldType);
    console.log(JSON.stringify(manager.formFields));
  }, [fieldType, id, manager]);

  useEffect(() => {
    if (isInput) {
      tbAnimate(tbRef.current, { x: "100%" });
    } else {
      tbAnimate(tbRef.current, { x: "0%" });
      setRequired(false);
    }
    manager.setTextInput(id, isInput);
  }, [id, isInput, manager, tbAnimate, tbRef]);

  useEffect(() => {
    if (required) {
      tbAnimate2(tbRef2.current, { x: "100%" });
    } else {
      tbAnimate2(tbRef2.current, { x: "0%" });
    }
    manager.setRequired(id, required);
  }, [id, manager, required, tbAnimate2, tbRef2]);

  useEffect(() => {
    manager.setTextFormat(id, bold, italic, underline);
  }, [bold, id, italic, manager, underline]);

  useEffect(() => {
    manager.setTextSize(id, fontSize);
  }, [fontSize, id, manager]);

  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl p-2 md:p-3 work gap-2 text-white relative">
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
      <textarea
        className="w-full py-2 bg-neutral-700 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 placeholder:px-5 resize-none"
        placeholder={!isInput ? "Enter text here" : "Enter placeholder here"}
        ref={textRef}
        rows={2}
        onChange={(e) => {
          manager.setTextToField(id, e.target.value as string);
        }}
      ></textarea>
      <div className="flex md:flex-row flex-col gap-2">
        <div
          className="basis-1/2 bg-neutral-700 rounded-3xl flex flex-col justify-center items-center py-5 gap-2"
          style={{
            background: (fileName &&
              `url('${URL.createObjectURL(fileRef.current?.files?.[0] as File)}') center/cover`) as string,
          }}
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          {!fileName && (
            <>
              <FaUpload className="text-2xl" />
              <p className="text-base">Upload an image</p>
            </>
          )}
          {fileName && (
            <div className="justify-self-end bg-neutral-700 px-3 py-1 rounded-xl opacity-100 text-sm">
              {fileName}
            </div>
          )}
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={() => {
              if (fileRef.current?.files?.[0]) {
                manager.setImagePathToField(id, fileRef.current?.files?.[0]);
                setFileName(fileRef.current?.files?.[0].name as string);
              } else {
                manager.setImagePathToField(id);
                setFileName(null);
              }
            }}
          />
        </div>
        <div className="flex xl:flex-row flex-col bg-neutral-700 px-3 pb-3 basis-1/2 rounded-3xl">
          <div className="basis-2/3 flex flex-col ">
            <div
              className={
                "rounded-3xl duration-200 " +
                (!isInput ? "" : "blur-sm pointer-events-none")
              }
            >
              <h1 className="text-base md:text-lg mt-2 px-2 font-semibold">
                Font Size
              </h1>
              <div className="flex flex-wrap gap-1 md:gap-2 text-sm md:text-base *:border-neutral-500 *:duration-200 *:text-neutral-50 *:px-3 *:py-1 *:rounded-full *:outline-none *:box-border *:border">
                <button
                  className={
                    " " +
                    (fontSize === FontSize.XL
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFontSize(FontSize.XL);
                  }}
                >
                  Xtra Large
                </button>
                <button
                  className={
                    " " +
                    (fontSize === FontSize.LG
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFontSize(FontSize.LG);
                  }}
                >
                  Large
                </button>
                <button
                  className={
                    " " +
                    (fontSize === FontSize.MD
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFontSize(FontSize.MD);
                  }}
                >
                  Medium
                </button>
                <button
                  className={
                    " " +
                    (fontSize === FontSize.SM
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFontSize(FontSize.SM);
                  }}
                >
                  Small
                </button>
              </div>
              <h1 className="text-base md:text-lg mt-2 px-2 font-semibold">
                Formatting
              </h1>
              <div className="flex flex-wrap gap-1 md:gap-2 text-sm md:text-base *:border-neutral-500 *:duration-200 *:text-neutral-50 *:px-3 *:py-1 *:rounded-full *:outline-none *:box-border *:border">
                <button
                  className={"" + (bold ? "bg-neutral-600" : "bg-neutral-700")}
                  onClick={() => {
                    setBold(!bold);
                  }}
                >
                  Bold
                </button>
                <button
                  className={
                    "" + (italic ? "bg-neutral-600" : "bg-neutral-700")
                  }
                  onClick={() => {
                    setItalic(!italic);
                  }}
                >
                  Italics
                </button>
                <button
                  className={
                    "" + (underline ? "bg-neutral-600" : "bg-neutral-700")
                  }
                  onClick={() => {
                    setUnderline(!underline);
                  }}
                >
                  Underline
                </button>
              </div>
            </div>
            <div
              className={
                "rounded-3xl duration-200 " +
                (isInput ? "" : "blur-sm pointer-events-none")
              }
            >
              <h1 className="text-base md:text-lg mt-2 px-2 font-semibold">
                Field Type
              </h1>
              <div className="flex flex-wrap md:gap-2 *:border-neutral-500 *:duration-200 *:text-neutral-50 *:px-3 *:py-1 *:rounded-full *:outline-none *:box-border *:border ">
                <button
                  className={
                    "" +
                    (fieldType === TextFieldType.EMAIL
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFieldType(TextFieldType.EMAIL);
                  }}
                >
                  Email
                </button>
                <button
                  className={
                    "" +
                    (fieldType === TextFieldType.TEXT
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFieldType(TextFieldType.TEXT);
                  }}
                >
                  Text
                </button>
                <button
                  className={
                    "" +
                    (fieldType === TextFieldType.TEXTAREA
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFieldType(TextFieldType.TEXTAREA);
                  }}
                >
                  TextArea
                </button>
                <button
                  className={
                    "" +
                    (fieldType === TextFieldType.NUMBER
                      ? "bg-neutral-600"
                      : "bg-neutral-700")
                  }
                  onClick={() => {
                    setFieldType(TextFieldType.NUMBER);
                  }}
                >
                  Number
                </button>
              </div>
            </div>
          </div>

          <div className="flex xl:flex-col justify-between">
            <div className="basis-1/2">
              <h1 className="text-base md:text-lg mt-2 px-2 font-semibold">
                Input
              </h1>
              <button
                className={
                  "h-4 w-10 rounded-full mx-2 my-1 relative flex items-center outline-none " +
                  (isInput ? "bg-neutral-500 border" : "bg-neutral-600")
                }
                onClick={() => {
                  setIsInput(!isInput);
                }}
              >
                <div
                  className="h-5 w-5 bg-white rounded-full absolute"
                  ref={tbRef}
                />
              </button>
            </div>

            <div className={"basis-1/2 " + (!isInput ? "blur-sm" : "")}>
              <h1 className="text-base md:text-lg mt-2 px-2 font-semibold">
                Required
              </h1>
              <button
                className={
                  "h-4 w-10 rounded-full mx-2 my-1 relative flex items-center outline-none " +
                  (required ? "bg-neutral-500 border" : "bg-neutral-600")
                }
                onClick={() => {
                  setRequired(!required);
                }}
              >
                <div
                  className="h-5 w-5 bg-white rounded-full absolute"
                  ref={tbRef2}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextInputField;
