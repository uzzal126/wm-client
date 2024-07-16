import { getTimeFromUnixValue } from "@/helpers/misc";
import Link from "next/link";
import { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";

const BlogSection3 = ({ data, posts }: { data: any; posts: any }) => {
  return (
    <Fragment>
      <Container className="section-t-space section-b-space">
        <Row>
          <Col>
            <div className="title3">
              {data?.subtitle && <h4>{data?.subtitle}</h4>}
              {data?.title && (
                <h2 className={"title-inner3 mb-3"}>{data?.title}</h2>
              )}
              <div className="mb-4 line"></div>
              {data?.details && <p className="mb-0">{data?.details}</p>}
            </div>
          </Col>
        </Row>
      </Container>

      <section className="pt-0 blog section-b-space ratio3_2">
        <Container>
          {posts &&
            posts?.length > 0 &&
            posts.map((post: any, i: any) => (
              <div className="mb-5 blog-media row row-cols-1" key={i}>
                <div className="mb-3 col">
                  <div className="blog-left">
                    <Link href={`/blog/${post?.slug}`}>
                      <div className="collection-banner">
                        <div>
                          <img
                            src={
                              post?.thumbnail?.src ||
                              "/images/sample-desktop-banner.png"
                            }
                            alt=""
                            className="img-fluid blur-up lazyload bg-img media"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div className="text-center blog-right">
                    <div>
                      <h6>
                        {getTimeFromUnixValue(post.created_at, "MMM DD, YYYY")}
                      </h6>
                      <Link href={`/blog/${post?.slug}`}>
                        <h4>{post.title}</h4>
                      </Link>
                      <ul className="post-social">
                        <li>
                          Posted By :{" "}
                          {post?.created_by
                            ? post?.created_by
                            : "Anonymous Admin"}
                        </li>
                        {/* <li>
                          <i className="fa fa-heart" /> 5 Likes
                        </li> */}
                        <li>
                          <i className="mx-2 fa fa-comments" />{" "}
                          {post?.comments ? post?.comments : 0} Comments
                        </li>
                      </ul>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${post?.description?.slice(0, 300)}...`,
                        }}
                      ></div>
                      <Link
                        href={`/blog/${post?.slug}`}
                        className="mt-2 rounded btn btn-primary"
                        style={{
                          background: "var(--theme-deafult)",
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Container>
      </section>
    </Fragment>
  );
};

export default BlogSection3;
