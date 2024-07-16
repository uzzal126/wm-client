const AUTH_LOCAL_STORAGE_KEY = "user";

const getAuth = () => {
  if (typeof window !== "undefined") {
    if (localStorage === undefined || !localStorage) {
      return;
    }

    const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    if (!lsValue) {
      return;
    }
    try {
      const auth = JSON.parse(lsValue);
      if (auth) {
        return auth;
      }
    } catch (error) {
      console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
    }
  }
};

const setAuth = (auth: any) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
