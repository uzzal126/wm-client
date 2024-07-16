import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row } from "reactstrap";

import Link from "next/link";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { linkHandler, list_to_tree } from "../../../../helpers/misc";
import { selectStoreData } from "../../../../redux-handler/reducers/storeDataReducer";

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const NavBar = ({ data }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);

  let { menu_all } = useSelector(selectStoreData);
  const allMenus = menu_all?.length > 0 ? menu_all : [];

  let menuList = list_to_tree(data);

  const [navClose, setNavClose] = useState({ right: "0px" });

  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const closeNav = () => {
    setNavClose({ right: "-410px" });
    if (router.asPath == "/layouts/Gym")
      document.querySelector("#topHeader").classList.remove("zindex-class");
  };
  // eslint-disable-next-line

  const handleMegaSubmenu = event => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (
      event.target.parentNode.nextElementSibling.classList.contains(
        "opensubmegamenu"
      )
    )
      event.target.parentNode.nextElementSibling.classList.remove(
        "opensubmegamenu"
      );
    else {
      document.querySelectorAll(".menu-content").forEach(function (value) {
        value.classList.remove("opensubmegamenu");
      });
      event.target.parentNode.nextElementSibling.classList.add(
        "opensubmegamenu"
      );
    }
  };

  const [mainmenu, setMainMenu] = useState(menuList);

  useEffect(() => {
    const currentUrl = location.pathname;
    menuList?.length > 0 &&
      menuList.filter(items => {
        if (items.path === currentUrl) setNavActive(items);
        if (!items.children) return false;
        items?.children?.length > 0 &&
          items.children.filter(subItems => {
            if (subItems.path === currentUrl) setNavActive(subItems);
            if (!subItems.children) return false;
            subItems?.children?.length > 0 &&
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === currentUrl) setNavActive(subSubItems);
              });
          });
      });
  }, []);

  const setNavActive = item => {
    menuList?.length > 0 &&
      menuList.filter(menuItem => {
        if (menuItem != item) menuItem.active = false;
        if (menuItem.children && menuItem.children.includes(item))
          menuItem.active = true;
        if (menuItem.children) {
          menuList?.children?.length > 0 &&
            menuItem.children.filter(submenuItems => {
              if (
                submenuItems.children &&
                submenuItems.children.includes(item)
              ) {
                menuItem.active = true;
                submenuItems.active = false;
              }
            });
        }
      });

    setMainMenu({ mainmenu: menuList });
  };

  // Click Toggle menu
  const toggletNavActive = item => {
    if (!item.active) {
      menuList.forEach(a => {
        if (menuList.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) return false;
          b.children.forEach(c => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: menuList });
  };

  const openMblNav = event => {
    if (event.target.classList.contains("sub-arrow")) return;

    if (
      event.target.nextElementSibling &&
      event.target.nextElementSibling.classList.contains("opensubmenu")
    )
      event.target.nextElementSibling.classList.remove("opensubmenu");
    else {
      document.querySelectorAll(".nav-submenu").forEach(function (value) {
        value.classList.remove("opensubmenu");
      });
      document.querySelector(".mega-menu-container") &&
        document
          .querySelector(".mega-menu-container")
          .classList.remove("opensubmenu");
      event.target.nextElementSibling &&
        event.target.nextElementSibling.classList.add("opensubmenu");
    }
  };

  // const linkHandler = (item) => {
  //   let getItem =
  //     allMenus?.length > 0 ? allMenus.filter((f) => f.id === item.id) : [];

  //   if (getItem.length > 0) {
  //     getItem = getItem[0];
  //     if (getItem.url_type === "page") {
  //       return `/${getItem.url}`;
  //     } else if (getItem?.url_type === "product") {
  //       if (
  //         getItem?.overview &&
  //         getItem?.overview != "" &&
  //         JSON.parse(getItem?.overview)
  //       ) {
  //         return JSON.parse(getItem.overview).has
  //           ? `/product/overview/${getItem?.url}`
  //           : `/product/${getItem?.url}`;
  //       } else {
  //         return `/${item.url_type}/${getItem.url}`;
  //       }
  //     } else {
  //       return `/${item.url_type}/${getItem.url}`;
  //     }
  //   }
  //   return "#";
  // };

  const isMenuGroup = menuItem => {
    if (menuItem.children && menuItem.children.length > 0) {
      let parent =
        menuItem.children &&
        menuItem.children.length > 0 &&
        menuItem.children.filter(f => f.children && f.children.length > 0);
      if (parent.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const hasChildren = item => {
    let flag = false;
    if (
      !item?.children ||
      allMenus.length === 0 ||
      item?.children?.length === 0
    )
      return false;
    for (let i = 0; i < item?.children?.length; i++) {
      const child = item?.children[i];
      const ar = allMenus.filter(e => e.id === child.id);
      if (ar.length) return true;
    }
  };

  return (
    <ul className="nav-menu" style={navClose}>
      <li className="back-btn" onClick={closeNav.bind(this)}>
        <div className="text-right mobile-back">
          <span>Back</span>
          <i className="pl-2 fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </li>
      {menuList &&
        menuList?.length > 0 &&
        menuList?.map((menuItem, i) => {
          return (
            <li
              key={i}
              className={` ${menuItem.megaMenu ? "mega-menu" : ""}`}
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              {(menuItem.children && menuItem.children.length > 0) ||
              (menuItem.megaMenu && menuItem.megaMenu.length > 0) ? (
                <Link
                  className="nav-link"
                  onClick={e => openMblNav(e)}
                  href={linkHandler(menuItem, allMenus)}
                >
                  {t(menuItem.text)}
                  <span className="sub-arrow"></span>
                </Link>
              ) : Array.isArray(allMenus) &&
                allMenus.filter(f => f.id === menuItem.id).length > 0 ? (
                <Link
                  href={linkHandler(menuItem, allMenus)}
                  className="pr-3 nav-link "
                >
                  <>
                    {menuItem.text}
                    {menuItem.tag === "new" ? (
                      <span className="new-tag">new</span>
                    ) : (
                      ""
                    )}
                  </>
                </Link>
              ) : menuItem.custom ? (
                allMenus?.length > 0 ? (
                  <Link
                    href={menuItem.path || "#"}
                    className="pr-3 nav-link"
                    target={menuItem.target}
                  >
                    <>
                      {menuItem.text}
                      {menuItem.tag === "new" ? (
                        <span className="new-tag">new</span>
                      ) : (
                        ""
                      )}
                    </>
                  </Link>
                ) : null
              ) : null}
              {menuItem &&
              Array.isArray(menuItem?.children) &&
              menuItem?.children?.length > 0 &&
              !menuItem?.megaMenu &&
              ((allMenus?.length > 0 &&
                allMenus.filter(f => f.id === menuItem.id).length > 0) ||
                menuItem.custom) ? (
                <ul className="nav-submenu">
                  {menuItem?.children?.map((childrenItem, index) => {
                    if (
                      allMenus?.length > 0 &&
                      allMenus.filter(f => f.id === childrenItem.id).length ===
                        0
                    )
                      return;
                    return (
                      <li
                        key={index}
                        className={`${
                          childrenItem?.children ? "sub-menu" : ""
                        } `}
                      >
                        {childrenItem?.children &&
                        childrenItem?.children.length > 0 ? (
                          <a
                            href={"#"}
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            {childrenItem.text}
                            {childrenItem.tag === "new" ? (
                              <span className="new-tag">new</span>
                            ) : (
                              ""
                            )}
                            <i className="pl-2 fa fa-angle-right"></i>
                          </a>
                        ) : (
                          ""
                        )}
                        {!childrenItem?.children ||
                        childrenItem?.children.length === 0
                          ? allMenus?.length > 0 &&
                            allMenus.filter(f => f.id === childrenItem.id) && (
                              <Link href={linkHandler(childrenItem, allMenus)}>
                                <>
                                  {childrenItem.text}
                                  {childrenItem.tag === "new" ? (
                                    <span className="new-tag">new</span>
                                  ) : (
                                    ""
                                  )}
                                </>
                              </Link>
                            )
                          : ""}
                        {childrenItem?.children &&
                        childrenItem?.children.length > 0 ? (
                          <ul
                            className={`nav-sub-childmenu ${
                              childrenItem.active ? "menu-open " : "active"
                            }`}
                          >
                            {childrenItem?.children.map(
                              (childrenSubItem, key) => (
                                <li key={key}>
                                  {!childrenSubItem?.children ||
                                  childrenSubItem?.children.length === 0
                                    ? allMenus?.length > 0 &&
                                      allMenus.filter(
                                        f => f.id === childrenSubItem.id
                                      ) && (
                                        <Link
                                          href={linkHandler(
                                            childrenSubItem,
                                            allMenus
                                          )}
                                          className="sub-menu-title"
                                        >
                                          <>
                                            {childrenSubItem.text}
                                            {childrenSubItem.tag === "new" ? (
                                              <span className="new-tag">
                                                new
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        </Link>
                                      )
                                    : ""}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : menuItem.megaMenu && hasChildren(menuItem) ? (
                <div
                  id={`id-megamenu-container`}
                  className={`mega-menu-container shadow-sm  ${
                    menuItem.megaMenu
                      ? isShown
                        ? "fade-in"
                        : "d-none"
                      : "opensubmenu"
                  }`}
                >
                  {menuItem.megaMenu === true ? (
                    <Container>
                      {isMenuGroup(menuItem) ? (
                        <Row>
                          {menuItem?.children?.length > 0 &&
                            menuItem.children.map((megaMenuItem, i) => {
                              if (
                                allMenus?.length > 0 &&
                                allMenus.filter(f => f.id === megaMenuItem.id)
                                  .length === 0
                              )
                                return;
                              return (
                                <div className="col mega-box" key={i}>
                                  <div className="link-section">
                                    <div className="menu-title">
                                      <h5 onClick={e => handleMegaSubmenu(e)}>
                                        {megaMenuItem.text}
                                      </h5>
                                    </div>
                                    <div className="menu-content">
                                      <ul>
                                        {megaMenuItem.children &&
                                          megaMenuItem.children.length > 0 &&
                                          hasChildren(megaMenuItem) &&
                                          megaMenuItem.children.map(
                                            (subMegaMenuItem, i) => {
                                              if (
                                                allMenus?.length > 0 &&
                                                allMenus.filter(
                                                  f =>
                                                    f.id === subMegaMenuItem.id
                                                ).length === 0
                                              )
                                                return;
                                              return (
                                                <li key={i}>
                                                  <Link
                                                    href={linkHandler(
                                                      subMegaMenuItem,
                                                      allMenus
                                                    )}
                                                  >
                                                    {subMegaMenuItem.text}
                                                  </Link>
                                                </li>
                                              );
                                            }
                                          )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </Row>
                      ) : (
                        <>
                          <Slider {...settings}>
                            {menuItem.children.map((megaMenuItem, i) => {
                              if (
                                allMenus?.length > 0 &&
                                allMenus.filter(f => f.id === megaMenuItem.id)
                                  .length === 0
                              )
                                return;
                              return megaMenuItem.children &&
                                megaMenuItem.children.length > 0 ? null : (
                                <div key={i} onClick={() => setIsShown(false)}>
                                  <div className="mx-2 ">
                                    <Link
                                      href={linkHandler(megaMenuItem, allMenus)}
                                      className="nav-link"
                                    >
                                      <>
                                        <img
                                          alt=""
                                          src={megaMenuItem.icon}
                                          className="p-3 border rounded img-thumbnail"
                                        />
                                        <div className="mt-2 text-center">
                                          <h4>{megaMenuItem.text}</h4>
                                        </div>
                                      </>
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </Slider>
                          <div
                            className="text-center"
                            onClick={() => setIsShown(false)}
                          >
                            <Link
                              href={linkHandler(menuItem, allMenus)}
                              className="btn btn-primary"
                            >
                              View All
                            </Link>
                          </div>
                        </>
                      )}
                    </Container>
                  ) : (
                    ""
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
    </ul>
  );
};

export default NavBar;
