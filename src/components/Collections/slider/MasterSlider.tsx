import { linkHandler } from "@/helpers/misc";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
type Props = {
  img: any;
  mImg?: any;
  title?: any;
  desc?: any;
  link?: any;
  classes?: any;
};

const MasterSlider: FC<Props> = ({ img, mImg, title, desc, link, classes }) => {
  // console.log(link)
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;
  return (
    <div>
      <Link
        href={linkHandler(link, allMenus)}
        className={`position-relative d-block ${
          classes ? classes : "text-center"
        }`}
      >
        <img
          src={img || "/images/sample-desktop-banner.png"}
          alt={title}
          className="img-fluid d-none d-lg-block"
        />
        <img
          src={mImg || "/images/mobile-desktop-banner.png"}
          alt={title}
          className="img-fluid d-block d-lg-none"
        />
        {(desc || title) && (
          <Container className="position-absolute top-50 start-0 translate-middle-y">
            <Row>
              <Col>
                <div className="slider-contain h-auto flex-column align-items-start">
                  {desc && (
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.9)",
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
                        {desc}
                      </h5>
                    </div>
                  )}
                  {title && (
                    <div
                      style={{
                        background: "rgba(16, 16, 16, 0.4)",
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
                        {title}
                      </h3>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </Link>
    </div>
  );
};

export default MasterSlider;
