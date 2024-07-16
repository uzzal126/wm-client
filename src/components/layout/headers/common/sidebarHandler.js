import { useState } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../../../redux-handler/reducers/storeDataReducer";
import SideBar from "./sidebar";

const SidebarHandler = ({ data, bg }) => {
  let storeData = useSelector(selectStoreData);
  const { menu_list } = storeData;

  const [show, setShow] = useState(false);

  const openNav = () => {
    document.body.style.overflow = "hidden";
    let openmyslide = document.getElementById("mySidenav");

    if (openmyslide) {
      openmyslide.classList.add("open-side");
      openmyslide.classList.add("show");
    }
  };
  const closeNav = () => {
    document.body.style.overflow = "unset";

    let closemyslide = document.getElementById("mySidenav");

    if (closemyslide) {
      closemyslide.classList.remove("open-side");
      closemyslide.classList.remove("show");
    }
  };

  return (
    data?.category !== false &&
    data?.body?.category_menu &&
    data?.body?.category_menu.length > 0 && (
      <>
        <div
          style={{ cursor: "pointer" }}
          onClick={openNav}
          className={
            bg ? `nav-link bg-primary text-white rounded mr-2 py-1 px-2` : ""
          }
        >
          <div className="bar-style d-flex align-items-center pointer">
            <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i>
            {data?.body?.category_menu_title && (
              <span className="ml-2 text-uppercase fs-3">
                {data?.body?.category_menu_title}
              </span>
            )}
          </div>
        </div>

        <div id="mySidenav" className="sidenav" tabIndex={"-1"}>
          <div className="sidebar-overlay" onClick={closeNav} />
          <nav style={{ overflowY: "scroll" }}>
            <div style={{ cursor: "pointer" }} onClick={closeNav}>
              <div className="text-left sidebar-back">
                <i className="pr-2 fa fa-angle-left" aria-hidden="true"></i>{" "}
                Back
              </div>
            </div>
            <SideBar data={data?.body?.category_menu} setShow={setShow} />
          </nav>
        </div>
      </>
    )
  );
};

export default SidebarHandler;
