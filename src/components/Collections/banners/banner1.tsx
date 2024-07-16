import { getBannerRdirectURL, isSelfURL } from "@/helpers/misc";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";

const Data = [
  {
    img: "home15",
    offer: "save 30%",
    title: "Electronic",
    btn: "shop now",
  },
  {
    img: "home16",
    offer: "save upto 30%",
    title: "headphone",
    btn: "shop now",
  },
];

type Props = {
  img: string;
  offer: string;
  title: string;
  btn: string;
  redirect_url: string;
};

const Banner: FC<Props> = ({ img, offer, title, btn, redirect_url }) => {
  return (
    <div>
      {isSelfURL(redirect_url) ? (
        <Link href={redirect_url}>
          <div className={`home ${img} text-center`}>
            <Container>
              <Row>
                <Col>
                  <div className="slider-contain">
                    <div>
                      <h4>{offer}</h4>
                      <h1>{title}</h1>
                      <a href="#" className="btn btn-solid">
                        {btn}
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Link>
      ) : (
        <a href={redirect_url} target="_blank">
          <div className={`home ${img} text-center`}>
            <Container>
              <Row>
                <Col>
                  <div className="slider-contain">
                    <div>
                      <h4>{offer}</h4>
                      <h1>{title}</h1>
                      <a href="#" className="btn btn-solid">
                        {btn}
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </a>
      )}
    </div>
  );
};

type bProps = {
  data: any;
};

const HomeBanner1: FC<bProps> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  return (
    <section className="p-0">
      <Slider className="slide-1 home-slider">
        {Data.map((item, i) => {
          return (
            <Banner
              key={i}
              img={item.img || data[i]?.banner_url}
              offer={item.offer || data[i]?.subtitle}
              title={item.title || data[i]?.title}
              btn={item.btn}
              redirect_url={getBannerRdirectURL(
                data[i],
                storeData?.menu_all || []
              )}
            />
          );
        })}
      </Slider>
    </section>
  );
};

export { HomeBanner1 };
