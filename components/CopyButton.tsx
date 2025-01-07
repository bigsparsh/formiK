"use client";

const CopyButton = ({
  className,
  children,
  copyText,
}: {
  className: string;
  children: React.ReactNode;
  copyText: string;
}) => {
  return (
    <button
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(copyText);
      }}
    >
      {children}
    </button>
  );
};
export default CopyButton;
