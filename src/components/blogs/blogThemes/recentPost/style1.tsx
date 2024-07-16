import { getTimeFromUnixValue } from "@/helpers/misc";
import Link from "next/link";

const Style1 = ({ data }: { data: any }) => {
  return (
    <>
      <ul className="recent-blog">
        {data &&
          data.length > 0 &&
          data.map((post: any, i: any) => (
            <li key={i}>
              <div className="media">
                <Link href={`/blog/${post?.slug}`}>
                  <img
                    className="rounded img-fluid blur-up lazyload"
                    src={
                      post?.thumbnail?.src ||
                      "/images/sample-desktop-banner.png"
                    }
                    alt="Generic placeholder image"
                  />
                </Link>
                <div className="media-body align-self-center ms-10">
                  <Link href={`/blog/${post?.slug}`}>
                    <h6
                      className="text-truncate mb-0"
                      style={{ maxWidth: 150 }}
                    >
                      {post?.title}
                    </h6>
                  </Link>
                  <p className="mt-0">
                    {post?.updated_at
                      ? getTimeFromUnixValue(post?.updated_at, "MMMM DD, YYYY")
                      : "March 17, 2016"}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Style1;
