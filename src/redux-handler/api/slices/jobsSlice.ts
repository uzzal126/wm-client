import {
  APPLY_FOR_JOB,
  GET_ALL_JOBS,
  GET_APPLIED_JOBS,
  GET_JOB_DETAILS,
  UPLOAD_FORM_ATTACHMENT,
} from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const jobsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // GET
    getAllJobs: builder.query<any, any>({
      query: data => ({
        url: `${GET_ALL_JOBS}?page=${data?.page || 1}&items_per_page=${
          data?.limit || 10
        }&search=${data?.search || ""}`,
        method: "GET",
        // headers: { Authorization: data?.token, Origin: data?.origin },
      }),
    }),
    getJobDetails: builder.query<any, any>({
      query: data => ({
        url: `${GET_JOB_DETAILS}/${data?.id}`,
        method: "GET",
        headers: { Authorization: data?.token, Origin: data?.origin },
      }),
    }),
    getAppliedJobs: builder.query<any, any>({
      query: data => ({
        url: `${GET_APPLIED_JOBS}/${data?.id}?page=${
          data?.page || 1
        }&items_per_page=${data?.limit || 10}`,
        method: "GET",
        // headers: { Authorization: data?.token, Origin: data?.origin },
      }),
    }),
    applyForJob: builder.mutation<any, any>({
      query: data => ({
        url: APPLY_FOR_JOB,
        method: "POST",
        body: data,
      }),
    }),
    uploadAttachment: builder.mutation<any, any>({
      query: data => ({
        url: UPLOAD_FORM_ATTACHMENT,
        method: "POST",
        body: data,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        //   // Origin: window.location.hostname,
        // },
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetAppliedJobsQuery,
  useGetJobDetailsQuery,
  useApplyForJobMutation,
  useUploadAttachmentMutation,
} = jobsApi;
