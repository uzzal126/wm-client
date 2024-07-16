'use client'
import { getAuth } from "@/helpers/auth/AuthHelper";
import { ADD_EDIT_ADDRESS, DELETE_ADDRESS } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { getLocal, setLocal } from "@/helpers/storage";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddressContext from "./AddressContext";
import { AddressType } from "./type";

const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const localAddress = getLocal("address_list");
  const [addresses, setAddresses] = useState<AddressType[]>(localAddress || []);
  const [selected, setSelected] = useState<number>(0);
  const auth = getAuth();

  useEffect(() => {
    setLocal("address_list", addresses);
  }, [addresses]);

  const handleSetAddress = (address: any) => {
    if (address) {
      const list: any = [];
      address?.list &&
        address?.list.forEach((item: any) => {
          list.push({
            name: item?.name,
            id: item?.id,
            mobile: item?.msisdn,
            address: item?.street_address,
            email: address?.email || item?.email,
            address_type: item?.address_type,
            city_id: item?.city_id,
            region_id: item?.region_id,
            area_id: item?.area_id,
            zone_id: item?.zone_id,
            region_name: item?.region,
            city_name: item?.city,
            zone_name: item?.zone,
            area_name: item?.area,
            region: {
              name: item?.region,
              id: item?.region_id,
              title: item?.region,
            },
            city: {
              name: item?.city,
              id: item?.city_id,
              title: item?.city,
            },
            zone: {
              name: item?.zone,
              id: item?.zone_id,
              title: item?.zone,
            },
            area: {
              name: item?.area,
              id: item?.area_id,
              title: item?.area,
            },
          });
        });
      setAddresses(list);
      setLocal("address_list", list);
    }
  };

  const add = (value: AddressType) => {
    setAddresses((oldData) => {
      return [...oldData, value];
    });
  };
  const update = (index: number, value: AddressType) => {
    setAddresses((oldData) => {
      return [...oldData.slice(0, index), value, ...oldData.slice(index + 1)];
    });
  };

  const remove = async (index: number) => {
    if (index) {
      const adr = addresses.find((e, idx) => index === idx);
      if (auth && auth?.id) {
        const res = await queryRequest(DELETE_ADDRESS, {
          customer_id: auth && auth?.id,
          address_id: adr?.id,
        });
        if (!res?.success) {
          toast.error("Sorry! Address could not be deleted!");
          return;
        }
      }
      const list = addresses?.filter((e, i) => i != index);
      setAddresses(list);
    }
  };

  const store = async (
    values: AddressType,
    index?: number,
    addressId?: number
  ) => {
    if (auth && auth.id) {
      const post = {
        name: values?.name,
        customer_id: auth.id,
        address_id: addressId || null,
        msisdn: values?.mobile,
        address_details: {
          address_type: values?.address_type || "Home",
          street_address: values?.address,
          city_id: values?.city?.id || 0,
          area_id: values?.area?.id || 0,
          region_id: values?.region?.id || 0,
          zone_id: values?.zone?.id || 0,
        },
      };
      const res = await queryRequest(ADD_EDIT_ADDRESS, post);
      if (res?.success && res.status_code === 200) {
        toast.success(res.message);
        const newAddress = { ...values, ...res.new_address_details };
        if (addressId && index !== undefined) {
          update(index, newAddress);
        } else {
          add(newAddress);
        }
      } else {
        toast.error(res.message);
      }
    } else {
      if (/*addressId &&*/ index !== undefined) {
        update(index, values);
      } else {
        add(values);
      }
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        setAddresses: handleSetAddress,
        add,
        remove,
        update,
        store,
        selected,
        setSelected,
      }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

export default AddressProvider;
