import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  apiAccess: { access_token: "", refresh_token: "" },
  sectionKey: {},
  menu_list: [],
  menu_all: [],
};

const dataSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setDataByKey: (state, action) => {
      state[action.payload.key] = action.payload.data;
    },
  },
});

export const { setData, setDataByKey } = dataSlice.actions;

export const selectStoreData = (state) => state.store;

export default dataSlice.reducer;
