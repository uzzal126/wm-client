import { createContext, useState } from "react";
import * as authHelper from "../../helpers/auth/AuthHelper";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authHelper.getAuth() || {});

  const saveAuth = (auth) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, saveAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
