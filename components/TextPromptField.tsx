"use client";
import { FormResponseManager } from "@/classes/FormResponseManager";
import { TextFieldType } from "@prisma/client";
import Image from "next/image";

const TextPromptField = ({
  id,
  title,
  image,
  className,
  type,
}: {
  id: string;
  title: string;
  image?: string;
  className: string;
  type: TextFieldType;
}) => {
  const manager = FormResponseManager.getInstance();

  return (
    <div
      className={
        "w-full flex flex-col bg-neutral-700 p-3 rounded-3xl overflow-hidden work gap-2 text-white " +
        className
      }
    >
      <div className="flex gap-4 justify-between items-start">
        <h1 className="font-semibold text-white text-xl px-2">{title}</h1>
        <div className="bg-neutral-600 rounded-full px-3 py-0 text-sm h-fit">
          {type}
        </div>
      </div>
      {image && (
        <Image
          src={image}
          alt="hello"
          width={500}
          height={500}
          className={"self-center rounded-3xl my-4 w-auto h-auto"}
          loading="lazy"
        />
      )}
      {type === TextFieldType.TEXTAREA ? (
        <textarea
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 placeholder:px-5 resize-none"
          placeholder={"Enter your response"}
          rows={2}
          onChange={(e) => {
            manager.setText(id, e.target.value);
          }}
        ></textarea>
      ) : type === TextFieldType.TEXT ? (
        <input
          type="text"
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 placeholder:px-5 resize-none"
          placeholder={"Enter your response"}
          onChange={(e) => {
            manager.setText(id, e.target.value);
          }}
        />
      ) : type === TextFieldType.EMAIL ? (
        <input
          type="email"
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 placeholder:px-5 resize-none"
          placeholder={"Enter your response"}
          onChange={(e) => {
            manager.setText(id, e.target.value);
          }}
        />
      ) : type === TextFieldType.NUMBER ? (
        <input
          type="number"
          className="w-full py-2 bg-neutral-600 rounded-3xl px-5 outline-none focus:ring-4 ring-neutral-700 duration-200 placeholder:px-5 resize-none"
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
