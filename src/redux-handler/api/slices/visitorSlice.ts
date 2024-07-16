import { VISITOR_COUNTER } from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const visitorApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET

    visitorIncrease: builder.mutation<any, any>({
      query: (data) => ({
        url: VISITOR_COUNTER,
        method: "POST",
        data: data,
      }),
      // async onCacheEntryAdded(
      //   arg,
      //   { cacheDataLoaded, dispatch, cacheEntryRemoved }
      // ) {
      //   // create socket
      //   const socket = io(BASE_URL || "", {
      //     reconnectionDelay: 1000,
      //     reconnection: true,
      //     // reconnectionAttemps: 10,
      //     transports: ["websocket"],
      //     agent: false,
      //     upgrade: false,
      //     rejectUnauthorized: false,
      //   });

      //   try {
      //     await cacheDataLoaded;
      //     socket.on("conversation", (data: any) => {
      //       console.log("io", data);
      //     });
      //   } catch (err) {}

      //   await cacheEntryRemoved;
      //   socket.close();
      // },
    }),
  }),
});

export const { useVisitorIncreaseMutation } = visitorApi;
