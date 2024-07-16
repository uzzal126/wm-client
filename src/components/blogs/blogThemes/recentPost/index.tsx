"use client";
import { useGetBlogListQuery } from "@/redux-handler/api/slices/blogSlice";

import Spinner from "react-bootstrap/Spinner";
import Style1 from "./style1";
import Style2 from "./style2";
import Style3 from "./style3";
import Style4 from "./style4";

const RecentPost = ({ data }: { data: any }) => {

  const {
    data: posts,
    error: postsErr,
    isLoading: isPostsLoading,
  } = useGetBlogListQuery(
    `/?items_per_page=${data?.config?.items_per_page || 5}&sort=${
      data?.config?.sort || "id"
    }&order=${data?.config?.order || "asc"}&page=1${
      data?.config?.cat_id ? `&category_id_set=${data?.config?.cat_id}` : ""
    }`
  );

  return (
    <div className="theme-card">
      {data?.title && <h4>{data?.title}</h4>}
      {isPostsLoading ? (
        <div className="d-flex align-items-center flex-column">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 30, height: 30 }}
          />
        </div>
      ) : (
        <>
          {data?.setting?.template === "blog-recent-1" && (
            <Style1 data={posts?.data} />
          )}
          {data?.setting?.template === "blog-recent-2" && (
            <Style2 data={posts?.data} />
          )}
          {data?.setting?.template === "blog-recent-3" && (
            <Style3 data={posts?.data} />
          )}
          {data?.setting?.template === "blog-recent-4" && (
            <Style4 data={posts?.data} />
          )}
        </>
      )}
    </div>
  );
};

export default RecentPost;
