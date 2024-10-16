"use client";

import { useAnimate } from "framer-motion";
import { useEffect } from "react";

const SpecialButton = ({
  children,
  options,
  className = "",
}: {
  children: React.ReactNode;
  options: string[];
  className?: string;
}) => {
  const [optionsRef, animate] = useAnimate();
  useEffect(() => {
    setInterval(() => {
      const rand = Math.random() * options.length;
      animate("div", { y: `-${Math.floor(rand) * 1.5}rem` });
    }, 1500);
  }, [animate, options, optionsRef]);

  return (
    <button className={"flex items-center gap-3 self-center " + className}>
      {children}
      <div
        className="relative h-6 margin-0 padding-0 overflow-clip"
        ref={optionsRef}
      >
        {options.map((ele, index) => (
          <div className="text-red-500 leading-6 text-left" key={index}>
            {ele}
          </div>
        ))}
      </div>
    </button>
  );
};
export default SpecialButton;
