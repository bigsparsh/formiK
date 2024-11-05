import Image from "next/image";

const ImageOutputField = ({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;

  width: number;
  height: number;
  className: string;
}) => {
  return (
    <div
      className={
        className + " grid place-items-center py-0 relative overflow-clip"
      }
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-xl absolute scale-150 blur-3xl z-10 opacity-50"
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-xl z-20"
      />
    </div>
  );
};

export default ImageOutputField;
