import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Slider from "react-slick";

import { getTimeFromUnixValue } from "@/helpers/misc";
import { Slider3 } from "@/helpers/services/script";
import Link from "next/link";

const SinglePost = ({ post }: { post: any }) => {
  return (
    <>
      <Link href={`/blog/${post?.slug}`}>
        <div className="classic-effect">
          <img
            src={post?.thumbnail?.src || "/images/sample-desktop-banner.png"}
            className="img-fluid"
            alt=""
          />
        </div>
      </Link>
      <div>
        <div className="blog-details">
          <Link href={`/blog/${post?.slug}`}>
            <h4>{post.title}</h4>{" "}
          </Link>

          <h6 className="mt-2">
            by: {getTimeFromUnixValue(post.created_at, "MMM DD, YYYY")}
          </h6>
          <hr className="style1" />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${post?.description?.slice(0, 100)}...`,
          }}
        ></div>
      </div>
    </>
  );
};

const BlogSection1 = ({
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
      <section className={""}>
        <Container>
          <Row>
            <Col md="12">
              <div className={"title1"}>
                {data?.subtitle && <h4>{data?.subtitle}</h4>}
                {data?.title && (
                  <h2 className={"title-inner1 mb-3"}>{data?.title}</h2>
                )}
                <div className="line">
                  <span></span>
                </div>
                {data?.details && <p>{data?.details}</p>}
              </div>
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
                      <Col className="mb-3">
                        <SinglePost post={post} key={i} />
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
export default BlogSection1;
