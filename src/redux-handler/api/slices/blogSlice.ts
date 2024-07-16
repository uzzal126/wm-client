import {
  GET_BLOG_BY_SLUG,
  GET_BLOG_CATEGORY,
  GET_BLOG_POST,
  GET_COMMENTS,
} from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET
    getBlogCategories: builder.query<any, any>({
      query: () => ({
        url: `${GET_BLOG_CATEGORY}`,
        method: "GET",
        // headers: { Authorization: token ? token : undefined , Origin: origin ? origin : undefined}
      }),
    }),
    getSingleBlog: builder.query<any, any>({
      query: (data) => ({
        url: `${GET_BLOG_BY_SLUG}/${data?.slug}`,
        method: "GET",
        headers: { Authorization: data?.token, Origin: data?.origin },
      }),
    }),
    getBlogList: builder.query<any, any>({
      query: (params) => ({
        url: `${GET_BLOG_POST}${params}`,
        method: "GET",
        //   headers: { Authorization: data?.token , Origin: data?.origin}
      }),
    }),
    getComments: builder.query<any, any>({
      query: (id) => ({
        url: `${GET_COMMENTS}/${id}`,
        method: "GET",
      }),
      providesTags: ["blogComments"],
    }),
    getCommentsSSR: builder.query<any, any>({
      query: (data) => ({
        url: `${GET_COMMENTS}/${data?.id}`,
        method: "GET",
        headers: { Authorization: data?.token, Origin: data?.origin },
      }),
    }),
    postComment: builder.mutation<any, any>({
      query: (data) => ({
        url: GET_COMMENTS,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogComments"],
    }),
  }),
});

export const {
  useGetBlogCategoriesQuery,
  useGetSingleBlogQuery,
  useGetBlogListQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
  useGetCommentsSSRQuery,
} = blogsApi;
