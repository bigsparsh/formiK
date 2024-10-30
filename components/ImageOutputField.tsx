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
    <div className={className + " grid place-items-center py-2"}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-xl"
      />
    </div>
  );
};

export default ImageOutputField;
