import { FC } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../../../redux-handler/reducers/storeDataReducer";
import {
  MenuCard,
  MenuCompare,
  MenuCurrency,
  MenuSearch,
  MenuUser,
  MenuWishlist,
} from "./iconComponent";

type Props = {
  hideWishlist?: boolean;
  hideCompare?: boolean;
  hideAccount?: boolean;
  hideSearch?: boolean;
  dark?: boolean;
};

const IconNav: FC<Props> = ({
  hideWishlist,
  hideCompare,
  hideAccount,
  hideSearch,
  dark,
}) => {
  const { data } = useSelector(selectStoreData);

  return (
    <>
      <div className="icon-nav">
        <div className="d-flex align-items-center justify-content-center">
          {!hideSearch && <MenuSearch data={data?.header} dark={dark} />}
          {!hideWishlist && data?.store_info?.store_cat_id !== 20 && (
            <MenuWishlist data={data?.header} dark={dark} icon />
          )}
          {!hideCompare && data?.store_info?.store_cat_id !== 20 && (
            <MenuCompare data={data?.header} dark={dark} icon />
          )}
          {data?.store_info?.store_cat_id !== 20 && (
            <MenuCurrency data={data?.header} dark={dark} icon />
          )}
          {!hideAccount && <MenuUser data={data?.header} dark={dark} icon />}
          {data?.header?.cart !== false &&
            data?.store_info?.store_cat_id !== 20 && (
              <MenuCard data={data?.header} dark={dark} icon />
            )}
        </div>
      </div>
    </>
  );
};

export default IconNav;
