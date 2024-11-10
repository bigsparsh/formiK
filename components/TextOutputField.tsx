import { FontSize } from "@prisma/client";
import Image from "next/image";

const TextOutputField = ({
  title,
  image,
  className,
  size,
  bold,
  italic,
  underline,
}: {
  title: string;
  image?: string;
  className?: string;
  size?: FontSize;
  bold?: boolean | null;
  italic?: boolean | null;
  underline?: boolean | null;
}) => {
  return (
    <div className="flex flex-col rounded-3xl overflow-clip border border-neutral-700 bg-neutral-700">
      <h1
        className={`px-3 md:px-7 xl:px-10 py-2 ${bold && "font-medium md:font-semibold"} ${italic && "italic"} ${underline && "underline"} ${size === FontSize.SM ? "text-xs md:text-sm" : size === FontSize.MD ? "text-sm md:text-base" : size === FontSize.LG ? "text-base md:text-lg" : size === FontSize.XL ? "text-lg md:text-xl" : "text-xl md:text-2xl"} ${className}`}
      >
        {title}
      </h1>
      {image && (
        <Image
          src={image}
          alt="hello"
          width={500}
          height={500}
          className={"self-center rounded-3xl mt-1 md:my-3 xl:my-4"}
          loading="lazy"
        />
      )}
    </div>
  );
};
export default TextOutputField;
