// Need to use the React-specific entry point to import createApi
import { ACCOUNT_DETAILS, DELETE_ADDRESS } from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const profileSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    fetchAccountDetails: builder.mutation<any, any>({
      query: (customerId ) => ({
        url: ACCOUNT_DETAILS,
        method: "POST",
        body: {
            customer_id: customerId,
          }
      }),
    }),
    deleteAddress: builder.mutation<any, any>({
        query: ({customerId, addressId}) => ({
          url: DELETE_ADDRESS,
          method: "POST",
          body: {
              customer_id: customerId,
              address_id: addressId
            }
        }),
      }),
  }),
});

export const { useFetchAccountDetailsMutation, useDeleteAddressMutation } = profileSlice;
