import { getTimeFromUnixValue } from "@/helpers/misc";
import { Fragment } from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { Slider3 } from "../../../helpers/services/script";

const blog1 = "/assets/images/marijuana/blog/1.jpg";
const blog2 = "/assets/images/marijuana/blog/2.jpg";
const blog3 = "/assets/images/marijuana/blog/3.jpg";

const BlogSection2 = ({ post }: any) => {
  const data = [blog1, blog2, blog3];
  return (
    <Fragment>
      <Container className="section-t-space">
        <Row>
          <Col>
            <div className="title3">
              <h4>Recent Story</h4>
              <h2 className="title-inner3">from the blog</h2>
              <div className="line"></div>
            </div>
          </Col>
        </Row>
      </Container>

      <section className="pt-0 blog section-b-space ratio3_2">
        <Container>
          <Row>
            <Col md="12">
              <Slider {...Slider3} className="slide-3 no-arrow">
                {data.map((imgSrc, i) => {
                  return (
                    <Col md="12" key={i}>
                      <a href="#">
                        <div className="collection-banner">
                          <div>
                            <Media
                              src={imgSrc}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </div>
                          <span></span>
                        </div>
                      </a>
                      <div className="blog-details">
                        <h4>
                          {post?.updated_at
                            ? getTimeFromUnixValue(
                                post?.updated_at,
                                "MMMM DD, YYYY"
                              )
                            : "March 17, 2016"}
                        </h4>
                        <a href="#">
                          <p>
                            Lorem ipsum dolor sit consectetur adipiscing elit,{" "}
                          </p>
                        </a>
                        <hr className="style1" />
                        <h6>by: John Dio , 2 Comment</h6>
                      </div>
                    </Col>
                  );
                })}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export { BlogSection2 };
