import Image from "next/image";
import { FC } from "react";
// const myLoader = ({ src, width, quality }) => {
//   //console.log(src);
//   return `${src}`;
// };

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: any;
  size?: boolean;
  onClick?: any;
  rounded?: boolean;
};

export const ImageHelper: FC<Props> = ({
  src,
  alt,
  className,
  style,
  size,
  onClick,
  rounded = true,
}) => {
  return src ? (
    <div
      className={`object-contain ${
        !size ? "w-auto h-auto" : ""
      } position-relative ${rounded ? "rounded-sm overflow-hidden" : ""}`}
      style={{ ...style, objectFit: "cover" }}
    >
      <Image
        loading="lazy"
        alt={alt || ""}
        src={src || ""}
        onClick={onClick ? onClick : null}
        // loader={myLoader}
        width={600}
        height={620}
        className={` mw-100 ${className || ""}`}
      />
    </div>
  ) : null;
};
