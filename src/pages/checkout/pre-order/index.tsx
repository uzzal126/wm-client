import PreOrderCheckout from "@/components/checkout/PreOrderCheckout";
import SeoHead from "@/components/layout/seo/head";
import { getAuth } from "@/helpers/auth/AuthHelper";
import Page404 from "@/pages/404";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PreOrderCheckoutPage = () => {
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
      <SeoHead title={`Pre-order Checkout | ${data?.store_info?.site_title}`} />
      <PreOrderCheckout isSeperateDeliveryAddress={isSeperateDeliveryAddress} />
    </>
  );
};

export default PreOrderCheckoutPage;
