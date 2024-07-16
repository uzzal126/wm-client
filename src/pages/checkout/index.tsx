import CheckoutPage from "@/components/checkout";
import SeoHead from "@/components/layout/seo/head";
import { getAuth } from "@/helpers/auth/AuthHelper";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import Page404 from "../404";

const Checkout = () => {
  const router = useRouter();
  const currentUser = getAuth();
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const { checkout_setting } = data;
  const guestAllowed =
    checkout_setting &&
    checkout_setting?.shop_checkout_allow &&
    checkout_setting?.shop_checkout_allow?.allow_guest_checkout
      ? true
      : false;

  const isSeperateDeliveryAddress =
    checkout_setting &&
    checkout_setting?.shop_checkout_allow &&
    checkout_setting?.shop_checkout_allow?.allow_seperate_delivery
      ? true
      : false;

  useEffect(() => {
    if (
      !guestAllowed &&
      !currentUser &&
      data?.store_info?.store_cat_id !== 20
    ) {
      router.push("/auth/login");
    }
  }, []);

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <>
      <SeoHead title={`Checkout | ${data?.store_info?.site_title}`} />
      <CheckoutPage isSeperateDeliveryAddress={isSeperateDeliveryAddress} />
    </>
  );
};

export default Checkout;
