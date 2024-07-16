import { useGetBlogListQuery } from "@/redux-handler/api/slices/blogSlice";
import { Spinner } from "react-bootstrap";
import BlogCarousel1 from "./blog-carousel/blogCarousel1";

const BlogCarouselHandler = ({ data }: any) => {
  const {
    data: posts,
    error: postsErr,
    isLoading: isPostsLoading,
  } = useGetBlogListQuery(
    `/?items_per_page=${data?.config?.items_per_page || 0}&sort=${
      data?.config?.sort || "id"
    }&order=${data?.config?.order || "asc"}&page=1${
      data?.config?.cat_id ? `&category_id_set=${data?.config?.cat_id}` : ""
    }`
  );

  if (isPostsLoading) {
    return (
      <div className="d-flex align-items-center flex-column">
        <Spinner
          animation="border"
          variant="primary"
          // color="var(--theme-deafult)"
          style={{ width: 50, height: 50 }}
        />
      </div>
    );
  }
  return (
    <>
      <BlogCarousel1 data={data} posts={posts?.data} />
    </>
  );
};

export default BlogCarouselHandler;
