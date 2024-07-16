import { CHECK_PAYMENT_STATUS } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { getLocal, removeLocal } from "@/helpers/storage";
import Page404 from "@/pages/404";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";

export default function OrderPaymentCheck() {
  const router = useRouter();
  const { status } = router.query;
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;

  useEffect(() => {
    if (
      getLocal("invoice_id") &&
      getLocal("payment_method") &&
      getLocal("payment_id")
    ) {
      checkPaymentStatus(
        getLocal("payment_method"),
        getLocal("invoice_id"),
        getLocal("payment_id")
      );
    }
  }, [getLocal("invoice_id")]);

  const checkPaymentStatus = async (
    payment_method: any,
    invoice_id: any,
    payment_id: any
  ) => {
    const post_data = {
      payment_partner_id: payment_method,
      with_agreement: 0,
      invoice_id: invoice_id,
      paymentID: payment_id,
    };

    const res = await queryRequest(CHECK_PAYMENT_STATUS, post_data);
    if (res?.success) {
      router.push(`/order/success?invoice=${invoice_id}`);
      removeLocal("payment_method");
      removeLocal("invoice_id");
      removeLocal("payment_id");
    } else {
      if (status === "cancel") {
        router.push(`/order/cancel?invoice=${invoice_id}`);
      } else {
        router.push(`/order/fail?invoice=${invoice_id}`);
      }
      removeLocal("payment_method");
      removeLocal("invoice_id");
      removeLocal("payment_id");
    }
  };

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <div className={"container"}>
      <div
        className="row mx-0 margin-default mt-4"
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        <h4>Processing...</h4>
        <ReactLoading type={"spin"} color={"grey"} />
      </div>
    </div>
  );
}
