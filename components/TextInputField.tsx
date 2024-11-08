"use client";
import { FormInputManager } from "@/classes/FormInputManager";
import { FontSize, TextFieldType } from "@prisma/client";
import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

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
  const [fileName, setFileName] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<FontSize>(FontSize.MD);
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<TextFieldType>(TextFieldType.TEXT);
  const [isInput, setIsInput] = useState<boolean>(false);

  useEffect(() => {
    manager.editTextFieldType(id, fieldType);
    console.log(JSON.stringify(manager.formFields));
  }, [fieldType, id, manager]);

  useEffect(() => {
    if (isInput) {
      tbAnimate(tbRef.current, { x: "100%" });
    } else {
      tbAnimate(tbRef.current, { x: "0%" });
    }
    manager.setTextInput(id, isInput);
  }, [id, isInput, manager, tbAnimate, tbRef]);

  useEffect(() => {
    manager.setTextFormat(id, bold, italic, underline);
  }, [bold, id, italic, manager, underline]);

  useEffect(() => {
    manager.setTextSize(id, fontSize);
  }, [fontSize, id, manager]);

  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-2 text-white">
      <textarea
        className="w-full py-2 bg-neutral-700 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 placeholder:px-5 resize-none"
        placeholder={!isInput ? "Enter text here" : "Enter placeholder here"}
        ref={textRef}
        rows={2}
        onChange={(e) => {
          manager.setTextToField(id, e.target.value as string);
        }}
      ></textarea>
      <div className="flex gap-2">
        <div
          className="basis-1/2 bg-neutral-700 rounded-3xl flex flex-col justify-center items-center  gap-2"
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
        <div className="flex  bg-neutral-700 px-3 pb-3 basis-1/2 rounded-3xl">
          <div className="basis-2/3 flex flex-col ">
            <div
              className={
                "rounded-3xl duration-200 " +
                (!isInput ? "" : "blur-sm pointer-events-none")
              }
            >
              <h1 className="text-lg mt-2 px-2 font-semibold">Font Size</h1>
              <div className="flex gap-2">
                <button
                  className={
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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
              <h1 className="text-lg mt-2 px-2 font-semibold">Formatting</h1>
              <div className="flex gap-2">
                <button
                  className={
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
                    (bold ? "bg-neutral-600" : "bg-neutral-700")
                  }
                  onClick={() => {
                    setBold(!bold);
                  }}
                >
                  Bold
                </button>
                <button
                  className={
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
                    (italic ? "bg-neutral-600" : "bg-neutral-700")
                  }
                  onClick={() => {
                    setItalic(!italic);
                  }}
                >
                  Italics
                </button>
                <button
                  className={
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
                    (underline ? "bg-neutral-600" : "bg-neutral-700")
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
              <h1 className="text-lg mt-2 px-2 font-semibold">Field Type</h1>
              <div className="flex gap-2">
                <button
                  className={
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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
                    "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
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

          <div>
            <h1 className="text-lg mt-2 px-2 font-semibold">
              Show as an input
            </h1>
            <button
              className={
                "h-4 w-10 rounded-full mx-3 my-2 relative flex items-center outline-none " +
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
        </div>
      </div>
    </div>
  );
};
export default TextInputField;
