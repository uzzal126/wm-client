import PostCategory from "@/components/blogs/blogThemes/postCategory";
import RecentPost from "@/components/blogs/blogThemes/recentPost";
import AboutMe from "@/components/common/AboutMe/AboutMe";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Collapse } from "reactstrap";
import { objectSortByKey } from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
import Location from "../footers/common/location";
import Menu from "../footers/common/menu";
import Newsletter from "../footers/common/newsletter";
import SocialMedia from "../footers/common/socialMedia";
import LogoImage from "../headers/common/logo";

type Props = {
  data?: any;
  title?: any;
  isOpen?: any;
  className?: any;
  newsletterClass?: any;
  socialClass?: any;
  locationList?: any;
  setOpenList?: any;
  setIsOpen?: any;
  openList?: any;
  footerContentClass?: any;
  id?: any;
  collapse?: any;
  setCollapse?: any;
  width?: any;
};

const CompHelper = ({
  data,
  title,
  isOpen,
  className,
  newsletterClass,
  socialClass,
  locationList,
  setOpenList,
  openList,
  setIsOpen,
  collapse,
  setCollapse,
  width,
  footerContentClass = "",
  id,
}: Props) => {
  let list: any = objectSortByKey(data?.list);
  let storeData = useSelector(selectStoreData);
  const sectionKey = storeData?.sectionKey;

  const handleOpenCollapse = () => {
    const index = openList.indexOf(id);
    if (index === -1) {
      const newList = [...openList];
      newList.push(id);
      setOpenList([...newList]);
    } else {
      const newList = openList.filter((e: any) => e !== id);
      setOpenList([...newList]);
    }
  };

  return (
    <>
      {list && Object.keys(list).length > 0 ? (
        <>
          <div className={title ? "" : "sub-title"}>
            <div
              className={`footer-title ${isOpen ? "active" : ""} ${className}`}
            >
              <h4 onClick={handleOpenCollapse}>
                {typeof data.title === "string" ? data.title : ""}
                <span className="according-menu"></span>
              </h4>
            </div>
            <Collapse isOpen={isOpen}>
              <div className={`footer-contant ${footerContentClass}`}>
                {Object.keys(list).map((key: any, i: number) => {
                  let splitKey = key.split("_");
                  return (
                    <Fragment key={i}>
                      {splitKey[0] === sectionKey?.LOGO && (
                        <div className="footer-logo">
                          <LogoImage />
                        </div>
                      )}
                      {splitKey[0] === sectionKey?.TEXT && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: list[key].content,
                          }}
                        ></div>
                      )}
                      {splitKey[0] === sectionKey?.SOCIAL && (
                        <SocialMedia
                          socialClass={socialClass}
                          data={list[key].list}
                        />
                      )}
                      {splitKey[0] === sectionKey?.MENUBAR && (
                        <Menu data={list[key].list} />
                      )}
                      {splitKey[0] === sectionKey?.LOCATION && (
                        <Location
                          locationList={locationList}
                          id={list[key].id}
                        />
                      )}
                      {splitKey[0] === sectionKey?.NEWSLETTER && (
                        <Newsletter
                          newsletterClass={newsletterClass}
                          data={list[key]}
                          inner={true}
                        />
                      )}
                      {splitKey[0] === sectionKey?.IMAGE && (
                        <img
                          src={list[key]?.url}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                      {splitKey[0] === sectionKey?.RECENTPOST && (
                        <RecentPost data={list[key] || {}} />
                      )}
                      {splitKey[0] === sectionKey?.ABOUTME && (
                        <AboutMe data={list[key] || {}} />
                      )}
                      {splitKey[0] === sectionKey?.BLOGCATEGORY && (
                        <PostCategory data={{}} />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </Collapse>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CompHelper;
