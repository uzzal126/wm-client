import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../../../redux-handler/reducers/storeDataReducer";

const LogoImage = () => {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  return (
    <Fragment>
      <Link href={"/"}>
        <Image
          src={data?.logo?.light_logo}
          alt="logo"
          className="img-fluid"
          width={220}
          height={56}
        />
      </Link>
    </Fragment>
  );
};

export default LogoImage;
