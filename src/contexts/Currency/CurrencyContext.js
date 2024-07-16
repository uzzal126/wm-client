import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";

export const Context = createContext({});

export const Provider = props => {
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  let storInfo = data?.store_info;
  const [selectedCurr, selectedCurrency] = useState({
    currency: "BDT",
    symbol: storInfo?.currency || "৳",
    value: 1,
  });

  const currencyContext = {
    selectedCurr,
    selectedCurrency,
  };

  return (
    <Context.Provider
      value={{
        state: selectedCurr,
        currencyContext: currencyContext,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export {
  Context as CurrencyContext,
  Provider as CurrencyContextProvider,
} from "./CurrencyContext";
