import ProductInfo from "@/components/account/common/ProductInfo";
import { ORDER_TRACKING } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Label } from "reactstrap";
import Page404 from "../404";

const Tracking = () => {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const queryParams = useSearchParams();
  const invoiceId = queryParams.get("invoice_id");
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [merchantData, setMerchantData] = useState<any>({});
  const [progressList, setProgressList] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (invoiceId) {
      setErr(false);
      trackOrder(invoiceId);
    }
    if (!invoiceId) {
      setErr(true);
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
  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="d-flex align-items-center flex-column py-5">
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
  if (err) {
    return (
      <div className="d-flex flex-column align-items-center py-5">
        <i
          className="fa fa-exclamation-triangle"
          style={{
            fontSize: 60,
          }}
        />
        <h2 className="py-2">Error Occurred</h2>
      </div>
    );
  }
  if (!loading && err) {
    return (
      <div className="d-flex flex-column align-items-center py-5">
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
    <div className="bg-light min-vh-100 py-4">
      <Container>
        <div
          style={{
            maxWidth: 650,
            margin: "0px auto",
          }}
        >
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0 text-muted">Order ID</h5>
                <h4 className="mb-0 text-dark">{orderDetails?.invoice_id}</h4>
              </div>
            </Card.Body>
          </Card>
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <h4 className="mb-0 text-dark">Tracking Details</h4>
              <div className="separator separator-dashed border-dark mb-3"></div>
              {progressList.map((item: any, i: number) => (
                <div className="order-track-step py-2" key={i}>
                  <div className="order-track-date w-40px text-center me-4 min-w-auto mt-2">
                    <p className="order-track-date-stat text-muted mr-3">
                      {moment.unix(item?.created_at).format("MMM DD HH:mm")}
                    </p>
                  </div>
                  <div
                    className={`order-track-status ${
                      i === 0 ? "active" : "completed"
                    } `}
                  >
                    <span className="order-track-status-dot align-items-center d-flex justify-content-center">
                      <i className="fa fa-check fs-5 text-white" />
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
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <Row>
                <Col lg="6">
                  <h5>From</h5>
                  <div className="border-top pt-3">
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
                  <div className="border-top pt-3">
                    <div className="d-flex flex-column">
                      <strong>{orderDetails?.msisdn}</strong>
                      <span>{orderDetails?.customer_name}</span>
                      <span className="text-muted">
                        {JSON.parse(orderDetails?.shipping_address)
                          ?.street_address || ""}
                        <br />
                        {orderDetails?.zone || ""},{orderDetails?.city || ""}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="mb-0 text-dark">Order Details</h4>
              </div>
              <div className="table-responsive mt-3">
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
                          price={product?.total_price}
                        />
                      ))}
                    </>
                    {/* FOOTER */}
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
                      <td className="text-right">Discount:</td>
                      <td className="text-right font-weight-bold">
                        {" "}
                        - ৳ {orderDetails?.discount}
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
          {/* <Card className="border-0 shadow-sm mb-3">
            <Card.Body> */}
          <div className="d-flex flex-column align-items-center">
            <Link href={"https://webmanza.com/"} target="_blank">
              <div className="d-flex align-items-center">
                <img
                  alt=""
                  src="https://webmanza.com/images/Web-Manza-Fabicon.png"
                  width={20}
                />
                <h4 className="mb-0 ml-2 text-muted">Powered By: WebManza</h4>
              </div>
            </Link>
          </div>
          {/* </Card.Body>
          </Card> */}
        </div>
      </Container>
    </div>
  );
};

export default Tracking;
