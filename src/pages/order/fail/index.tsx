import OrderTracking from "@/components/order/OrderTracking";
import Page404 from "@/pages/404";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

export default function OrderFailed() {
  let storeData = useSelector(selectStoreData);
  const router = useRouter();
  const { invoice }: any = router.query;
  useEffect(() => {
    if (!invoice) {
      router.push("/");
    }
  }, [invoice]);
  if (storeData?.data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }
  return (
    <section className="pt-5 mt-3 section-b-space light-layout">
      <Container>
        {invoice && (
          <OrderTracking
            invoiceId={invoice}
            showPayment
            orderMessage={
              <div>
                <div className="success-text">
                  <i className="fa fa-check-circle" aria-hidden="true"></i>
                </div>
                <h3 className="py-2 text-center">Your order has been placed</h3>
              </div>
            }
            paymentMessage={
              <Row>
                <Col md="12">
                  <div
                    style={{
                      fontSize: "50px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {/* <h2>Sorry</h2>
                    <h4>Payment Failed!</h4> */}
                  </div>
                </Col>
              </Row>
            }
          />
        )}
      </Container>
    </section>
  );
}
