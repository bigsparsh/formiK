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
        className={`px-10 py-2 ${bold && "font-semibold"} ${italic && "italic"} ${underline && "underline"}} ${() => {
          switch (size) {
            case FontSize.MD:
              return "text-base";
            case FontSize.LG:
              return "text-lg";
            case FontSize.XL:
              return "text-xl";
            default:
              return "text-base";
          }
        }} ${className}`}
      >
        {title}
      </h1>
      {image && (
        <Image
          src={image}
          alt="hello"
          width={500}
          height={500}
          className={"self-center rounded-3xl my-4"}
          loading="lazy"
        />
      )}
    </div>
  );
};
export default TextOutputField;
