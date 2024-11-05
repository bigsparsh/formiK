import { FontSize } from "@prisma/client";

const TextOutputField = ({
  title,
  className,
  size,
  bold,
  italic,
  underline,
}: {
  title: string;
  className?: string;
  size?: FontSize;
  bold?: boolean | null;
  italic?: boolean | null;
  underline?: boolean | null;
}) => {
  return (
    <div
      className={`px-10 py-2 ${bold && "font-semibold"} ${italic && "italic"} ${underline && "underline"}} ${() => {
        switch (size) {
          case FontSize.MD:
            return "text-md";
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
    </div>
  );
};
export default TextOutputField;
