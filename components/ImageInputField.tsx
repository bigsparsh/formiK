"use client";

import { FormInputManager } from "@/classes/FormInputManager";
import { useRef, useState } from "react";
import { FaImage, FaImages, FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";

const ImageInputField = ({ id }: { id: number }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const manager = FormInputManager.getInstance();
  return (
    <motion.div
      className="w-full flex flex-col bg-neutral-600 rounded-3xl overflow-hidden p-2 md:p-3 work gap-2 md:gap-3 text-white"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      layout
    >
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
        className="aspect-[3/1] bg-neutral-700 rounded-xl flex flex-col  items-center justify-center font-medium text-base md:text-xl text-white/50 cursor-pointer border border-neutral-500/50 relative overflow-clip py-7"
        style={{
          background: fileName
            ? `url('${URL.createObjectURL(fileRef.current?.files?.[0] as File)}') center/cover`
            : "radial-gradient(100% 100% at 50% 50%, gray ,transparent, transparent)",
        }}
        onClick={() => {
          fileRef.current?.click();
        }}
      >
        <FaImage className="absolute top-5 md:top-10 left-5 md:left-16 text-neutral-500/50 scale-[5] md:scale-[9] -rotate-12" />
        <FaImages className="absolute bottom-5 md:bottom-10 right-5 md:right-20 text-neutral-500/50 scale-[6] md:scale-[10] rotate-12" />
        <FaUpload className="opacity-50 text-xl md:text-3xl xl:text-4xl mb-1 md:mb-2 xl:mb-4" />
        {!fileName ? (
          <p className="leading-4 md:text-base xl:text-xl text-sm">
            {fileName ? fileName : "Upload an Image " + id}
          </p>
        ) : (
          <p className="bg-neutral-700 text-neutral-200 px-2 py-1 text-xs md:text-base rounded-full ">
            {fileName}
          </p>
        )}
        <p className="text-base font-normal"></p>
      </div>
    </motion.div>
  );
};
export default ImageInputField;
