import { combineReducers } from "@reduxjs/toolkit";

import dataReducer from "./storeDataReducer";

const reducer = combineReducers({
  store: dataReducer,
});
export default reducer;
