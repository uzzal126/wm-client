import { getTimeFromUnixValue } from "@/helpers/misc";
import Link from "next/link";

const Style4 = ({ data }: { data: any }) => {
  return (
    <>
      <ul className="overlay-blog">
        {data &&
          data.length > 0 &&
          data.map((post: any, i: any) => (
            <li key={i} className="mb-3">
              <div className="media">
                <div className="w-100">
                  <Link href={`/blog/${post?.slug}`}>
                    <img
                      className="img-fluid blur-up lazyload rounded"
                      src={
                        post?.banner?.src || "/images/sample-desktop-banner.png"
                      }
                      alt="Generic placeholder image"
                    />
                  </Link>
                </div>
              </div>
              <div className="media-body text-center mt-2">
                <Link href={`/blog/${post?.slug}`}>
                  <h6 className="mb-0">{post?.title}</h6>
                </Link>
                <p className="mt-0">
                  {post?.updated_at
                    ? getTimeFromUnixValue(post?.updated_at, "MMMM DD, YYYY")
                    : "March 17, 2016"}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Style4;
