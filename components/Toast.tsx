"use client";
import { motion } from "framer-motion";

const Toast = ({ message }: { message: string }) => {
  return (
    <div className="w-full top-44  grid place-items-center fixed z-50">
      <motion.div
        className="text-lg bg-[gray] text-white work px-5 py-2 font-medium rounded-3xl w-fit"
        initial={{
          y: "-100px",
          opacity: 0,
          filter: "blur(10px)",
          scale: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
        }}
        exit={{
          y: "-100px",
          opacity: 0,
          filter: "blur(10px)",
          scale: 0,
        }}
        layout
      >
        {message}
      </motion.div>
    </div>
  );
};

export default Toast;
