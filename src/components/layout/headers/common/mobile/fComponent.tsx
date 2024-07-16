import Link from "next/link";
import { Fragment } from "react";
import { linkHandler } from "../../../../../helpers/misc";

type Props = {
  data: any;
  menu: any;
};

const FComponent = ({ data, menu }: Props) => {
  if (data?.list && Object.keys(data?.list).length <= 0) return <></>;
  return (
    <div>
      {data?.title ? <h4>{data?.title}</h4> : ""}
      {data?.list &&
        Object.keys(data?.list).length &&
        Object.keys(data?.list).map((key, i) => (
          <Fragment key={i}>
            {key.includes("menubar") &&
              data?.list[key]?.list.length > 0 &&
              data?.list[key]?.list.map((item: any, j: number) =>
                menu &&
                menu?.length > 0 &&
                menu?.filter((e: any) => e?.id === item?.id) &&
                menu?.filter((e: any) => e?.id === item?.id)?.length > 0 ? (
                  <Link
                    href={linkHandler(item, menu)}
                    key={j}
                    className="d-flex align-items-center nav-link "
                  >
                    {item?.text}
                  </Link>
                ) : item.custom ? (
                  <Link
                    href={item?.path || "#"}
                    target={item.target}
                    key={j}
                    className="d-flex align-items-center nav-link "
                  >
                    {item?.text}
                  </Link>
                ) : null
              )}
          </Fragment>
        ))}
    </div>
  );
};

export default FComponent;
