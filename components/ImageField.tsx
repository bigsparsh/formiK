"use client";

import { FormManager } from "@/classes/FormManager";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const ImageField = ({ id }: { id: number }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const manager = FormManager.getInstance();
  return (
    <div className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-3 work gap-3 text-white">
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={() => {
          manager.addImagePathToField(id, fileRef.current?.files?.[0]);
          setFileName(fileRef.current?.files?.[0].name as string);
        }}
      />
      <div
        className="h-32 w-full bg-neutral-700 rounded-xl flex flex-col  items-center justify-center font-medium text-xl text-white/50 cursor-pointer border border-neutral-500"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 50%, transparent ,transparent, gray)",
        }}
        onClick={() => {
          fileRef.current?.click();
        }}
      >
        <FaUpload className="opacity-50 text-4xl mb-4" />
        <p className="leading-4">
          {fileName ? fileName : "Upload an Image " + id}
        </p>
        <p className="text-base font-normal"></p>
      </div>
    </div>
  );
};
export default ImageField;
