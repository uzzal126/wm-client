import { kebabCase } from "@/helpers/misc";
import Link from "next/link";
import { FC } from "react";
// import { IconPickerItem } from 'react-fa-icon-picker'

type Props = {
  icon?: any;
  title?: any;
  service?: any;
  link?: any;
  marijuana?: any;
  lastChild?: any;
};

const MasterServiceContent: FC<Props> = ({
  icon,
  title,
  service,
  link,
  marijuana,
  lastChild,
}) => {
  return (
    <div
      className={`${!marijuana ? "media" : ""} ${
        lastChild ? "border-0 m-0" : ""
      }`}
    >
      <i
        className={
          kebabCase(icon)?.includes("fa-reg-clock")
            ? `fa fa-clock mx-2`
            : `${
                kebabCase(icon)?.includes("fa-telegram-plane")
                  ? "fa-brands"
                  : "fa"
              } ${kebabCase(icon)} mx-2`
        }
        aria-hidden="true"
        style={{
          color: "var(--theme-deafult)",
          fontSize: "56px",
          padding: "2px",
        }}
      ></i>
      {/* <IconPickerItem icon={icon || 'FaShoppingCart'} /> */}
      <Link href={link ? link : "#"}>
        <div
          className="media-body"
          style={{
            color: "var(--theme-deafult)",
          }}
        >
          <h4>{title}</h4>
          <div dangerouslySetInnerHTML={{ __html: service }} />
        </div>
      </Link>
    </div>
  );
};

export default MasterServiceContent;
