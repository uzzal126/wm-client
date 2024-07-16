import React, { FC, Fragment } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import { getTimeFromUnixValue, sliderConfig } from "@/helpers/misc";
import moment from "moment";

type Props = {
  data?: any;
  type?: any;
  sectionClass?: any;
  title?: any;
  inner?: any;
  hrClass?: any;
};
const BlogSection1: FC<Props> = ({
  data,
  sectionClass,
  title,
  inner,
  hrClass,
}) => {
  var blogs: any = [];
  return (
    <Fragment>
      <section className={sectionClass}>
        <Container>
          <Row>
            <Col md="12">
              <div className={title}>
                <h4>{data?.title}</h4>
                <h2 className={inner}>{data?.subtitle}</h2>
                {hrClass ? (
                  <hr role="tournament6"></hr>
                ) : (
                  <div className="line">
                    <span></span>
                  </div>
                )}
              </div>
              <Slider
                {...sliderConfig(
                  data?.setting?.slider,
                  data?.setting?.show,
                  blogs.length
                )}
                className="slide-3 no-arrow "
              >
                {blogs &&
                  blogs.map((item: any, index: string | number) => (
                    <Col md="12" key={index}>
                      <Link href={"#"}>
                        <div className="classic-effect">
                          <img src={item.img} className="img-fluid" alt="" />
                        </div>
                      </Link>
                      <div className="blog-details">
                        <h4>{item.title}</h4>
                        <Link href={"#"}>
                          <p>{item.desc} </p>
                        </Link>
                        <hr className="style1" />
                        <h6>
                          by:
                          {item?.date
                            ? getTimeFromUnixValue(item?.date, "MMMM DD, YYYY")
                            : "March 17, 2016"}
                        </h6>
                      </div>
                    </Col>
                  ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export { BlogSection1 };
