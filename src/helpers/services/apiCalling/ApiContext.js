import React, { useState } from "react";
import ApiCallingContext from "./index";

const ApiCallingProvider = (props) => {
  const [state, setState] = useState({});

  const handleSetState = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  return (
    <ApiCallingContext.Provider
      value={{
        ...props,
        state,
        setState: handleSetState,
      }}>
      {props.children}
    </ApiCallingContext.Provider>
  );
};

export default ApiCallingProvider;
