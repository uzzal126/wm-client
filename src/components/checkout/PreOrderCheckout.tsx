import { SUBMIT_ORDER } from "@/helpers/services/api";
import { useState } from "react";
import { Container } from "reactstrap";
import { isOrderValid, prepareOrderData } from "../../helpers/misc";

import { useAddress } from "@/contexts/address/AddressProvider";
import { useCart } from "@/contexts/cart/CartContext";
import { useCheckout } from "@/contexts/checkout/CheckoutContext";
import { getAuth } from "@/helpers/auth/AuthHelper";
import { queryRequest } from "@/helpers/services/request";
import { setLocal } from "@/helpers/storage";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PreOrderCartItems from "./PreOrderCartItems";
import DeliveryOptions from "./deleiveryOptions";
import PaymentOptions from "./paymentOptions";
import ShippingDetails from "./shipping&Billing";

type TypesCheckoutPage = {
  isSeperateDeliveryAddress: boolean | string;
};

const PreOrderCheckout = ({ isSeperateDeliveryAddress }: TypesCheckoutPage) => {
  const router = useRouter();
  const storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const privacy_policy =
    data && data?.checkout_setting && data?.checkout_setting?.privacy_policy;
  const user = getAuth();
  const [agreed, setAgreed] = useState(false);

  const { addresses, selected } = useAddress();

  const { paymentMethods, selectedMethod } = useCheckout();

  const {
    preOrderItems: cartItems,
    selectedPreOrderItemsSubtotal: selectedItemsSubtotal,
    calcPreOrderItemsWeight: calcCartItemsWeight,
    preOrderShippingFee: shippingFee,
    clearPreOrderItems: clearCart,
    selectedPreOrderItems: selectedItems,
  } = useCart();

  const onSubmit = async () => {
    if (
      isOrderValid(selectedItems, selected, addresses, privacy_policy, agreed)
    ) {
      const user_id = user?.id;
      const payment_method = paymentMethods[selectedMethod]
        ? paymentMethods[selectedMethod]?.id
        : 1;
      const shipping_address = addresses[selected];

      const data = prepareOrderData({
        cartItems,
        selectedItems,
        shipping_address,
        subtotal: selectedItemsSubtotal(),
        total: selectedItemsSubtotal() + (shippingFee || 0),
        shipping_fee: shippingFee,
        weight: calcCartItemsWeight(),
        user_id,
        payment_method,
      });

      const res = await queryRequest(SUBMIT_ORDER, data);
      if (res?.success) {
        clearCart();
        if (res?.redirect_url) {
          setLocal("payment_method", payment_method);
          setLocal("invoice_id", res?.invoice_id);
          setLocal("payment_id", res?.paymentID);
          router.push(res?.redirect_url);
        } else {
          router.push(`/order/success?invoice=${res?.order_id}`);
        }
      } else {
        toast.error(res?.message);
      }
    }
  };

  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="mb-10 row gutter-lg">
            <div className="mb-6 col-lg-8 pr-lg-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="text-uppercase">Order Summary</h4>
                  <DeliveryOptions />
                  <PreOrderCartItems />
                </div>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="card bg-light">
                <div className="card-body">
                  {!isSeperateDeliveryAddress && (
                    <h4 className="text-uppercase">Shipping & Billing</h4>
                  )}
                  <ShippingDetails
                    isSeperateDeliveryAddress={isSeperateDeliveryAddress}
                  />
                  {isSeperateDeliveryAddress && <></>}
                  <PaymentOptions />
                  {Array.isArray(privacy_policy) &&
                    privacy_policy?.length > 0 && (
                      <div className="pt-3">
                        <label
                          style={{
                            top: "2px",
                            left: 0,
                            borderRadius: "3px",
                            display: "inline-block",
                            position: "relative",
                            marginBottom: "10px",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            required
                            onChange={() => setAgreed(!agreed)}
                            checked={agreed}
                          />
                          <span style={{ paddingLeft: "10px" }}>
                            I agree to the{" "}
                          </span>
                          {privacy_policy.map((item, indx) => (
                            <Link href={item?.page_route || `#`} key={indx}>
                              {item?.label}
                              {indx < privacy_policy.length - 1 ? ", " : "."}
                            </Link>
                          ))}
                        </label>
                      </div>
                    )}
                  <div>
                    <button
                      type="submit"
                      disabled={
                        !isOrderValid(
                          selectedItems,
                          selected,
                          addresses,
                          privacy_policy,
                          agreed
                        ) || paymentMethods?.length == 0
                      }
                      style={{
                        cursor:
                          isOrderValid(
                            selectedItems,
                            selected,
                            addresses,
                            privacy_policy,
                            agreed
                          ) || paymentMethods?.length == 0
                            ? "pointer"
                            : "not-allowed",
                      }}
                      className="btn-solid btn"
                      onClick={onSubmit}
                    >
                      Pre-Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PreOrderCheckout;
