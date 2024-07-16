// import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./redux-handler/api/apiSlice";
// import storeDataReducer from "./redux-handler/reducers/storeDataReducer";

// // export function makeStore() {
// //   return configureStore({
// //     reducer: reducer,
// //     devTools: process.env.NODE_ENV !== "production",
// //   });
// // }

// export function makeStore() {
//   return configureStore({
//     reducer: {
//       [apiSlice.reducerPath]: apiSlice.reducer,
//       store: storeDataReducer,
//     },
//     devTools: process.env.NODE_ENV !== "production",
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(apiSlice.middleware),
//   });
// }

// const store = makeStore();

// export type AppState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action<string>
// >;

// export default store;

import {
  ConfigureStoreOptions,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { persistReducer } from "redux-persist";
// import persistStore from "redux-persist/es/persistStore";

// import chatSlice from "./core/slice/chatSlice";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import { apiSlice } from "./redux-handler/api/apiSlice";
import storeDataReducer from "./redux-handler/reducers/storeDataReducer";

const rootReducer = combineReducers({
  store: storeDataReducer,
  [apiSlice?.reducerPath]: apiSlice.reducer,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    ...options,
  });
const store = createStore();
export default store;
export const wrapper = createWrapper(createStore);
// export const wrapper = createWrapper(createStore, { debug: true });

setupListeners(createStore().dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// export const persistor = persistStore(createStore());
