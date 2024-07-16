import { getTimeFromUnixValue } from "@/helpers/misc";
import Link from "next/link";

const Style2 = ({ data }: { data: any }) => {
  return (
    <>
      <ul className="popular-blog">
        {data && data.length > 0 ? (
          data.map((post: any, i: any) => (
            <li key={i}>
              <div className="media">
                <p className="mt-0">
                  {post?.updated_at
                    ? getTimeFromUnixValue(post?.updated_at, "MMMM DD, YYYY")
                    : "March 17, 2016"}
                </p>
                <div className="media-body align-self-center">
                  <Link href={`/blog/${post?.slug}`}>
                    <h6>{post.title}</h6>
                  </Link>
                  <p>0 Likes</p>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${post?.description?.slice(0, 300)}...`,
                }}
              ></div>
            </li>
          ))
        ) : (
          <p>No post found</p>
        )}
      </ul>
    </>
  );
};

export default Style2;
