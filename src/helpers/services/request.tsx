import axios from "axios";
import { getReduxAuth } from "../../redux-handler/reduxHandler";
import { getAuth, setAuth } from "../auth/AuthHelper";

import {
    BASE_URL,
  GET_CATEGORY_PRODUCTS,
  GET_TAG_PRODUCTS,
} from "./api";

// export function setupAxios(token: string) {
//   axios.defaults.headers.Accept = "application/json";
//   axios.interceptors.request.use(
//     (config) => {
//       if (token) {
//         config.headers["Authorization"] = `${token}`;
//       } else {
//         config.headers["Authorization"] = "";
//       }

//       return config;
//     },
//     (err) => Promise.reject(err)
//   );
// }

export function createAxios(origin: string, token?: string) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: any) => {
      if (origin) {
        config.headers["Origin"] = origin;
      }
      if (token) {
        config.headers["Authorization"] = `${token}`;
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

function getLocalAccessToken() {
  let auth = getReduxAuth();
  return auth ? auth?.access_token : "";
}
function getLocalRefreshToken() {
  let auth = getReduxAuth();
  return auth ? auth?.refresh_token : "";
}

axios.interceptors.request.use(
  (config: any) => {
    const token = getLocalAccessToken();

    if (token) {
      config.headers["Authorization"] = token;
      config.maxBodyLength = 1000000000;
      config.maxContentLength = 100000000;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (res: any) => {
    const originalConfig = res.config;
    if (res?.data.status_code === 602 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const rs = await refreshToken();
        if (rs.data.status_code === 200) {
          const { access_token } = rs.data;

          let auth = getReduxAuth();
          let newAuth = { ...auth, access_token: access_token };
          setAuth(newAuth);

          axios.defaults.headers.common["Authorization"] = access_token;
          return axios(originalConfig);
        }
      } catch (_error: any) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }
        return Promise.reject(_error);
      }
    } else {
      return res;
    }
    // return res;
  },
  async (err: any) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await refreshToken();
          const { access_token } = rs.data;

          let auth = getReduxAuth();
          let newAuth = { ...auth, access_token: access_token };
          setAuth(newAuth);

          axios.defaults.headers.common["Authorization"] = access_token;
          return axios(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

function refreshToken() {
  return axios.post(`${BASE_URL}/renew-access-token`, {
    refresh_token: getLocalRefreshToken(),
  });
}

export const queryRequest = async (url: string, data: any) => {
  // con
  try {
    const { data: response } = await axios({
      method: "POST",
      url: url,
      data: data,
    });

    return response;
  } catch (err: any) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    };
  }
};

export const queryRequestParallel = async (url: string, data: any) => {
  // con
  return await axios({
    method: "POST",
    url: url,
    data: data,
  });
};

export const getQueryRequestParallel = async (url: string) => {
  return await axios({
    method: "GET",
    url: url,
  });
};
export const ParallelApiCalling = async (promise: any) => {
  try {
    return await Promise.all(promise);
  } catch (err) {
    return err;
  }
};
export const getQueryRequest = async (url: string, dataData = []) => {
  let auth = getAuth();
  try {
    const { data } = await axios({
      method: "GET",
      url: url,
      headers: {
        customer_id: auth && auth?.user_id,
      },
    });

    return data;
  } catch (err: any) {
    return {
      success: false,
      status_code: 5001,
      message: err.message,
    };
  }
};

// CUSTOM API
export const getProductsByCatId = async (id: any, no_of_item_show = 1000) => {
  let auth = getAuth();
  const query = auth ? `customer_id=${auth?.user_id}` : "";
  return getQueryRequest(
    `${GET_CATEGORY_PRODUCTS}/${id}?page=1&items_per_page=${no_of_item_show}${
      query.length ? "&" + query : ""
    }`
  );
};
export const getProductsByTagId = async (id: any, no_of_item_show = 1000) => {
  return getQueryRequest(
    `${GET_TAG_PRODUCTS}/${id}?page=1&items_per_page=${no_of_item_show}`
  );
};
