import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  //console.log(src)
  return `${src}`;
};

export const ImageHelper = ({ src, alt, className, style }) => {
  return (
    <div
      className="object-contain w-auto h-auto position-relative"
      style={{ ...style, objectFit: "cover" }}>
      <Image
        loading="lazy"
        alt={alt || ""}
        src={src || ""}
        // loader={myLoader}
        width={600}
        height={620}
        objectFit
        // style={{ objectFit: 'cover' }}
        className={`object-contain mw-100 ${className || ""}`}
      />
    </div>
  );
};
