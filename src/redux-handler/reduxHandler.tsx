import store from "../store";
import { setDataByKey } from "./reducers/storeDataReducer";

export const getReduxAuth = () => {
  const state = store?.getState();
  return state.store.apiAccess
    ? state.store.apiAccess
    : { access_token: "", refresh_token: "" };
};
export const setReduxAuth = (auth: any) => {
  store.dispatch(
    setDataByKey({
      key: "apiAccess",
      data: auth,
    })
  );
};

export const getLinkFromState = (
  data: any,
  slug: string | any,
  type: string
) => {
  const state = store?.getState();
  let lists = data || state.store.menu_all;
  let filterItem =
    lists &&
    lists.length > 0 &&
    lists.filter((f: any) => f.url === slug && f.url_type === type);
  if (filterItem && filterItem.length > 0) {
    return filterItem[0].pid;
  } else {
    return null;
  }
};
