"use client";
import { FormInputManager } from "@/classes/FormInputManager";
import { FontFormat, FontSize } from "@prisma/client";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const TextInputField = ({ id }: { id: number }) => {
  const manager = FormInputManager.getInstance();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<FontSize>();
  const [formatting, setFormatting] = useState<FontFormat[]>([]);

  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-2 text-white">
      <textarea
        className="w-full py-2 bg-neutral-700 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 placeholder:px-5 resize-none"
        placeholder={"Enter the title of the field " + id}
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
                setFileName(null);
              }
            }}
          />
        </div>
        <div className="flex flex-col bg-neutral-700 px-3 pb-3 basis-1/2 rounded-3xl">
          <h1 className="text-lg mt-2 px-2 font-semibold">Font Size</h1>
          <div className="flex gap-2">
            <button
              className={
                "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
                (fontSize === FontSize.XL ? "bg-neutral-600" : "bg-neutral-700")
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
                (fontSize === FontSize.LG ? "bg-neutral-600" : "bg-neutral-700")
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
                (fontSize === FontSize.MD ? "bg-neutral-600" : "bg-neutral-700")
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
                (fontSize === FontSize.SM ? "bg-neutral-600" : "bg-neutral-700")
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
                (formatting?.includes(FontFormat.BOLD)
                  ? "bg-neutral-600"
                  : "bg-neutral-700")
              }
              onClick={() => {
                if (formatting?.includes(FontFormat.BOLD)) {
                  setFormatting(
                    formatting?.filter((f) => f !== FontFormat.BOLD),
                  );
                } else {
                  setFormatting([...formatting, FontFormat.BOLD]);
                }
              }}
            >
              Bold
            </button>
            <button
              className={
                "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
                (formatting?.includes(FontFormat.ITALIC)
                  ? "bg-neutral-600"
                  : "bg-neutral-700")
              }
              onClick={() => {
                if (formatting?.includes(FontFormat.ITALIC)) {
                  setFormatting(
                    formatting?.filter((f) => f !== FontFormat.ITALIC),
                  );
                } else {
                  setFormatting([...formatting, FontFormat.ITALIC]);
                }
              }}
            >
              Italics
            </button>
            <button
              className={
                "border-neutral-500 duration-200 text-neutral-50 px-3 py-1 rounded-full outline-none box-border border " +
                (formatting?.includes(FontFormat.UNDERLINE)
                  ? "bg-neutral-600"
                  : "bg-neutral-700")
              }
              onClick={() => {
                if (formatting?.includes(FontFormat.UNDERLINE)) {
                  setFormatting(
                    formatting?.filter((f) => f !== FontFormat.UNDERLINE),
                  );
                } else {
                  setFormatting([...formatting, FontFormat.UNDERLINE]);
                }
              }}
            >
              Underline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextInputField;
