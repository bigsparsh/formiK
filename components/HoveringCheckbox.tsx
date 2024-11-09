"use client";
import { motion } from "framer-motion";

const HoveringCheckbox = ({
  positions,
  children,
  delay,
}: {
  positions: string;
  children: React.ReactNode;
  delay: number;
}) => {
  return (
    <motion.div
      animate={{
        y: [0, 25],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
      style={{
        willChange: "transition",
      }}
      className={
        "opacity-50 absolute text-lg md:text-2xl xl:text-3xl flex justify-center items-center gap-4 md:gap-6 px-5 py-2 xl:px-7 xl:py-3 border border-white/50 bg-transparent backdrop-blur rounded-3xl pointer-events-none " +
        positions
      }
    >
      {children}
    </motion.div>
  );
};
export default HoveringCheckbox;
