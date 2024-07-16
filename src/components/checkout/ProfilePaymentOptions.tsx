import { useCheckout } from "@/contexts/checkout/CheckoutContext";
import { setDecimal } from "@/helpers/misc";
// import { CHECKOUT } from "@/helpers/services/api";
// import { queryRequest } from "@/helpers/services/request";
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { CLIENT_ACQUIRE_CHARGE } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { setLocal } from "@/helpers/storage";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

type Props = {
  handleModal: any;
  data: any;
};

export default function ProfilePaymentOptions({ handleModal, data }: Props) {
  const curContext: any = useContext(CurrencyContext);
  const currency = curContext?.state;
  const [paymentMethodObj, setPaymentMethodObj] = useState<any>({});
  const router = useRouter();
  // const {
  //   getPaymentMethods,
  //   paymentMethods,
  //   setSelectedPaymentMethod,
  //   selectedPaymentMethod,
  //   isLoading,
  // }: any = useContext(CheckoutContext);

  const { paymentMethods, selectedMethod, setSelectedMethod } = useCheckout();

  const handlePayment = async () => {
    const body = {
      payment_partner_id: paymentMethodObj?.id,
      with_agreement: 0,
      invoice_id: data?.order_description?.invoice_id,
    };
    const res = await queryRequest(CLIENT_ACQUIRE_CHARGE, body);
    if (res?.success) {
      if (res?.url) {
        setLocal("payment_method", paymentMethodObj?.id);
        setLocal("invoice_id", data?.order_description?.invoice_id);
        setLocal("payment_id", res?.paymentID);
        router.push(res?.url);
      } else {
        router.push(`/order/success?invoice=${res?.order_id}`);
      }
    } else {
      toast.error(res?.message || "Error Occurred");
    }
  };
  return (
    <div className="py-3">
      <div className="d-flex flex-column">
        <h3>Order Summary</h3>
        <div className={`d-flex`} style={{ paddingLeft: "5px" }}>
          <p>
            <strong>Sub Total: </strong>
            <span>{`${currency?.symbol} ${setDecimal(
              data?.order_description?.subtotal
            )}`}</span>
          </p>
        </div>
        <div className={`d-flex`} style={{ paddingLeft: "5px" }}>
          <p>
            <strong>Discount: </strong>
            <span>{`${currency?.symbol} ${setDecimal(
              data?.order_description?.discount
            )}`}</span>
          </p>
        </div>
        <div className={`d-flex`} style={{ paddingLeft: "5px" }}>
          <p>
            <strong>Delivery Fee: </strong>
            <span>{`${currency?.symbol} ${setDecimal(
              data?.order_description?.shipping_fee
            )}`}</span>
          </p>
        </div>
        <div className={`d-flex`} style={{ paddingLeft: "5px" }}>
          <p>
            <strong>Tax: </strong>
            <span>{`${currency?.symbol} ${setDecimal(
              data?.order_description?.tax
            )}`}</span>
          </p>
        </div>
        <div className={`d-flex`} style={{ paddingLeft: "5px" }}>
          <p>
            <strong>Total: </strong>
            <span>{`${currency?.symbol} ${setDecimal(
              data?.order_description?.total
            )}`}</span>
          </p>
        </div>
      </div>
      {Array.isArray(paymentMethods) && paymentMethods?.length > 0 ? (
        <>
          <h4 className="py-1" style={{ fontWeight: 600 }}>
            Choose payment method -{" "}
          </h4>
          {paymentMethods
            ?.filter(f => f?.name !== "COD")
            ?.map((item: any, indx) => (
              <div className="py-3" key={indx}>
                <Form.Check
                  type="radio"
                  name="payment-option"
                  id={`payment-method-${indx}`}
                  label={
                    <div className="d-flex ml-2">
                      <img src={item?.icon_url} />
                      <span className="ml-2">{item?.name}</span>
                    </div>
                  }
                  onClick={() => {
                    setSelectedMethod(indx);
                    setPaymentMethodObj(item);
                  }}
                  checked={indx === selectedMethod}
                />
                <p className="mb-0 pl-4">{item?.description}</p>
              </div>
            ))}
        </>
      ) : (
        <p className="py-5 text-center">No payment method found!</p>
      )}
      <div className="d-flex">
        <Button
          variant="primary rounded mx-2"
          disabled={!paymentMethodObj?.id}
          onClick={handlePayment}
        >
          Pay Now
        </Button>
        <Button variant="primary rounded btn-danger" onClick={handleModal}>
          Close
        </Button>
      </div>
    </div>
  );
}
