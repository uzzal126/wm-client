import { kebabCase } from "@/helpers/misc";
// import { IconPickerItem } from "react-fa-icon-picker";

type SocialType = {
  url: string;
  icon: string;
};

type Props = {
  data: SocialType[];
  color?: string;
  size?: number | string;
};
function IconLink({ data, color = "#000", size = 24 }: Props) {
  return (
    <>
      {data?.map((item: SocialType) => (
        <a
          className="px-2"
          style={{ cursor: "pointer", color: "black" }}
          href={item?.url || "#"}
          target="_blank"
          key={item?.url}
        >
          <i
            className={`${
              kebabCase(item?.icon)?.includes("globe") ? "fa" : "fa-brands"
            } ${kebabCase(item?.icon)}`}
            aria-hidden="true"
            style={{ fontSize: size, color: color }}
          ></i>
          {/* <IconPickerItem icon={item?.icon} size={24} color="#000" /> */}
        </a>
      ))}
    </>
  );
}

export default IconLink;
