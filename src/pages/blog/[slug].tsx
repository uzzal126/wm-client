import BlogDetail from "@/components/blogs/singleBlog/BlogDetails";
import NotFound from "@/components/error_handler/productNotFound";
import SeoHead from "@/components/layout/seo/head";
import { BASE_URL } from "@/config/constant/api.constant";
import { GET_ACCESS_TOKEN } from "@/helpers/services/api";
import { createAxios } from "@/helpers/services/request";
import { blogsApi } from "@/redux-handler/api/slices/blogSlice";
import { wrapper } from "@/store";
import axios from "axios";
import nookies from "nookies";
import Spinner from "react-bootstrap/Spinner";

function Blog({ post, errors }: any) {
  if (errors) return <NotFound error={errors} showSearch={false} />;
  return (
    <>
      {!post ? (
        <div className="my-5 d-flex align-items-center flex-column">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 30, height: 30 }}
          />
        </div>
      ) : (
        <>
          <SeoHead
            title={post?.seo?.title || post?.title}
            description={post?.seo?.description || post?.title}
            url={`${post?.origin}/blog/${post?.slug}`}
            image={post?.banner?.src}
            author={post?.origin || ""}
            copyright={`© ${new Date().getFullYear()} All Rights Reserved by ${
              post?.origin || "The Owner"
            }`}
            keywords={post?.seo?.keywords}
          />
          <BlogDetail post={post} />
        </>
      )}
    </>
  );
}

export default Blog;

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: any) => {
    const { slug } = context?.query;
    const formattedSlug = slug?.replace(/^www\./, "").replace(/\.com$/, "");

    // Parse
    const cookies = nookies.get(context);
    const origin: any = context.req?.headers?.host;
    createAxios(origin);
    let token = cookies?.token;
    if (!token) {
      const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
          Origin: origin,
        },
      });

      const { data: response } = await axiosInstance.post(GET_ACCESS_TOKEN);
      token = `Bearer ${response?.access_token}`;
    }

    const response = await store.dispatch(
      blogsApi.endpoints.getSingleBlog.initiate({
        slug: formattedSlug,
        origin: origin,
        token: token,
      })
    );

    // const commentResponse = await store.dispatch(
    //   blogsApi.endpoints.getCommentsSSR.initiate({
    //     id: response?.data?.data[0]?.id,
    //     origin: origin,
    //     token: token,
    //   })
    // );

    const data =
      response?.data?.data && response?.data?.data.length > 0
        ? response?.data?.data[0]
        : {};
    if (response?.data?.status_code === 200) {
      return {
        props: { post: { origin: origin, ...data }, errors: "" },
      };
    } else {
      return {
        props: {
          post: {},
          errors: response?.data?.message || "Something want wrong",
        },
      };
    }
  }
);
