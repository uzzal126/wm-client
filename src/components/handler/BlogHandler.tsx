import { useGetBlogListQuery } from "@/redux-handler/api/slices/blogSlice";
import Spinner from "react-bootstrap/Spinner";
import BlogSection1 from "../blogs/templates/blog1";
import BlogSection2 from "../blogs/templates/blog2";
import BlogSection3 from "../blogs/templates/blog3";

const BlogHandler = ({ data }: any) => {
  let query = "?page=1";
  if (data?.config?.items_per_page)
    query += `&items_per_page=${data?.config?.items_per_page}`;
  else query += `&items_per_page=10`;

  if (data?.config?.sort) query += `&sort=${data?.config?.sort}`;
  else query += `&sort=id`;

  if (data?.config?.order) query += `&order=${data?.config?.order}`;
  else query += `&order=asc`;

  if (data?.config?.cat_id) query += `&category_id_set=${data?.config?.cat_id}`;

  const {
    data: posts,
    error: postsErr,
    isLoading: isPostsLoading,
  } = useGetBlogListQuery(`${query}`);

  return (
    <>
      {isPostsLoading ? (
        <div className="d-flex align-items-center flex-column py-5">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 50, height: 50 }}
          />
        </div>
      ) : (
        <>
          {data?.setting?.template === "blog-1" && (
            <BlogSection1 data={data} posts={posts?.data} />
          )}
          {data?.setting?.template === "blog-2" && (
            <BlogSection2 data={data} posts={posts?.data} />
          )}
          {(data?.setting?.template === "blog-3" ||
            data?.setting?.template === "slider") && (
            <BlogSection3 data={data} posts={posts?.data} />
          )}
        </>
      )}
    </>
  );
};

export default BlogHandler;
