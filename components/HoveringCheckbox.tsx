"use client";
import { motion } from "framer-motion";

const HoveringCheckbox = ({
  positions,
  children,
}: {
  positions: string;
  children: React.ReactNode;
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
      }}
      style={{
        willChange: "transition",
      }}
      className={
        "opacity-50 absolute text-3xl flex justify-center items-center gap-6 px-7 py-3 border border-white/50 bg-transparent backdrop-blur rounded-2xl pointer-events-none " +
        positions
      }
    >
      {children}
    </motion.div>
  );
};
export default HoveringCheckbox;
