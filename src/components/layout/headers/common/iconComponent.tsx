import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { Media } from "reactstrap";
import i18next from "../../../../config/constant/i18n";
import { CurrencyContext } from "../../../../contexts/Currency/CurrencyContext";
import { getAuth, removeAuth } from "../../../../helpers/auth/AuthHelper";
import { removeLocal } from "../../../../helpers/storage";
import SearchOverlay from "./search-overlay";

import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import currency from "../../../../config/constant/currency.json";
import language from "../../../../config/constant/langConfig.json";
import CartDrowner from "../../cart/Cart";
import CartContainer from "../../cart/CartContainer";

const heart = "/assets/images/icon/dark/heart_dark.svg";
const avatar = "/assets/images/icon/dark/user_dark.svg";

const heartLight = "/assets/images/icon/heart_white.svg";
const avatarLight = "/assets/images/icon/user_white.svg";

const compareLight = "/assets/images/icon/compare_white.svg";
const compare = "/assets/images/icon/dark/compare_dark.svg";
const settings = "/assets/images/icon/dark/settings_dark.svg";

type Props = {
  data: any;
  icon?: boolean;
  dark?: boolean;
  color?: any;
};

type CareerProps = {
  data: any;
  icon?: boolean;
  dark?: boolean;
  color?: any;
  forceShow?: boolean;
};

export const MenuWishlist: FC<Props> = ({
  data,
  icon,
  dark,
  color = "",
}: any) => {
  let storeData = useSelector(selectStoreData);
  const { data: headerData } = storeData;
  return (
    data?.wishlist &&
    headerData?.store_info?.store_cat_id !== 20 && (
      <>
        {icon ? (
          <li className="mobile-wishlist" style={{ color: color }}>
            <Link href={`/account/profile`}>
              <div className="onhover-div">
                <Media
                  src={
                    headerData?.header?.layout !==
                    "left-logo-on-transparent-back-header"
                      ? heart
                      : heartLight
                  }
                  alt="wishlist"
                  style={{ width: "24px", height: "24px" }}
                  className="img-fluid"
                />
              </div>
            </Link>
          </li>
        ) : (
          <li className="mobile-wishlist">
            <Link href={"/account/profile?tab=wishlist"}>
              <>
                <i
                  className="fa fa-heart"
                  aria-hidden="true"
                  style={{ color: color }}
                ></i>
                <span style={{ color: color }}>wishlist</span>
              </>
            </Link>
          </li>
        )}
      </>
    )
  );
};
export const MenuCompare: FC<Props> = ({
  data,
  icon,
  dark,
  color = "",
}: any) => {
  let storeData = useSelector(selectStoreData);
  const { data: headerData } = storeData;
  return (
    data?.compare &&
    headerData?.store_info?.store_cat_id !== 20 && (
      <>
        {icon ? (
          <li className="mobile-wishlist">
            <Link href={`/product/compare`}>
              <div className="onhover-div">
                <img src={!dark ? compare : compareLight} alt="" />
              </div>
            </Link>
          </li>
        ) : (
          <li className="mobile-wishlist compare-mobile">
            <Link href={`/product/compare`}>
              <>
                <i
                  className="fa fa-random"
                  aria-hidden="true"
                  style={{ color: color }}
                ></i>
                <span style={{ color: color }}>compare</span>
              </>
            </Link>
          </li>
        )}
      </>
    )
  );
};

export const MenuCareer: FC<CareerProps> = ({
  data,
  icon,
  dark,
  color = "",
  forceShow = false,
}: any) => {
  return data?.career || forceShow ? (
    <>
      {icon ? (
        <li className="mobile-wishlist">
          <Link href={`/career/jobs`}>
            <img
              src={!dark ? compare : compareLight}
              alt=""
              style={{ width: "22px", height: "22px" }}
            />
          </Link>
        </li>
      ) : (
        <li className="mobile-wishlist compare-mobile">
          <Link href={`/career/jobs`}>
            <>
              <i
                className="fa-solid fa-briefcase"
                aria-hidden="true"
                style={{ color: color }}
              />

              <span style={{ color: color }}>Career</span>
            </>
          </Link>
        </li>
      )}
    </>
  ) : (
    <></>
  );
};

export const MenuCustomLink: FC<CareerProps> = ({
  data,
  icon,
  dark,
  color = "",
  forceShow = false,
}: any) => {
  return data?.custom_link || forceShow ? (
    <>
      {icon ? (
        <li className="mobile-wishlist">
          <Link href={`${data?.custom_link?.link || "#"}`}>
            <img src={!dark ? compare : compareLight} alt="" />
          </Link>
        </li>
      ) : (
        <li className="mobile-wishlist compare-mobile">
          <Link href={`${data?.custom_link?.link || "#"}`}>
            <>
              <i
                className="fa-solid fa-circle-info"
                aria-hidden="true"
                style={{ color: color }}
              />

              <span style={{ color: color }}>
                {data?.custom_link?.label || "Info"}
              </span>
            </>
          </Link>
        </li>
      )}
    </>
  ) : (
    <></>
  );
};

export const MenuCurrency: FC<Props> = ({ data, icon }) => {
  const Context: any = useContext(CurrencyContext);
  const selectedCurrency = Context.currencyContext.selectedCurrency;

  const changeLanguage = (lng: any) => {
    i18next.changeLanguage(lng);
  };

  let storeData = useSelector(selectStoreData);
  const { data: headerData } = storeData;

  return (
    data?.lang_config &&
    headerData?.store_info?.store_cat_id !== 20 && (
      <li className="onhover-div mobile-setting">
        <div>
          <Media
            src={settings}
            className="img-fluid"
            alt=""
            style={{ width: "24px", height: "24px" }}
          />
        </div>
        <div className="show-div setting">
          <h6>language</h6>
          <ul>
            {language.map((item, i) => (
              <li key={i}>
                <div
                  onClick={() => {
                    changeLanguage(item.val);
                  }}
                >
                  {item.lang}
                </div>
              </li>
            ))}
          </ul>
          <h6>currency</h6>
          <ul className="list-inline">
            {currency &&
              currency.map((cur, i) => (
                <li key={i}>
                  <div onClick={() => selectedCurrency(cur)}>
                    {cur.symbol} {cur.name}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </li>
    )
  );
};

export const MenuUser: FC<Props> = ({ data, icon, dark, color = "" }) => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>({});
  const [showLogout, setShowLogout] = useState(false);

  let auth = getAuth();

  const handleLogout = () => {
    removeAuth();
    removeLocal("address_list");
    toast.info("Successfully logged out", {
      position: "top-right",
    });
    router.push("/");
  };

  useEffect(() => {
    setProfile(auth);
  }, [auth && auth?.email]);

  const Profile = () => {
    let storeData = useSelector(selectStoreData);
    let storeInfo = storeData?.data;
    return (
      <>
        <Modal
          show={showLogout}
          onHide={() => setShowLogout(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-3 py-3">
            <h4>Are you sure , you want to logout ?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLogout(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleLogout();
                setShowLogout(false);
              }}
            >
              Yes, Logout
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="d-flex align-items-center">
          <div
            className="bg-white border rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: 50, height: 50 }}
          >
            <Media
              src={profile?.profile || ""}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
              className="img-fluid"
              alt=""
            />
          </div>
          <div>
            <Link className="nav-link" href={"/account/profile"}>
              {profile?.name || ""}
            </Link>
          </div>
        </div>
        <ul>
          <li>
            <Link href="/account/profile">Orders</Link>
          </li>
          {storeInfo?.store_info?.business_name?.includes("Edison Power") && (
            <li className="py-2">
              <Link href="/career/jobs/applied">Applied Jobs</Link>
            </li>
          )}
          <li>
            <Link href="/account/settings">Setting</Link>
          </li>
          <li
            onClick={() => setShowLogout(true)}
            className="px-2 mx-1 my-1"
            style={{ color: "#222222" }}
          >
            Logout
          </li>
        </ul>
      </>
    );
  };

  const HoverElement = () => {
    return profile ? (
      <Profile />
    ) : (
      <ul>
        <li style={{ color: "#222222" }}>
          <Link href="/auth/login">Login</Link>
        </li>
        <li>
          <Link href="/auth/register">Register</Link>
        </li>
      </ul>
    );
  };

  // console.log(data?.account)
  return data?.account !== false ? (
    <li
      className={`onhover-dropdown mobile-account nav-account ${
        icon ? "account-icon" : ""
      }`}
    >
      <Link href={"/account/profile"}>
        {icon ? (
          <div className="onhover-div">
            <img
              src={!dark ? avatar : avatarLight}
              alt=""
              style={{ width: "24px", height: "24px" }}
            />
          </div>
        ) : (
          <>
            <i
              className="fa fa-user"
              aria-hidden="true"
              style={{ color: color }}
            ></i>
            <span style={{ color: color }}>my account</span>
          </>
        )}
      </Link>
      <div className="onhover-show-div">
        <HoverElement />
      </div>
    </li>
  ) : (
    <></>
  );
};

type SearchProps = Props & {
  inline?: boolean;
};
export const MenuSearch: FC<SearchProps> = ({ data, inline, dark }) => {
  return (
    data?.search && (
      <>
        <div className="mobile-search">
          <SearchOverlay inline={inline} dark={dark} />
        </div>
      </>
    )
  );
};
export const MenuCard: FC<Props> = ({ data, dark }) => {
  return data?.card_hovaravble ? (
    <CartContainer dark={dark} />
  ) : (
    <CartDrowner layout={"right"} dark={dark} />
  );
};
