import * as userHelper from "../../helpers/auth/AuthHelper";
import { createContext, useContext, useState } from "react";

const UserContext = createContext({});
const useCustomer = () => {
  return useContext(UserContext);
};
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userHelper.getAuth());

  const saveUser = (_user) => {
    setUser(_user);
    if (_user) {
      userHelper.setAuth(_user);
    } else {
      userHelper.removeAuth();
    }
  };

  const logout = () => {
    saveUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useCustomer };
