import CustomPagination from "@/components/account/common/Pagination";
import PostCategory from "@/components/blogs/blogThemes/postCategory";
import BlogListCard from "@/components/common/blog/BlogListCard";
import { useGetBlogListQuery } from "@/redux-handler/api/slices/blogSlice";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

function Blogs() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const { cat_slug } = router.query;
  const page = queryParams.get("page") || 1;
  const catData = {
    title: "Categories",
    config: {
      count: true,
    },
  };
  const {
    data: posts,
    error: postsErr,
    isLoading: isPostsLoading,
    refetch: refetchPosts,
  } = useGetBlogListQuery(
    `?items_per_page=10&sort=id&order=desc&page=${page}&category_id_set=${cat_slug}`
  );
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
          {/*Blog sidebar start*/}
          <div className="col-xl-3 col-lg-4 col-md-5">
            <div className="blog-sidebar">
              <PostCategory data={catData} />
            </div>
          </div>

          {/*Blog List start*/}
          <div className="col-xl-9 col-lg-8 col-md-7 order-sec">
            {posts?.data?.length > 0 ? (
              posts?.data?.map((post: any) => <BlogListCard post={post} />)
            ) : (
              <div className="d-flex align-items-center flex-column">
                <h3>No Post Found</h3>
              </div>
            )}
          </div>
          {/*Blog List start*/}
        </div>
        {posts?.payload?.pagination && (
          <div className="d-flex flex-column align-items-center py-5">
            <>
              <CustomPagination
                pagination={posts?.payload?.pagination}
                loading={isPostsLoading}
                prefix={`blog/category/${cat_slug}`}
              />
            </>
          </div>
        )}
      </div>
    </section>
  );
}

export default Blogs;
