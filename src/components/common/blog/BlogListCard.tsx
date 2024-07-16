import { getTimeFromUnixValue } from "@/helpers/misc";
import Link from "next/link";

function BlogListCard({ post }: any) {
  return (
    <>
      <div className="row blog-media">
        <div className="col-xl-6">
          <div className="blog-left">
            <Link href={`/blog/${post?.slug}`}>
              <img
                src={
                  post?.thumbnail?.src || "/images/sample-desktop-banner.png"
                }
                className="bg-size blur-up lazyloaded"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="blog-right">
            <div>
              <h6>
                {" "}
                {post?.created_at
                  ? getTimeFromUnixValue(post?.created_at, "MMMM DD, YYYY")
                  : "Unknown Date"}
              </h6>
              <Link href={`/blog/${post?.slug}`}>
                <h4>{post?.title || "Sample Title"}</h4>
              </Link>
              <ul className="post-social">
                <li>Posted By : {post?.created_by || "Unknown Author"}</li>
                {/* <li>
              <i className="fa fa-heart" /> 5 Hits
            </li> */}
                <li>
                  <i className="fa fa-comments" />{" "}
                  {post?.comments
                    ? `${post?.comments} ${
                        post?.comments > 1 ? "Comments" : "Comment"
                      }`
                    : "0 Comments"}
                </li>
              </ul>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${post?.description?.slice(0, 300)}...`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogListCard;
