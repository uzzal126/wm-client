import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import {
  getBannerRdirectURL,
  imageDimentionHelper,
  isSelfURL,
} from "../../../helpers/misc";
const bannerOne = "/assets/images/flower/sub-banner1.jpg";
const bannerTwo = "/assets/images/flower/sub-banner2.jpg";
type Props = {
  data: any;
};

const HomeBanner3: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const redirect_url_1 = getBannerRdirectURL(
    data?.list[0],
    storeData?.menu_all || []
  );
  const redirect_url_2 = getBannerRdirectURL(
    data?.list[1],
    storeData?.menu_all || []
  );
  const one = imageDimentionHelper(
    data?.list && data?.list[1] && data?.list[1].banner_url,
    890,
    490,
    true
  );
  const two = imageDimentionHelper(
    data?.list && data?.list[0] && data?.list[0].banner_url,
    430,
    490,
    true
  );
  return (
    <section className="banner-padding pb-2">
      <div className="container">
        <div className="row partition2">
          <div className="col-md-4">
            <div className="collection-banner p-left text-center">
              <div className="img-part">
                {isSelfURL(redirect_url_1) ? (
                  <Link href={redirect_url_1}>
                    <img
                      src={
                        (data?.list &&
                          data?.list[0] &&
                          data?.list[0].banner_url) ||
                        bannerTwo
                      }
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </Link>
                ) : (
                  <a href={redirect_url_1} target="_blank">
                    <img
                      src={
                        (data?.list &&
                          data?.list[0] &&
                          data?.list[0].banner_url) ||
                        bannerTwo
                      }
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {isSelfURL(redirect_url_2) ? (
              <Link href={redirect_url_2}>
                <div className="collection-banner p-right text-right">
                  <div className="img-part">
                    <img
                      src={
                        (data?.list &&
                          data?.list[1] &&
                          data?.list[1].banner_url) ||
                        bannerOne
                      }
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </div>
                  <div className="contain-banner h-auto flex-column align-items-center top-50">
                    <div>
                      {/* <h4>{data?.list && data?.list[1] ? data?.list[1].subtitle : ''}</h4>
                      <h2>{data?.list && data?.list[1] ? data?.list[1].title : ''}</h2> */}
                      {data?.list &&
                        data?.list[1] &&
                        data?.list[1].subtitle && (
                          <div
                            style={{
                              background: "rgba(0, 0, 0, 0.7)",
                              padding: 3,
                            }}
                            className="d-flex flex-column align-items-center text-center"
                          >
                            <h5
                              style={{
                                textAlign: "center",
                                color: "white",
                                marginTop: 2,
                              }}
                            >
                              {data?.list[1].subtitle}
                            </h5>
                          </div>
                        )}
                      {data?.list && data?.list[1] && data?.list[1].title && (
                        <div
                          style={{
                            background: "rgba(16, 16, 16, 0.7)",
                            padding: 8,
                          }}
                          className="d-flex flex-column align-items-center text-center"
                        >
                          <h3
                            style={{
                              textAlign: "center",
                              color: "white",
                              marginTop: 2,
                            }}
                          >
                            {data?.list[1].title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <a href={redirect_url_2} target="_blank">
                <div className="collection-banner p-right text-right">
                  <div className="img-part">
                    <img
                      src={
                        (data?.list &&
                          data?.list[1] &&
                          data?.list[1].banner_url) ||
                        bannerOne
                      }
                      className="img-fluid blur-up lazyload"
                      alt=""
                    />
                  </div>
                  <div className="contain-banner h-auto flex-column align-items-center top-50">
                    <div>
                      {data?.list &&
                        data?.list[1] &&
                        data?.list[1].subtitle && (
                          <div
                            style={{
                              background: "rgba(0, 0, 0, 0.7)",
                              padding: 3,
                            }}
                            className="d-flex flex-column align-items-center text-center"
                          >
                            <h5
                              style={{
                                textAlign: "center",
                                color: "white",
                                marginTop: 2,
                              }}
                            >
                              {data?.list[1].subtitle}
                            </h5>
                          </div>
                        )}
                      {data?.list && data?.list[1] && data?.list[1].title && (
                        <div
                          style={{
                            background: "rgba(16, 16, 16, 0.7)",
                            padding: 8,
                          }}
                          className="d-flex flex-column align-items-center text-center"
                        >
                          <h3
                            style={{
                              textAlign: "center",
                              color: "white",
                              marginTop: 2,
                            }}
                          >
                            {data?.list[1].title}
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { HomeBanner3 };
