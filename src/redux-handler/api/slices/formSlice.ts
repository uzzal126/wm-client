import { POST_FORM_DATA, UPLOAD_FORM_ATTACHMENT } from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const formsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    postFormData: builder.mutation<any, any>({
      query: data => ({
        url: POST_FORM_DATA,
        method: "POST",
        body: data,
      }),
    }),
    uploadFormAttachment: builder.mutation<any, any>({
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

export const { usePostFormDataMutation, useUploadFormAttachmentMutation } =
  formsApi;
