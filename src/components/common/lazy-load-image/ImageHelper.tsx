import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  style?: any;
};

export const ImageHelper = ({ src, alt, className, style }: Props) => {
  return (
    <div
      className="object-contain w-auto h-auto position-relative"
      style={{ ...style, objectFit: "cover" }}
    >
      <Image
        loading="lazy"
        alt={alt || ""}
        src={src || ""}
        // loader={myLoader}
        width={600}
        height={620}
        // style={{ objectFit: 'cover' }}
        className={`object-contain mw-100 ${className || ""}`}
      />
    </div>
  );
};
