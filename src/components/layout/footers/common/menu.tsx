import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { useSelector } from "react-redux";

const Menu = ({ data }: any) => {
  let storeData = useSelector(selectStoreData);
  const menu = storeData?.menu_all;
  const getUrl = (id: any) => {
    const obj = menu?.filter((e: any) => e?.id == id)[0];
    if (obj) {
      return obj?.url_type === "page"
        ? `${obj?.url}`
        : `/${obj?.url_type}/${obj?.url}`;
    } else {
      return "#";
    }
  };
  return (
    <ul>
      {data &&
        data.length > 0 &&
        data.map((item: any, i: number) =>
          menu &&
          menu?.length > 0 &&
          menu?.filter((e: any) => e?.id === item?.id) &&
          menu?.filter((e: any) => e?.id === item?.id)?.length > 0 ? (
            <li key={i}>
              <Link href={getUrl(item?.id)} className="mx-2">
                {item?.text}
              </Link>
            </li>
          ) : item.custom ? (
            <li key={i}>
              <Link href={item?.path || "#"} target={item.target} className="">
                {item?.text}
              </Link>
            </li>
          ) : null
        )}
    </ul>
  );
};

export default Menu;
