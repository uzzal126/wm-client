import { getAuth, removeAuth } from "@/helpers/auth/AuthHelper";
import { removeLocal } from "@/helpers/storage";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ButtonGroup, Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Media } from "reactstrap";
import CategoryMenu from "./categoryMenu";
import FooterContainer from "./footerContainer";
import MainMenu from "./mainMenu";
import Social from "./social";

const MobileMenuHandler = ({ data }: any) => {
  const category_menu = data?.body?.category_menu || [];
  let storeData = useSelector(selectStoreData);
  let headerSettings = storeData?.data?.header;
  const [menuOpen, setMenuOpen] = useState(
    category_menu && Array.isArray(category_menu) && category_menu?.length > 0
      ? "cat"
      : "main"
  );
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    removeAuth();
    removeLocal("address_list");
    router.push("/");
  };

  const router = useRouter();
  let user = getAuth();

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = (theme === "system" ? "light" : theme) || "light";

  return (
    <div>
      <div
        className="bar-style d-flex align-items-center pointer"
        onClick={() => setShow(true)}
      >
        <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i>
      </div>

      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        className="mobile-offcanvas"
      >
        <Offcanvas.Header style={{ background: "white" }}>
          <Offcanvas.Title>
            <div className="d-flex align-items-center">
              {headerSettings?.account &&
              headerSettings?.account !== false &&
              !user ? (
                <>
                  <div
                    className="bg-white border rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: 60, height: 60 }}
                  >
                    <i className="fa fa-user" />
                  </div>
                  <div className="ml-3">
                    <Link href={"/auth/login"}>Login</Link>
                  </div>
                </>
              ) : (
                headerSettings?.account &&
                headerSettings?.account !== false && (
                  <>
                    <Media
                      src={user.profile || ""}
                      style={{ width: 50, height: 50 }}
                      className="border rounded-circle d-flex align-items-center justify-content-center bg-"
                      alt=""
                    />
                    <div className="ml-3">{user.name}</div>
                  </>
                )
              )}
            </div>
          </Offcanvas.Title>
          <button
            className="top-0 btn btn-light position-absolute mobile-menu-close"
            onClick={() => setShow(false)}
          >
            <i className="fa fa-times" />
          </button>
        </Offcanvas.Header>
        <div className="py-3 bg-white">
          <ButtonGroup aria-label="Basic example" className="px-3 w-100">
            {category_menu &&
              Array.isArray(category_menu) &&
              data?.category !== false &&
              category_menu?.length > 0 && (
                <button
                  className="border btn"
                  onClick={() => setMenuOpen("cat")}
                  style={{
                    fontSize: "12px",
                    backgroundColor:
                      menuOpen === "cat" ? "var(--theme-deafult)" : "",
                    borderColor:
                      menuOpen === "cat" ? "var(--theme-deafult)" : "",
                    color: menuOpen === "cat" ? "#fff" : "",
                  }}
                >
                  All Category
                </button>
              )}
            <button
              className="border btn"
              onClick={() => setMenuOpen("main")}
              style={{
                fontSize: "12px",
                borderColor: menuOpen !== "cat" ? "var(--theme-deafult)" : "",
                backgroundColor:
                  menuOpen !== "cat" ? "var(--theme-deafult)" : "",
                color: menuOpen !== "cat" ? "#fff" : "",
              }}
            >
              Main Menu
            </button>
          </ButtonGroup>
        </div>
        <Offcanvas.Body
          className="px-0 pt-0 mobile-menu"
          style={{ background: "white" }}
        >
          <div className="px-3 bg-white shadow">
            {menuOpen === "cat" &&
            data?.category !== false &&
            category_menu &&
            Array.isArray(category_menu) &&
            category_menu?.length > 0 ? (
              <nav>
                <CategoryMenu
                  data={data?.body?.category_menu}
                  setShow={setShow}
                />
              </nav>
            ) : (
              <MainMenu data={data?.body?.primary_menu} setShow={setShow} />
            )}
          </div>
          <div className="p-3 mt-3 bg-white shadow">
            <FooterContainer onClickFunc={() => setShow(false)} />
          </div>
          <div className="p-3 mt-3 bg-white shadow">
            <Social />
          </div>
          {/* END */}
          {!!user && (
            <div className="p-3 mt-3 bg-white shadow">
              {headerSettings?.account && headerSettings?.account !== false && (
                <Link
                  href={"/account/profile"}
                  className="d-flex align-items-center nav-link "
                >
                  <>
                    <i className="fa fa-database" style={{ fontSize: 18 }} />
                    <span className="ml-2">Orders</span>
                  </>
                </Link>
              )}
              {headerSettings?.wishlist &&
                headerSettings?.wishlist !== false && (
                  <Link
                    href={"/account/profile?tab=wishlist"}
                    className="border-0 d-flex align-items-center nav-link"
                  >
                    <div>
                      <i
                        className="fa-regular fa-heart"
                        style={{ fontSize: 18 }}
                      />
                      <span className="ml-2">My Wishlist</span>
                    </div>
                  </Link>
                )}
            </div>
          )}
          <div className="p-3 mt-3 bg-white shadow">
            {/* <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
              <label htmlFor="dark-switch" className="mb-0">
                <i className="fa fa-sliders" style={{ fontSize: 18 }} />
                <span className="ml-2">Dark Mode</span>
              </label>
              <FormCheck
                type="switch"
                id="dark-switch"
                label=""
                checked={currentTheme === "dark"}
                onClick={() => {
                  setTheme(currentTheme === "light" ? "dark" : "light");
                }}
              />
            </div> */}
            {!!user &&
            headerSettings?.account &&
            headerSettings?.account !== false ? (
              <>
                {}
                <Link
                  href={"/account/settings"}
                  className="d-flex align-items-center nav-link"
                >
                  <>
                    <i className="fa fa-cog" style={{ fontSize: 18 }} />
                    <span className="ml-2">Settings</span>
                  </>
                </Link>

                <Link
                  href={"/account/profile"}
                  className="d-flex align-items-center nav-link"
                >
                  <>
                    <i className="fa fa-user-o" style={{ fontSize: 18 }} />
                    <span className="ml-2">My Account</span>
                  </>
                </Link>

                <button
                  className="bg-transparent border-0 d-flex align-items-center nav-link w-100"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-out" style={{ fontSize: 18 }} />
                  <span className="ml-2">Logout</span>
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default MobileMenuHandler;
