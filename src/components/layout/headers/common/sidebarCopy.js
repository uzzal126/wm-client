import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { list_to_tree } from "../../../../helpers/misc";
import { selectStoreData } from "../../../../redux-handler/reducers/storeDataReducer";

const SideBar = ({ data }) => {
  const menuList = list_to_tree(data);
  const storeData = useSelector(selectStoreData);

  const allMenus = storeData?.menu_all;

  const linkHandler = item => {
    let getItem = allMenus.filter(f => f.id === item.id);
    closeNav();
    if (getItem.length > 0) {
      getItem = getItem[0];
      if (getItem.url_type === "page") {
        return `/${getItem.url}`;
      } else {
        return `/${item.url_type}/${getItem.url}`;
      }
    }
  };

  const closeNav = () => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "";

      var closemyslide = document.getElementById("mySidenav");
      if (closemyslide) closemyslide.classList.remove("open-side");
    }
  };

  const handleSubmenu = id => {
    const element = document.getElementById(id);
    if (element.classList.contains("sub-arrow")) {
      return;
    }

    if (element?.nextElementSibling?.classList?.contains("opensub1"))
      element.nextElementSibling.classList.remove("opensub1");
    else {
      document.querySelectorAll(".opensub1").forEach(function (value) {
        value.classList.remove("opensub1");
      });
      element?.nextElementSibling?.classList.add("opensub1");
    }
  };

  const handleSubTwoMenu = id => {
    const element = document.getElementById(id);
    if (element.classList.contains("sub-arrow")) return;

    if (element?.nextElementSibling?.classList?.contains("opensub2"))
      element.nextElementSibling.classList.remove("opensub2");
    else {
      document.querySelectorAll(".opensub2").forEach(function (value) {
        value.classList.remove("opensub2");
      });
      element?.nextElementSibling?.classList?.add("opensub2");
    }
  };

  return (
    <Fragment>
      <ul id="sub-menu" className="sidebar-menu">
        {menuList?.length > 0 &&
          menuList?.map((item, indx) => (
            <li key={indx}>
              <div
                id={`id-sidebar-submenu-1-${indx}`}
                className="mt-2 d-flex justify-content-between"
              >
                <Link href={linkHandler(item)} className="py-2 flex-grow-1">
                  {item?.text}
                </Link>
                <div
                  className="mr-2"
                  onClick={e => handleSubmenu(`id-sidebar-submenu-1-${indx}`)}
                >
                  {item?.children?.length > 0 && (
                    <span
                      style={{ cursor: "pointer" }}
                      className="px-2 sub-arrow position-inherit"
                    ></span>
                  )}
                </div>
              </div>

              {item?.children?.length > 0 && (
                <ul className="">
                  {item?.children?.length > 0 &&
                    item?.children?.map((item, indx) => (
                      <li key={indx}>
                        <div
                          id={`id-sidebar-submenu-2-${indx}`}
                          className="d-flex justify-content-between "
                        >
                          <Link
                            href={linkHandler(item)}
                            className="flex-grow-1"
                            style={{
                              fontWeight:
                                item?.children?.length > 0
                                  ? "bolder"
                                  : "normal",
                            }}
                          >
                            {item?.text}
                          </Link>
                          <div
                            className="mr-2"
                            onClick={e =>
                              handleSubTwoMenu(`id-sidebar-submenu-2-${indx}`)
                            }
                          >
                            {item?.children?.length > 0 && (
                              <span
                                style={{ cursor: "pointer" }}
                                className="sub-arrow position-inherit"
                              ></span>
                            )}
                          </div>
                        </div>
                        {item?.children?.length > 0 && (
                          <ul>
                            {item?.children?.length > 0 &&
                              item?.children?.map((item, indx) => (
                                <li key={indx}>
                                  <Link href={linkHandler(item)}>
                                    {item?.text}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

export default SideBar;
