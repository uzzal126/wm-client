import { getAuth, removeAuth } from "@/helpers/auth/AuthHelper";
import { removeLocal } from "@/helpers/storage";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, DropdownButton, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartDrowner from "../../../cart/Cart";
import CartContainer from "../../../cart/CartContainer";
import MobileMenuHandler from "../mobile";

const MiniMenu = ({ data }: any) => {
  const router = useRouter();
  let auth = getAuth();
  let storeData = useSelector(selectStoreData);
  let storeInfo = storeData?.data;
  let headerSettings = storeData?.data?.header;
  const [active, setActive] = useState(
    router.pathname === "/" ? "/home" : router.pathname
  );
  const [profile, setProfile] = useState({});
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    // console.log("store cat id", storeInfo?.store_info?.store_cat_id);
    window.addEventListener("scroll", handleScroll);
    setProfile(auth);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, auth && auth?.email]);

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 100) {
      document?.getElementById("mobile-mini-menu")?.classList.add("fixed");
    } else {
      document?.getElementById("mobile-mini-menu")?.classList.remove("fixed");
    }
  };

  const handleLogout = () => {
    removeAuth();
    removeLocal("address_list");
    router.push("/");
  };

  const HoverElement = () => {
    return profile ? (
      <ul className="px-2 py-1 d-flex flex-column w-100">
        <Link href="/account/profile">
          <li className="py-2">Orders</li>
        </Link>
        <Link href="/account/settings">
          <li className="py-2">Settings</li>
        </Link>
        {
          storeInfo?.store_info?.business_name?.includes('Edison Power') && (
        <li className="py-2">
          <Link href="/career/jobs/applied" >
            Applied Jobs
          </Link>
        </li>
          )
        }
        {/* {
          headerSettings?.career && headerSettings?.career !== false && (
        <li className="py-2">
          <Link href="/career/jobs/applied" >
            Applied Jobs
          </Link>
        </li>
          )
        } */}
        <li className="py-2">
          <Link href="/" onClick={() => setShowLogout(true)}>
            Logout
          </Link>
        </li>
      </ul>
    ) : (
      <ul className="px-2 py-1 d-flex flex-column">
        <Link href="/auth/login">
          <li className="py-2 w-100">Login</li>
        </Link>
        <Link href="/auth/register">
          <li className="py-2">Register</li>
        </Link>
      </ul>
    );
  };

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
        <Modal.Body className="px-2 py-2">
          Are You Sure , You Want To Logout ?
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
      <div
        id="mobile-mini-menu"
        className="fixed px-3 mobile-fix-option align-items-center justify-content-between"
      >
        <div
          className={`mobile-icon ${active === "/menu" ? "active" : ""}`}
          onClick={() => setActive("/menu")}
        >
          <div className="menu-icon">
            <MobileMenuHandler data={data} />
          </div>
          <span className="menu-text">Menu</span>
        </div>
        <div
          className={`mobile-icon ${active === "/shop" ? "active" : ""}`}
          onClick={() => setActive("/shop")}
        >
          <Link
            href={
              storeInfo?.store_info?.store_cat_id === 20 ? "/blogs" : "/shop"
            }
          >
            <>
              <div className="menu-icon">
                <i
                  className={`fa ${
                    storeInfo?.store_info?.store_cat_id === 20
                      ? "fa-rss-square"
                      : "fa-shopping-bag"
                  }`}
                />
              </div>
              <span className="menu-text">
                {storeInfo?.store_info?.store_cat_id === 20 ? "BLogs" : "Shop"}
              </span>
            </>
          </Link>
        </div>
        <div
          className={`mobile-icon ${active === "/home" ? "active" : ""}`}
          onClick={() => setActive("/home")}
        >
          <Link href={"/"}>
            <>
              <div className="menu-icon">
                <i className="fa fa-home" />
              </div>
              <span className="menu-text">Home</span>
            </>
          </Link>
        </div>
        {headerSettings?.cart && headerSettings?.cart !== false && (
          <div
            className={`mobile-icon ${active === "/cart" ? "active" : ""}`}
            onClick={() => setActive("/cart")}
          >
            <div className="menu-icon">
              {data?.header?.card_hovaravble ? (
                <CartContainer dark={false} />
              ) : (
                <CartDrowner layout={"right"} />
              )}
            </div>
            <span className="menu-text">Cart</span>
          </div>
        )}
        {headerSettings?.account && headerSettings?.account !== false && (
          <div
            className={`mobile-icon ${active === "/account" ? "active" : ""}`}
            onClick={() => setActive("/account")}
          >
            <DropdownButton
              as={ButtonGroup}
              id={`dropdown-button-drop-up`}
              drop={"up"}
              variant="secondary"
              title={
                <>
                  <span className="menu-icon">
                    <i className="fa fa-user" />
                  </span>
                  <span className="menu-text">Profile</span>
                </>
              }
            >
              <>
                <div className="onhover-show-div d-flex flex-column">
                  <HoverElement />
                </div>
              </>
            </DropdownButton>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniMenu;
