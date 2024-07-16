import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { FC, Fragment } from "react";
import {
  BsArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import {
  getBannerRdirectURL,
  imageDimentionHelper,
  isSelfURL,
  styleGenaretor,
} from "../../../helpers/misc";
const dummy = "https://dummyimage.com/930x400/d1d1d1/222";
const dummyMobile = "https://dummyimage.com/550x400/d1d1d1/222";

const Data = [
  {
    img: dummy,
    desc: "save 30%",
    title: "outfit",
    link: "#",
  },
  {
    img: dummy,
    desc: "save 60%",
    title: "toys",
    link: "#",
  },
];

type cProps = {
  item: any;
  col?: string;
};

const MasterCollection: FC<cProps> = ({ item, col = "6" }) => {
  let storeData = useSelector(selectStoreData);
  const redirect_url = getBannerRdirectURL(item, storeData?.menu_all || []);
  const dImage = imageDimentionHelper(item?.banner_url, 650, 250, true);
  const mImage = imageDimentionHelper(item?.mobile_banner_url, 650, 250, true);
  return (
    <Col md={col} className="my-2">
      {isSelfURL(redirect_url) ? (
        <Link href={redirect_url}>
          <div className="collection-banner p-right text-center">
            <div>
              <img
                src={item?.banner_url || dummy}
                className="img-fluid d-none d-md-block bg-img"
                alt=""
              />
              <img
                src={item?.banner_url || dummy}
                className="img-fluid d-block d-md-none bg-img"
                alt=""
              />
            </div>
            <div className="contain-banner h-auto flex-column align-items-center top-50">
              <div>
                {item?.subtitle ||
                  (item?.desc && (
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
                        {item?.subtitle || item?.desc}
                      </h5>
                    </div>
                  ))}
                {item?.title && (
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
                      {item?.title}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <a href={redirect_url} target="_blank">
          <div className="collection-banner p-right text-center">
            <div>
              <img
                src={item?.banner_url || dummy}
                className="img-fluid d-none d-md-block bg-img"
                alt=""
              />
              <img
                src={item?.banner_url || dummyMobile}
                className="img-fluid d-block d-md-none bg-img"
                alt=""
              />
            </div>
            <div className="contain-banner h-auto flex-column align-items-center top-50">
              <div>
                {item?.subtitle ||
                  (item?.desc && (
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
                        {item?.subtitle || item?.desc}
                      </h5>
                    </div>
                  ))}
                {item?.title && (
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
                      {item?.title}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </a>
      )}
    </Col>
  );
};

type Props = {
  data: any;
};

const HomeBanner5: FC<Props> = ({ data }) => {
  let customSettings = {
    dots: data?.setting?.slider?.dots || false,
    arrows: data?.setting?.slider?.arrow || true,
    autoplay: data?.setting?.slider?.autoplay || true,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <BsFillArrowRightCircleFill />,
    prevArrow: <BsArrowLeftCircleFill />,
    rows: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Fragment>
      <section
        className="banner-padding pb-3 ratio2_1"
        style={{
          ...styleGenaretor(data?.setting?.styles),
        }}
      >
        <Container className="absolute-bg">
          {data?.setting?.layout_type === "slider" ? (
            <Slider {...customSettings} className="slide-1">
              {data?.list?.map((item: any, i: number) => {
                return (
                  <MasterCollection
                    key={i}
                    item={data?.list[i] || item}
                    col="8"
                  />
                );
              })}
            </Slider>
          ) : (
            <Row className="partition2 g-3">
              {data?.list?.map((item: any, i: number) => {
                return (
                  <MasterCollection key={i} item={data?.list[i] || item} />
                );
              })}
            </Row>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export { HomeBanner5 };
