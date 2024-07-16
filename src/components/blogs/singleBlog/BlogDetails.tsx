import MasterSocial from "@/components/product/common/master_social";
import { getTimeFromUnixValue } from "@/helpers/misc";
import { Col, Container, Row } from "reactstrap";
import Comments from "./comment";

const BlogDetail = ({ post }: any) => {
  return (
    <>
      <section className="blog-detail-page section-b-space ratio2_3">
        <Container>
          <Row>
            <Col sm="12" className="blog-detail">
              <img
                src={post?.banner?.src || "/images/sample-desktop-banner.png"}
                className="mb-0 img-fluid blur-up lazyload"
                alt=""
              />
              {post?.banner?.caption && (
                <p className="pt-2 text-muted">{post?.banner?.caption}</p>
              )}
              <hr />
              <h3>{post?.title || ""}</h3>
              <div className="d-lg-flex post-social align-items-center">
                <ul className="list-none">
                  <li className="my-1 my-lg-0">
                    {post?.created_at
                      ? getTimeFromUnixValue(post?.created_at, "MMMM DD, YYYY")
                      : "Unknown Date"}
                  </li>
                  <li className="my-1 my-lg-0">
                    Posted By : {post?.created_by || "Unknown Author"}
                  </li>
                  <li className="my-1 my-lg-0">
                    <i className="fa fa-comments"></i>{" "}
                    {post?.comments
                      ? `${post?.comments} ${
                          post?.comments > 1 ? "Comments" : "Comment"
                        }`
                      : "0 Comments"}
                  </li>
                </ul>
                <div className="pl-0 my-2 pl-lg-3 my-lg-0">
                  <MasterSocial
                    image={post?.banner?.src}
                    name={post?.title}
                    url={`blog/${post?.slug}`}
                    small
                  />
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    `
                  <div class="custom-format">
                  ${post?.description}
                  </div>
                  ` || `<h3>No details Given</h3><p>No details Given</p><br/>`,
                }}
              />
            </Col>
          </Row>
          <Comments post={post} />
        </Container>
      </section>
    </>
  );
};

export default BlogDetail;
