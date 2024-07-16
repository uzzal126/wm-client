import { useCheckout } from "@/contexts/checkout/CheckoutContext";
import Form from "react-bootstrap/Form";

export default function PaymentOptions() {
  const { paymentMethods, selectedMethod, setSelectedMethod } = useCheckout();

  return (
    <div className="mt-5">
      <h4 className="title font-weight-bold">Payment Option</h4>
      {Array.isArray(paymentMethods) && paymentMethods.length > 0 ? (
        paymentMethods.map((item: any, indx) => (
          <div className="py-3" key={indx}>
            <Form.Check
              type="radio"
              name="payment-option"
              id={`payment-method-${indx}`}
              label={
                <div className="ml-2 d-flex">
                  <img src={item?.icon_url} />
                  <span className="ml-2">{item?.name}</span>
                </div>
              }
              onClick={() => setSelectedMethod(indx)}
              checked={indx === selectedMethod}
            />
            <p className="pl-4 mb-0">{item?.description}</p>
          </div>
        ))
      ) : (
        <div className="py-2 text-danger">
          No payment method found,
          <br /> Please contact admin
        </div>
      )}
    </div>
  );
}
