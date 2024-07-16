import { createContext } from "react";
import { AddressType } from "./type";

export interface AddressContextType {
  addresses: AddressType[];
  setAddresses: (e: any) => void;
  add: (value: AddressType) => void;
  update: (index: number, value: AddressType) => void;
  store: (value: AddressType, index?: number, addressId?: number) => void;
  setSelected: (index: number) => void;
  selected: number;
  remove: (index: number) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export default AddressContext;
