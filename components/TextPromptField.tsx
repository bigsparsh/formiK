"use client";
import { FormResponseManager } from "@/classes/FormResponseManager";
import { TextFieldType } from "@prisma/client";
import Image from "next/image";
import {
  FaAsterisk,
  FaEnvelope,
  FaHeading,
  FaIndent,
  FaSortNumericUp,
} from "react-icons/fa";

const TextPromptField = ({
  id,
  title,
  image,
  className,
  type,
  required,
}: {
  id: string;
  required: boolean;
  title: string;
  image?: string;
  className: string;
  type: TextFieldType;
}) => {
  const manager = FormResponseManager.getInstance();

  return (
    <div
      className={
        "w-full flex flex-col bg-neutral-700 p-2 md:p-3 rounded-3xl work gap-1 md:gap-2 text-white relative text-sm md:text-base " +
        className
      }
    >
      <div className="absolute -top-2 -right-2 flex flex-col gap-0 py-1 bg-neutral-600 rounded-full">
        {required && (
          <FaAsterisk
            width={16}
            height={16}
            className="text-3xl font-semibold p-2"
          />
        )}
        {type === TextFieldType.TEXTAREA ? (
          <FaIndent
            width={16}
            height={16}
            className="text-3xl font-semibold p-2"
          />
        ) : type === TextFieldType.TEXT ? (
          <FaHeading
            width={16}
            height={16}
            className="text-3xl font-semibold p-2"
          />
        ) : type === TextFieldType.EMAIL ? (
          <FaEnvelope
            width={16}
            height={16}
            className="text-3xl font-semibold p-2"
          />
        ) : type === TextFieldType.NUMBER ? (
          <FaSortNumericUp
            width={16}
            height={16}
            className="text-3xl font-semibold p-2"
          />
        ) : null}
      </div>
      <div className="flex gap-2 md:gap-3 xl:gap-4 justify-between items-start">
        <h1 className="font-semibold text-white text-base md:text-xl px-2">
          {title}
        </h1>
      </div>
      {image && (
        <Image
          src={image}
          alt="hello"
          width={500}
          height={500}
          className={
            "self-center rounded-3xl my-2 md:my-3 xl:my-4 w-auto h-auto"
          }
          loading="lazy"
        />
      )}
      {type === TextFieldType.TEXTAREA ? (
        <textarea
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-600 duration-200 placeholder:px-5 resize-none"
          placeholder={"Enter your response"}
          rows={2}
          onChange={(e) => {
            manager.setText(id, e.target.value);
          }}
        ></textarea>
      ) : type === TextFieldType.TEXT ? (
        <input
          type="text"
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-600 duration-200 placeholder:px-5 resize-none"
          placeholder={"Enter your response"}
          onChange={(e) => {
            manager.setText(id, e.target.value);
          }}
        />
      ) : type === TextFieldType.EMAIL ? (
        <input
          type="email"
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-600 duration-200 placeholder:px-5 resize-none"
          placeholder={"Enter your response"}
          onChange={(e) => {
            manager.setText(id, e.target.value);
          }}
        />
      ) : type === TextFieldType.NUMBER ? (
        <input
          type="number"
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-600 duration-200 placeholder:px-5 resize-none"
          placeholder={"Enter your response"}
          onChange={(e) => {
            manager.setText(id, e.target.value);
          }}
        />
      ) : null}
    </div>
  );
};
export default TextPromptField;
