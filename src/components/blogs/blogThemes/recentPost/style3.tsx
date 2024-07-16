import { getTimeFromUnixValue } from "@/helpers/misc";
import Link from "next/link";

const Style3 = ({ data }: { data: any }) => {
  return (
    <>
      <ul className="popular-blog">
        {data && data.length > 0 ? (
          data.map((post: any, i: any) => (
            <li key={i}>
              <div className="media">
                <div className="w-100">
                  <Link href={`/blog/${post?.slug}`}>
                    <img
                      className="rounded img-fluid blur-up lazyload"
                      src={
                        post?.banner?.src || "/images/sample-desktop-banner.png"
                      }
                      alt="Generic placeholder image"
                    />
                  </Link>
                </div>
              </div>
              <div className="mt-2 text-center media-body">
                <Link href={`/blog/${post?.slug}`}>
                  <h6 className="mb-0">{post?.title}</h6>
                </Link>
                <p className="mt-0">
                  {post?.updated_at
                    ? getTimeFromUnixValue(post?.updated_at, "MMMM DD, YYYY")
                    : "March 17, 2016"}
                </p>

                <div
                  dangerouslySetInnerHTML={{
                    __html: `${post?.description?.slice(0, 150)}...${
                      post?.description?.length > 150 &&
                      `<a href=${`/blog/${post?.slug}`}><span class='text-primary'>read more</span></a>`
                    }`,
                  }}
                ></div>
              </div>
            </li>
          ))
        ) : (
          <p>No post found</p>
        )}
      </ul>
    </>
  );
};

export default Style3;
