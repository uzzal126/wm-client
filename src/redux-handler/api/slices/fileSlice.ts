import { FILE_DELETE, UPLOAD_FORM_ATTACHMENT } from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const filesApi: any = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    deleteFile: builder.mutation<any, any>({
      query: data => ({
        url: FILE_DELETE,
        method: "DELETE",
        body: data,
      }),
    }),
    uploadFile: builder.mutation<any, any>({
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

export const { useDeleteFileMutation, useUploadFileMutation } = filesApi;
