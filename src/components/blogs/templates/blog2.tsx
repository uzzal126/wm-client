import { getTimeFromUnixValue } from "@/helpers/misc";
import { Slider3 } from "@/helpers/services/script";
import Link from "next/link";
import { Fragment } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";

const SinglePost = ({ post }: { post: any }) => {
  return (
    <>
      <Link href={`/blog/${post?.slug}`}>
        <div className="collection-banner">
          <div>
            <img
              src={post?.thumbnail?.src || "/images/sample-desktop-banner.png"}
              className="img-fluid"
              alt=""
            />
          </div>
          <span></span>
        </div>
      </Link>
      <div className="blog-details">
        <h4>{getTimeFromUnixValue(post.created_at, "MMM DD, YYYY")}</h4>
        <Link href={`/blog/${post?.slug}`}>
          <div>
            <p>{post.title}</p>
          </div>
          <hr className="style1" />
        </Link>
        <h6>
          by: {post?.created_by ? post?.created_by : "Anonymous Admin"} ,{" "}
          {post?.comments ? post?.comments : 0} Comments
        </h6>
      </div>
    </>
  );
};

const BlogSection2 = ({
  data,
  posts,
  slider,
}: {
  data: any;
  posts: any;
  slider?: boolean;
}) => {
  return (
    <Fragment>
      <Container className="section-t-space">
        <Row>
          <Col>
            <div className="title3">
              {data?.subtitle && <h4>{data?.subtitle}</h4>}
              {data?.title && (
                <h2 className={"title-inner3 mb-3"}>{data?.title}</h2>
              )}
              <div className="mb-4 line"></div>
              {data?.details && <p>{data?.details}</p>}
            </div>
          </Col>
        </Row>
      </Container>

      <section className="pt-0 blog section-b-space ratio3_2">
        <Container>
          <Row>
            <Col md="12">
              {slider ? (
                <Slider {...Slider3} className="slide-3 no-arrow ">
                  {posts &&
                    posts?.length > 0 &&
                    posts?.map((post: any, i: any) => (
                      <SinglePost post={post} key={i} />
                    ))}
                </Slider>
              ) : (
                <Row
                  xl={data?.setting?.show?.desktop_row || 5}
                  md={data?.setting?.show?.tablet_row || 3}
                  xs={data?.setting?.show?.mobile_row || 2}
                >
                  {posts &&
                    posts?.length > 0 &&
                    posts?.map((post: any, i: any) => (
                      <Col className="mb-4" key={i}>
                        <SinglePost post={post} />
                      </Col>
                    ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default BlogSection2;
