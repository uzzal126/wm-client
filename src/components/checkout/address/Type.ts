import { AddressType } from "@/contexts/address/type";

export type TypeAddress = {
  onCancel: (e: boolean) => void;
  onChange: (e: AddressType | {}) => void;
  formValues?: AddressType | undefined | any;
  edit?: boolean;
  index?: number;
};

export type TypeLocationData = {
  region_id?: number;
  city_id?: number;
  zone_id?: number;
  area_id?: number;
  region_name?: string;
  city_name?: string;
  zone_name?: string;
  area_name?: string;
};

export type TypeLocation = {
  label: string;
  setData: TypeLocationData;
  onChange: (e: TypeLocationData) => void;
};

export type TypeAddressModal = {
  edit?: boolean;
  index?: number;
  editStyle?: any;
  addStyle?: any;
  data?: AddressType | undefined;
  onChange: (e: AddressType | {}) => void;
};
