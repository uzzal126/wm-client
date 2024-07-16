import OrderTracking from "@/components/order/OrderTracking";
import Page404 from "@/pages/404";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

export default function OderCancel() {
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
      {invoice && (
        <Container>
          <Row>
            <Col md="12">
              <div
                style={{ fontSize: "50px", color: "red", textAlign: "center" }}
              >
                <i className="fa fa-times-circle" aria-hidden="true"></i>
                <h2>Sorry</h2>
                <p>Payment has been cancelled!</p>
              </div>
            </Col>
          </Row>
          {invoice && <OrderTracking invoiceId={invoice} showPayment />}
        </Container>
      )}
    </section>
  );
}
