import { FC, useState, createContext, useContext } from "react";
import {
  QueryRequestContextProps,
  QueryState,
  initialQueryRequest,
} from "./models";

const QueryRequestContext =
  createContext<QueryRequestContextProps>(initialQueryRequest);

const QueryRequestProvider: FC = ({ children }: any) => {
  const [state, setState] = useState<QueryState>(initialQueryRequest.state);

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = { ...state, ...updates } as QueryState;
    setState(updatedState);
  };

  return (
    <QueryRequestContext.Provider value={{ state, updateState }}>
      {children}
    </QueryRequestContext.Provider>
  );
};

const useQueryRequest = () => useContext(QueryRequestContext);
export { QueryRequestProvider, useQueryRequest };
