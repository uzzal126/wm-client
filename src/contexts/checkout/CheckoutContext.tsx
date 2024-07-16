import { CHECKOUT } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import React, { useContext, useEffect, useState } from "react";

import { getAuth } from "@/helpers/auth/AuthHelper";
import CheckoutContext from ".";
import { useAddress } from "../address/AddressProvider";

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const user = getAuth();
  const { setAddresses } = useAddress();

  const [shippingInfo, setShippingInfo] = useState({});

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCheckoutData();
  }, []);

  const getCheckoutData = async () => {
    setIsLoading(true);
    const res = await queryRequest(`${CHECKOUT}`, {
      customer_id: user && user?.id,
    });

    if (res?.success) {
      setPaymentMethods(res?.payment_method_list || []);
      if (
        Array.isArray(res?.payment_method_list) &&
        res?.payment_method_list?.length > 0
      ) {
        for (let i = 0; i < res?.payment_method_list?.length; i++) {
          if (res?.payment_method_list[i]?.name?.toLowerCase() === "cod") {
            setSelectedMethod(i);
            break;
          }
        }
      }
      if (Array.isArray(res?.address_list)) {
        setAddresses({ list: res?.address_list, email: res?.email });
      }
    }
    setIsLoading(false);
  };

  return (
    <CheckoutContext.Provider
      value={{
        paymentMethods,
        selectedMethod,
        setSelectedMethod,
        shippingInfo,
        setShippingInfo,
        getCheckoutData,
        isLoading,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

export default CheckoutProvider;
