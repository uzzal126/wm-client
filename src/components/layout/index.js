import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderOne from "./headers/header-1";
import HeaderNine from "./headers/header-2";
import HeaderSeven from "./headers/header-3";
import HeaderSix from "./headers/Header-4";
import HeaderTen from "./headers/Header-5";
import HeaderThree from "./headers/header-6";
import HeaderTwo from "./headers/header-7";

import MiniMenu from "./headers/common/miniMenu";

import MasterFooter from "./footers/common/MasterFooter";
import MasterFooterTwo from "./footers/common/MasterFooterTwo";
import FooterFive from "./footers/footer-five";
import FooterTwo from "./footers/footer-two";

import { GET_MENUS } from "../../helpers/services/api";
import { getQueryRequest } from "../../helpers/services/request";
import {
  selectStoreData,
  setDataByKey,
} from "../../redux-handler/reducers/storeDataReducer";

const CommonLayout = ({ children }) => {
  let storeData = useSelector(selectStoreData);
  const [height, setHeight] = useState(70);
  const { data } = storeData;
  const dispatch = useDispatch();

  useEffect(() => {
    const headerContainer = document.getElementById("header-area");
    if (headerContainer) {
      setHeight(headerContainer.offsetHeight);
    }
    if (data?.header?.sticky) window.addEventListener("scroll", handleScroll);
    document.documentElement.style.setProperty(
      "--theme-deafult",
      data.general_settings?.primary_color || "#ff4c3b"
    );
    if (
      typeof data?.store_info?.site_font === "string" &&
      data?.store_info?.site_font?.includes("header_font")
    ) {
      // document.documentElement.style.setProperty(
      //   "--theme-header-font",
      //   getFontName(data?.store_info?.site_font, "header_font") || "Inter"
      // );
    }

    if (data?.general_settings?.bg_color) {
      document.body.style.backgroundColor =
        data?.general_settings?.bg_color || "white";
    }

    return () => {
      if (data?.header?.sticky)
        window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  useEffect(() => {
    getMenus();
  }, []);

  const handleScroll = () => {
    let number =
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number >= 300) {
      if (window.innerWidth < 576) {
        document.getElementById("header-area").classList.remove("fixed");
      } else document.getElementById("header-area").classList.add("fixed");
    } else {
      document.getElementById("header-area").classList.remove("fixed");
    }
  };

  const getMenus = async () => {
    const res = await getQueryRequest(GET_MENUS);

    if (res.success && res.status_code === 200) {
      dispatch(
        setDataByKey({
          key: "menu_list",
          data: res.data.filter((e) => e?.url_type == "category"),
        })
      );

      dispatch(
        setDataByKey({
          key: "menu_all",
          data: res.data,
        })
      );
    }
  };

  return (
    <>
      <div style={{ minHeight: height }}>
        <div className="sticky" id="header-area">
          {data?.header && data?.header?.layout === "middle-logo-header" && (
            <HeaderTen data={data?.header} topClass="top-header-dark2" />
          )}
          {data?.header && data?.header?.layout === "left-logo-header" && (
            <HeaderOne data={data?.header} topClass="top-header" />
          )}
          {data?.header &&
            data?.header?.layout === "middle-top-logo-header" && (
              <HeaderTwo
                data={data?.header}
                topClass="top-header top-header-dark2"
              />
            )}
          {data?.header &&
            data?.header?.layout === "left-bottom-logo-header" && (
              <HeaderSix data={data?.header} direction="right" />
            )}
          {data?.header &&
            data?.header?.layout === "left-middle-logo-header" && (
              <HeaderThree data={data?.header} />
            )}
          {data?.header &&
            data?.header?.layout === "simple-left-logo-header" && (
              <HeaderSeven data={data?.header} />
            )}
          {data?.header &&
            data?.header?.layout === "left-logo-on-transparent-back-header" && (
              <HeaderNine
                data={data?.header}
                topClass="top-header top-header-dark2"
              />
            )}
          <MiniMenu data={data?.header} />
        </div>
      </div>

      <>{children}</>

      <div id="footer-area">
        {data?.footer && data?.footer?.layout === "footer-1" && (
          <MasterFooter
            data={data?.footer}
            footerClass="footer-light footer-black"
            footerLayOut="light-layout upside"
            footerSection="small-section py-4"
            belowSection="section-b-space section-t-space light-layout"
            hideNewsletter={true}
          />
        )}
        {data?.footer && data?.footer?.layout === "footer-2" && (
          <MasterFooterTwo
            data={data?.footer}
            footerSection=" border-b"
            footerLogoClass="text-center"
            // footerClass="dark-layout"
            footerClass="layout-light footer-black"
            layoutClass={"darker-subfooter "}
          />
        )}

        {data?.footer && data?.footer?.layout === "footer-3" && (
          <MasterFooter
            data={data?.footer}
            footerClass={`footer-light `}
            footerLayOut={"light-layout upper-footer"}
            footerSection={"small-section py-4 border-section border-top-0"}
            belowSection={"section-b-space light-layout"}
            hideNewsletter={true}
          />
        )}
        {data?.footer && data?.footer?.layout === "footer-4" && (
          <MasterFooter
            data={data?.footer}
            footerClass={" footer-black lazyloaded"}
            footerLayOut={"white-layout"}
            footerSection={"small-section py-4"}
            belowSection={"section-b-space dark-layout"}
            layoutClass={"dark-subfooter"}
            hideNewsletter={true}
          />
        )}
        {data?.footer && data?.footer?.layout === "footer-5" && (
          <FooterTwo data={data?.footer} layoutClass="black-subfooter" />
        )}
        {data?.footer && data?.footer?.layout === "footer-6" && (
          <FooterFive data={data?.footer} layoutClass="black-subfooter" />
        )}
        {data?.footer && data?.footer?.layout === "footer-7" && (
          <MasterFooterTwo
            data={data?.footer}
            footerSection=" border-b"
            footerLogoClass="text-center"
            // footerClass="dark-layout"
            footerClass="layout-light footer-black"
            layoutClass={"darker-subfooter "}
          />
        )}
      </div>
    </>
  );
};

export default CommonLayout;
