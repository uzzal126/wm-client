import { createContext } from "react";

type PaymentType = {
  id: number;
  type: string;
  name: string;
  icon_url: string;
};

export interface CheckoutContextType {
  paymentMethods: PaymentType[];
  selectedMethod: number;
  setSelectedMethod: (e: number) => void;
  shippingInfo: any;
  setShippingInfo: any;
  getCheckoutData?: any;
  isLoading?: boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export default CheckoutContext;
