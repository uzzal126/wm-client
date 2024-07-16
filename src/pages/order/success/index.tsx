import ContinueShoppingBtn from "@/components/buttons/ContinueShoppingBtn";
import OrderTracking from "@/components/order/OrderTracking";
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { getThumbnail } from "@/helpers/misc";
import { ORDER_DETAILS } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { getLocal } from "@/helpers/storage";
import Page404 from "@/pages/404";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Media, Row } from "reactstrap";

const OrderSuccess = () => {
  const router = useRouter();
  const user = getLocal("user");

  const { invoice }: any = router.query;
  const curContext: any = useContext(CurrencyContext);
  const symbol = curContext?.state?.symbol;

  const [data, setData] = useState<any>({});

  let storeData = useSelector(selectStoreData);

  useEffect(() => {
    if (!invoice) {
      router.push("/");
    }
    if (user && user?.id) {
      getOrderDetails();
    }
  }, [invoice, user && user?.id]);

  const getOrderDetails = async () => {
    const res = await queryRequest(ORDER_DETAILS, {
      customer_id: user && user?.id,
      invoice_id: invoice,
    });
    if (res?.success) {
      setData(res);
    }
  };

  const getDeliveryDate = () => {
    const dt = new Date();
    dt.setDate(dt.getDate() + 3);
    return moment(dt).format("LL");
  };

  if (storeData?.data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <>
      {!invoice && (
        <section className="pt-5 mt-3 section-b-space light-layout">
          <Container>
            <Row>
              <Col md="12">
                <div
                  style={{
                    fontSize: "50px",
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                  <h3>No Invoice ID!</h3>
                  <h5>Redirecting....</h5>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      {invoice && (
        <section className="pt-5 mt-3 section-b-space light-layout">
          <Container>
            <Row>
              <Col md="12">
                <div className="success-text">
                  <i className="fa fa-check-circle" aria-hidden="true"></i>
                  <h2>thank you</h2>
                  <p>Your order has been successfully placed!</p>
                </div>
                <ContinueShoppingBtn />
              </Col>
            </Row>
          </Container>
        </section>
      )}
      {!user?.id && invoice && <OrderTracking invoiceId={invoice} />}

      {user && user?.id && invoice && (
        <section className="section-b-space light-layout">
          <Container>
            <Row>
              <Col lg="6">
                <div className="product-order">
                  <h3>your order details</h3>

                  {data &&
                    Array.isArray(data?.product_details) &&
                    data?.product_details.map((item: any, i: any) => (
                      <Row className="product-order-detail" key={i}>
                        <Col xs="3">
                          <Media
                            src={
                              (Array.isArray(item?.variants) &&
                                item?.variants[0]?.thumbnail) ||
                              getThumbnail(item)
                            }
                            alt=""
                            className="img-fluid blur-up lazyload"
                          />
                        </Col>
                        <Col xs="3" className="order_detail">
                          <div>
                            <h4>product name</h4>
                            <h5>{item.name}</h5>
                          </div>
                        </Col>
                        <Col xs="3" className="order_detail">
                          <div>
                            <h4>quantity</h4>
                            <h5>{item.qty}</h5>
                          </div>
                        </Col>
                        <Col xs="3" className="order_detail">
                          <div>
                            <h4>price</h4>
                            <h5>
                              {symbol}
                              {item?.selling_rate}
                            </h5>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  <div className="total-sec">
                    <ul>
                      <li>
                        discount{" "}
                        <span>
                          - {symbol} {data?.order_description?.discount}
                        </span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        subtotal{" "}
                        <span>
                          {symbol} {data?.order_description?.subtotal}
                        </span>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        shipping fee{" "}
                        <span>
                          {symbol} {data?.order_description?.shipping_fee}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="final-total">
                    <h3>
                      total{" "}
                      <span>
                        {symbol}
                        {data?.order_description?.total}
                      </span>
                    </h3>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <Row className="order-success-sec">
                  <Col sm="6">
                    <h4>summary</h4>
                    <ul className="order-detail">
                      <li>{`order ID: ${invoice}`}</li>
                      <li>{`Order Date: ${moment(new Date()).format(
                        "LL"
                      )}`}</li>
                      <li>
                        Order Total: {symbol} {data?.order_description?.total}
                      </li>
                    </ul>
                  </Col>
                  <Col sm="6">
                    <h4>shipping address</h4>
                    <ul className="order-detail">
                      <li>{`City: ${data?.order_description?.city}`}</li>
                      <li>{`Zone: ${data?.order_description?.zone}`}</li>
                      <li>{`Area: ${data?.order_description?.area}`}</li>
                      <li>{`Contact No. ${data?.order_description?.msisdn}`}</li>
                    </ul>
                  </Col>
                  <Col sm="12" className="payment-mode">
                    <h4>payment method</h4>
                    <p>Cash on delivery (COD)</p>
                  </Col>
                  <Col md="12">
                    <div className="delivery-sec">
                      <h3>expected date of delivery</h3>
                      <h2>{getDeliveryDate()}</h2>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default OrderSuccess;
