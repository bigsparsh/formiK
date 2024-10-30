const TextOutputField = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return <div className={"text-2xl px-10 py-2 " + className}>{title}</div>;
};
export default TextOutputField;
