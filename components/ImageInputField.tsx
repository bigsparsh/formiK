"use client";

import { FormInputManager } from "@/classes/FormInputManager";
import { useRef, useState } from "react";
import { FaImage, FaImages, FaUpload } from "react-icons/fa";

const ImageInputField = ({ id }: { id: number }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const manager = FormInputManager.getInstance();
  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-3 text-white">
      <input
        ref={fileRef}
        type="file"
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
      <div
        className="aspect-[3/1] bg-neutral-700 rounded-xl flex flex-col  items-center justify-center font-medium text-xl text-white/50 cursor-pointer border border-neutral-500/50 relative overflow-clip"
        style={{
          background: fileName
            ? `url('${URL.createObjectURL(fileRef.current?.files?.[0] as File)}') center/cover`
            : "radial-gradient(100% 100% at 50% 50%, gray ,transparent, transparent)",
        }}
        onClick={() => {
          fileRef.current?.click();
        }}
      >
        <FaImage className="absolute top-10 left-16 text-neutral-500/50 scale-[10] -rotate-12" />
        <FaImages className="absolute bottom-10 right-20 text-neutral-500/50 scale-[10] rotate-12" />
        <FaUpload className="opacity-50 text-4xl mb-4" />
        <p className="leading-4">
          {fileName ? fileName : "Upload an Image " + id}
        </p>
        <p className="text-base font-normal"></p>
      </div>
    </div>
  );
};
export default ImageInputField;
