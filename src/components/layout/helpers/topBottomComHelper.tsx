import AboutMe from "@/components/common/AboutMe/AboutMe";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Collapse } from "reactstrap";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
import Location from "../footers/common/location";
import Menu from "../footers/common/menu";
import Newsletter from "../footers/common/newsletter";
import SocialMedia from "../footers/common/socialMedia";
import LogoImage from "../headers/common/logo";

const Component = ({
  data,
  secKey,
  socialClass,
  isOpen,
  collapse,
  setIsOpen,
  setCollapse,
  linkClass,
  width,
  titleClass,
}: any) => {
  let storeData = useSelector(selectStoreData);
  const sectionKey = storeData?.sectionKey;

  return (
    <div className="footer-theme2">
      <div className={`footer-link mb-2 ${linkClass}`}>
        <div
          className={`footer-title ${isOpen && collapse == 3 ? "active" : ""} `}
        >
          <h4 className={titleClass}>
            {data?.title}
            <span className="according-menu"></span>
          </h4>
        </div>
        <Collapse isOpen={true}>
          <div className="footer-contant">
            {data?.list &&
              Object.keys(data?.list).length > 0 &&
              Object.keys(data?.list).map((key, i) => {
                let splitKey = key.split("_");
                return (
                  <>
                    {splitKey[0] === sectionKey?.SOCIAL && (
                      <SocialMedia
                        socialClass={socialClass}
                        data={data?.list[key].list}
                      />
                    )}
                    {splitKey[0] === sectionKey?.MENUBAR && (
                      <Menu data={data?.list[key].list} />
                    )}
                    {splitKey[0] === sectionKey?.LOCATION && (
                      <Location id={data?.list[key]?.id} />
                    )}
                    {splitKey[0] === sectionKey?.IMAGE && (
                      <img
                        src={data?.list[key]?.url}
                        alt=""
                        className="img-fluid"
                      />
                    )}
                  </>
                );
              })}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

const TopBottomComHelper = ({
  data,
  socialClass,
  isOpen,
  collapse,
  setIsOpen,
  setCollapse,
  width,
  linkClass,
  titleClass,
}: any) => {
  let storeData = useSelector(selectStoreData);
  const sectionKey = storeData?.sectionKey;
  if (data) {
    let { list } = data;
    return (
      <>
        {list &&
          Object.keys(list).length > 0 &&
          Object.keys(list).map((key, i) => {
            let splitKey = key.split("_");
            return (
              <Fragment key={i}>
                {splitKey[0] === sectionKey?.LOGO && (
                  <div className="footer-logo">
                    <LogoImage />
                  </div>
                )}
                {splitKey[0] === sectionKey?.ABOUTME && (
                  <AboutMe data={list[key]} />
                )}
                {splitKey[0] === sectionKey?.NEWSLETTER ? (
                  <Newsletter data={list[key]} />
                ) : (
                  <Component
                    isOpen={isOpen}
                    collapse={collapse}
                    setIsOpen={setIsOpen}
                    setCollapse={setCollapse}
                    width={width}
                    socialClass={socialClass}
                    linkClass={linkClass}
                    titleClass={titleClass}
                    data={list[key]}
                    secKey={splitKey[0]}
                  />
                )}
              </Fragment>
            );
          })}
      </>
    );
  }
  return <></>;
};
/*

SLIDER(pin): "slider"
CATEGORY(pin): "category"
CAMPAIGNS(pin): "campaigns"
COLLECTIONBOX(pin): "collectionBox"
TAGS(pin): "tags"
BANNER(pin): "banner"
BLOG(pin): "blog"
SERVICE(pin): "service"
TESTIMONIAL(pin): "testimonial"
ABOUT(pin): "about"
VIDEO(pin): "video"
IMAGE(pin): "image"
LOGO(pin): "logo"
TEXT(pin): "text"

SOCIAL(pin): "social"
(pin): "menubar"
(pin): "location"
NEWSLETTER(pin): "newsletter"
(pin): "productGrid"
FILTER(pin): "filter"

*/
export default TopBottomComHelper;
