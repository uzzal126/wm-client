import { useGetBlogCategoriesQuery } from "@/redux-handler/api/slices/blogSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import Spinner from "react-bootstrap/Spinner";

const PostCategory = ({ data }: { data: any }) => {
  const router = useRouter();
  const { cat_slug } = router.query;
  const pathName = router?.pathname;

  const {
    data: category,
    error: catErr,
    isLoading: isCatLoading,
  } = useGetBlogCategoriesQuery("");

  return (
    <div className="theme-card">
      {data?.title && <h4>{data?.title}</h4>}
      {isCatLoading ? (
        <div className="d-flex align-items-center flex-column">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 30, height: 30 }}
          />
        </div>
      ) : (
        <ul className="category-blog">
          <li>
            <Link
              href={`/blogs`}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                {pathName?.includes("blogs") && (
                  <i className="fa fa-angle-double-right"></i>
                )}
                <h6 className="mb-0">All Posts</h6>
              </div>
            </Link>
          </li>
          {category?.data &&
            category?.data?.length > 0 &&
            category.data?.map((item: any, i: number) => (
              <li className={`d-block`} key={i}>
                <Link
                  href={`/blog/category/${item?.id}`}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    {cat_slug == item.id && (
                      <i className="fa fa-angle-double-right"></i>
                    )}
                    <h6 className="mb-0">{item?.name}</h6>
                  </div>
                  {data?.config?.count && (
                    <div className="badge badge-primary">
                      {item?.blog_count || 0}
                    </div>
                  )}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

function propsAreEqual(prevMovie: any, nextMovie: any) {
  return JSON.stringify(prevMovie?.data) !== JSON.stringify(nextMovie?.data);
}

export default memo(PostCategory, propsAreEqual);
