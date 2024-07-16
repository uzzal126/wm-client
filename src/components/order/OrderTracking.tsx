import ProductInfo from "@/components/account/common/ProductInfo";
import { getTimeFromUnixValue } from "@/helpers/misc";
import { ORDER_TRACKING } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import moment from "moment";
import { useEffect, useState } from "react";
import { Card, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { Label } from "reactstrap";
import NonProfilePayment from "../checkout/NonProfilePayment";

type Props = {
  invoiceId: string | number;
  showOrigin?: boolean;
  showTracking?: boolean;
  showPayment?: boolean;
  showShoppingBtn?: boolean;
  paymentMessage?: any;
  orderMessage?: any;
};

const OrderTracking = ({
  invoiceId,
  showOrigin = false,
  showTracking = false,
  showPayment = false,
  paymentMessage,
  orderMessage,
  showShoppingBtn = false,
}: Props) => {
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [merchantData, setMerchantData] = useState<any>({});
  const [progressList, setProgressList] = useState<any>({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (invoiceId) {
      trackOrder(invoiceId);
    }
  }, [invoiceId]);

  const trackOrder = async (id: any) => {
    setLoading(true);
    const res = await queryRequest(ORDER_TRACKING, {
      invoice_id: [id],
    });
    if (res?.success && res?.status_code === 200) {
      setOrderDetails(res?.data[0]);
      setMerchantData(res?.merchant_data);
      setProgressList(res?.progress_list);
      setLoading(false);
    } else {
      setLoading(false);
      setErr(true);
    }
  };
  if (loading) {
    return (
      <div className="py-5 d-flex align-items-center flex-column">
        <Spinner
          animation="border"
          variant="primary"
          // color="var(--theme-deafult)"
          style={{ width: 50, height: 50 }}
        />
        <Label className="py-2">Please wait ...</Label>
      </div>
    );
  }
  if (!loading && err) {
    return (
      <div className="py-5 d-flex flex-column align-items-center">
        <i
          className="fa fa-exclamation-triangle"
          style={{
            fontSize: 60,
          }}
        />
        <h2 className="py-2">No Order Found</h2>
      </div>
    );
  }

  return (
    <>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title>Payment Options</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <NonProfilePayment
            handleModal={() => setModal(false)}
            data={orderDetails}
          />
        </Modal.Body>
      </Modal>
      <div className="py-4 bg-light min-vh-100">
        <Container>
          <div
            style={{
              maxWidth: 650,
              margin: "0px auto",
            }}
          >
            {orderMessage}
            <Card className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <h4 className="mb-0 text-dark">
                      Order #{orderDetails?.invoice_id}
                    </h4>
                    <h6 className="mb-0 text-muted">
                      Payment Status: {orderDetails?.payment_status}
                    </h6>
                  </div>
                  <div className="d-flex flex-column">
                    {showPayment && (
                      <>
                        <div
                          style={{
                            textAlign: "center",
                            cursor: "pointer",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            marginTop: "3px",
                            color: "white",
                            background: "#0069D9",
                            borderRadius: 5,
                            width: "150px",
                          }}
                          onClick={() => setModal(!modal)}
                        >
                          <strong>Pay Now</strong>
                        </div>
                      </>
                    )}
                  </div>
                  {/* <h4 className="mb-0 text-dark">{orderDetails?.invoice_id}</h4> */}
                </div>
              </Card.Body>
            </Card>
            {showTracking && (
              <Card className="mb-3 border-0 shadow-sm">
                <Card.Body>
                  <h4 className="mb-0 text-dark">Tracking Details</h4>
                  <div className="mb-3 separator separator-dashed border-dark"></div>
                  {progressList.map((item: any, i: number) => (
                    <div className="py-2 order-track-step" key={i}>
                      <div className="mt-2 text-center order-track-date w-40px me-4 min-w-auto">
                        <p className="mr-3 order-track-date-stat text-muted">
                          {moment.unix(item?.created_at).format("MMM DD HH:mm")}
                        </p>
                      </div>
                      <div
                        className={`order-track-status ${
                          i === 0 ? "active" : "completed"
                        } `}
                      >
                        <span className="order-track-status-dot align-items-center d-flex justify-content-center">
                          <i className="text-white fa fa-check fs-5" />
                        </span>
                        <span className="order-track-status-line"></span>
                      </div>
                      <div className="order-track-text">
                        <p
                          className={`order-track-text-stat ${
                            i === 0 ? "text-primary" : ""
                          }`}
                        >
                          {item?.current_order_status}
                        </p>
                        <span className="order-track-text-sub">
                          {item?.order_note}
                        </span>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}
            {showOrigin && (
              <Card className="mb-3 border-0 shadow-sm">
                <Card.Body>
                  <Row>
                    <Col lg="6">
                      <h5>From</h5>
                      <div className="pt-3 border-top">
                        <img
                          alt=""
                          src={
                            JSON.parse(merchantData?.logo)?.fav_logo ||
                            "https://webmanza.com/images/logo.png"
                          }
                          width={120}
                        />
                        <div className="d-flex flex-column">
                          <strong>{merchantData?.site_title}</strong>
                          <span> {merchantData?.msisdn}</span>
                          <span className="text-muted">
                            {merchantData?.business_address}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col lg="6" className="text-right">
                      <h5>To</h5>
                      <div className="pt-3 border-top">
                        <div className="d-flex flex-column">
                          <strong>{orderDetails?.msisdn}</strong>
                          <span>{orderDetails?.customer_name}</span>
                          <span className="text-muted">
                            {JSON.parse(orderDetails?.shipping_address)
                              ?.street_address || ""}
                            <br />
                            {orderDetails?.zone || ""},
                            {orderDetails?.city || ""}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            <Card className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="mb-0 text-dark">Order Details</h4>
                    <h6 className="mb-0 text-muted">
                      Placed on:{" "}
                      {getTimeFromUnixValue(
                        orderDetails?.created_at,
                        "YYYY-MM-DD h:mmA"
                      )}
                    </h6>
                  </div>
                </div>
                <div className="mt-3 table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="text-right" colSpan={2}>
                          Price
                        </th>
                        <th className="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {orderDetails?.products?.map((product: any) => (
                          <ProductInfo
                            prodName={product?.name}
                            img={JSON.parse(product?.thumbnail)?.src}
                            qty={product?.qty}
                            price={product?.selling_price}
                          />
                        ))}
                      </>
                      {/* FOOTER */}
                      <tr>
                        <td></td>
                        <td className="text-right">Discount:</td>
                        <td className="text-right font-weight-bold">
                          {" "}
                          - ৳ {orderDetails?.discount}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="text-right">SubTotal:</td>
                        <td className="text-right font-weight-bold">
                          {" "}
                          ৳ {orderDetails?.subtotal}
                        </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td className="text-right">Delivery Cost:</td>
                        <td className="text-right font-weight-bold">
                          {" "}
                          ৳ {orderDetails?.shipping_fee}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="text-right font-weight-bold">Total:</td>
                        <td className="text-right font-weight-bold">
                          {" "}
                          ৳ {orderDetails?.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
            {/* <Card className="mb-3 border-0 shadow-sm">
            <Card.Body> */}

            {/* </Card.Body>
          </Card> */}
            {paymentMessage}
          </div>
        </Container>
      </div>
    </>
  );
};

export default OrderTracking;
