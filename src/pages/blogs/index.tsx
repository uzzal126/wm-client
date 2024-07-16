import CustomPagination from "@/components/account/common/Pagination";
import PostCategory from "@/components/blogs/blogThemes/postCategory";
import BlogListCard from "@/components/common/blog/BlogListCard";
import { useGetBlogListQuery } from "@/redux-handler/api/slices/blogSlice";
import { useSearchParams } from "next/navigation";
import { Spinner } from "react-bootstrap";

function BlogsPage() {
  const queryParams = useSearchParams();
  const catData = {
    title: "Categories",
    config: {
      count: true,
    },
  };
  const page = queryParams.get("page") || 1;

  const {
    data: posts,
    error: postsErr,
    isLoading: isPostsLoading,
  } = useGetBlogListQuery(`?items_per_page=10&sort=id&order=desc&page=${page}`);

  if (isPostsLoading) {
    return (
      <div className="d-flex align-items-center flex-column">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: 30, height: 30 }}
        />
      </div>
    );
  }
  return (
    <section className="section-b-space blog-page ratio2_3">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5">
            <div className="blog-sidebar">
              <PostCategory data={catData} />
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 col-md-7 order-sec">
            {!posts?.data ||
              (posts?.data?.length === 0 && <h3>No Post Found</h3>)}
            {posts?.data?.length > 0 &&
              posts?.data?.map((post: any) => <BlogListCard post={post} />)}
          </div>
        </div>
        {posts?.payload?.pagination?.links && (
          <>
            <CustomPagination
              pagination={posts?.payload?.pagination}
              loading={isPostsLoading}
              prefix={"blogs"}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default BlogsPage;
