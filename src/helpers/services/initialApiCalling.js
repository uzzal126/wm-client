"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDataByKey } from "../../redux-handler/reducers/storeDataReducer";
import { getAuth } from "../auth/AuthHelper";
import { objectSortByKey } from "../misc";
import {
  GET_ACCESS_TOKEN,
  GET_COMPONENTS,
  GET_MENUS,
  GET_STORE_INFO,
  WISH_LIST,
} from "./api";
import {
  getQueryRequestParallel,
  ParallelApiCalling,
  queryRequest,
  queryRequestParallel,
} from "./request";

const InitialApiCalling = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    const res1 = await queryRequest(GET_ACCESS_TOKEN);
    // //console.log("res1", res1);
    if (res1.success && res1.status_code === 200) {
      dispatch(
        setDataByKey({
          key: "apiAccess",
          data: {
            access_token: `Bearer ${res1?.access_token}`,
            refresh_token: res1?.refresh_token,
          },
        })
      );
      let auth = getAuth();
      const res = await ParallelApiCalling([
        getQueryRequestParallel(GET_COMPONENTS),
        getQueryRequestParallel(GET_MENUS),
        queryRequestParallel(GET_STORE_INFO),
        auth && auth?.user_id
          ? queryRequestParallel(WISH_LIST, {
              customer_id: auth && auth?.user_id,
            })
          : "",
      ]);
      setIsLoading(false);
      const components = res[0]?.data?.data;
      const menus = res[1]?.data?.data;
      const storeInfo = res[2]?.data?.data;
      const wishlist = res[3]?.data?.wishlist_details;

      if (wishlist && wishlist?.length > 0) {
        localStorage?.setItem("wishlist", JSON.stringify(wishlist));
      }

      // setting section keys
      if (components) {
        const list = {};
        for (let i = 0; i < components?.length; i++) {
          const obj = components[i];
          list[obj?.slug?.toUpperCase()] = obj?.slug;
        }
        dispatch(
          setDataByKey({
            key: "sectionKey",
            data: list,
          })
        );
      }
      // setting menus in redux
      if (menus) {
        dispatch(
          setDataByKey({
            key: "menu_list",
            data: menus.filter((e) => e?.url_type == "category"),
          })
        );

        dispatch(
          setDataByKey({
            key: "menu_all",
            data: menus,
          })
        );
      }

      // setting store info in redux
      if (storeInfo) {
        const theme_info = objectSortByKey(storeInfo?.theme_info);
        dispatch(
          setDataByKey({
            key: "data",
            data: { ...storeInfo, theme_info },
          })
        );
      }
    } else {
      setError(res1?.message);
    }
  };

  if (error) {
    return (
      <div className="template-password">
        <div className="uix">
          <div className="ui1 position-absolute top-0 start-0">
            <img alt="" src="/images/ui1.svg" width={130} />
          </div>
          <div className="ui1 position-absolute bottom-0 start-0">
            <img alt="" src="/images/ui2.svg" width={130} />
          </div>
          <div className="ui1 position-absolute bottom-0 end-0">
            <img alt="" src="/images/ui3.svg" width={130} />
          </div>
        </div>
        <div className="container-fluid">
          <div id="container" className="">
            <div className="d-flex flex-column align-items-center justify-content-between vh-100">
              <div className="d-flex w-100 h-lg-100 align-items-center">
                <div className="row w-100 h-lg-100 align-items-center">
                  <div className="col-lg-5">
                    <div className="ps-lg-5 pt-5 pt-lg-0 text-center text-lg-left">
                      <div className="logo mt-5 mt-lg-0 pt-5 pt-lg-0 mb-4">
                        <img
                          src="/images/Web-Manza-Final-Logo.png"
                          alt="webmanza_fashion"
                          className="img-fluid"
                          style={{ maxWidth: 320 }}
                        />
                      </div>
                      <h2 className="mb-4">
                        {error || "Will be Opening Soon!"}
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-7 text-end">
                    <div className="ui-img me-lg-5 mt-5 mt-lg-0">
                      <img
                        alt=""
                        src="/images/access.png"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="mb-0 p-2 bg-white rounded d-inline-block position-relative z-index-1">
                  {`© ${new Date().getFullYear()}, Powered by WebManza.com.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <div className="loader-wrapper">
      <div className="loader"></div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default InitialApiCalling;
