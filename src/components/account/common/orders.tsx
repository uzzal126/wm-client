import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import ProfilePaymentOptions from "@/components/checkout/ProfilePaymentOptions";
import { RatingMake } from "@/components/widgets/product-box/includes/parties";
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { getAuth } from "@/helpers/auth/AuthHelper";
import { incomplete_payment_ids } from "@/helpers/constants/order.constants";
import {
  ORDER_CANCEL,
  ORDER_DETAILS,
  ORDER_LIST,
} from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import {
  generatePaginationObj,
  getThumbnail,
  setDecimal,
} from "../../../helpers/misc";
import ClientPagination from "./ClientPagination";
import OrderProgress from "./progress";

export default function Orders() {
  const curContext: any = useContext(CurrencyContext);
  const currency = curContext?.state;
  const [orders, setOrders] = useState<any>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(0);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [orderCancelled, setOrderCancelled] = useState(false);
  const [page, setPage] = useState(1);

  const customer = getAuth();

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getOrders();

    if (orders?.length > 0) {
      getOrderDetails(orders[selectedOrder]?.invoice_id);
    }
  }, [orders?.length]);
  const getOrders = async () => {
    setOrdersLoading(true);
    const res = await queryRequest(ORDER_LIST, {
      customer_id: customer && customer?.id,
    });

    if (res?.success) {
      setOrdersLoading(false);
      setOrders(res?.order_list);
      if (Array.isArray(res?.order_list) && res?.order_list?.length > 0)
        setSelectedOrder(0);
    }
  };

  const getOrderDetails = async (invoice_id: number) => {
    setLoading(true);
    const res = await queryRequest(ORDER_DETAILS, {
      customer_id: customer && customer?.id,
      invoice_id: invoice_id,
    });
    setLoading(false);
    if (res?.success) {
      setOrderDetails(res);
    }
  };

  const getShippingAddress = (adr: any) => {
    if (adr) {
      return `region: ${orderDetails?.order_description?.region}, city: ${orderDetails?.order_description?.city}, area: ${orderDetails?.order_description?.area}, street address: ${adr?.street_address}`;
    } else {
      return "";
    }
  };

  const cancelOrder = async () => {
    Swal.fire({
      title: "Are you sure ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await queryRequest(ORDER_CANCEL, {
          customer_id: customer?.id,
          order_id: orders[selectedOrder]?.invoice_id,
        });
        if (res?.success) {
          toast.success(res?.message);
          setOrderCancelled(true);
          getOrderDetails(orders[selectedOrder]?.invoice_id);
          getOrders();
        } else {
          toast.error(res?.message || "Could not cancel order!");
        }
      }
    });
  };

  const pagination = generatePaginationObj(page, orders && orders?.length, 5);
  if (ordersLoading) {
    return (
      <>
        <div className="mt-5 d-flex align-items-center flex-column w-100">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 50, height: 50 }}
          />
        </div>
      </>
    );
  }

  if (!ordersLoading && orders?.length === 0) {
    return (
      <section className="mt-5 cart-section section-b-space d-flex align-items-center flex-column w-100">
        <Container>
          <Row>
            <Col sm="12">
              <div>
                <div className="text-center col-sm-12 empty-cart-cls">
                  <div className="not-found">
                    <img
                      src="/assets/images/empty-search.jpg"
                      alt="No job application found"
                    />
                  </div>
                  <h3 className="mt-0 mb-0">
                    <strong>Your Order List Is Empty</strong>
                  </h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title>Payment Options</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <ProfilePaymentOptions
            handleModal={() => setModal(false)}
            data={orderDetails}
          />
        </Modal.Body>
      </Modal>
      <Col lg="4">
        {orders?.length > 0 &&
          orders
            ?.slice(pagination.pagination.from - 1, pagination.pagination.to)
            ?.map((item: any, indx: number) => (
              <Card
                className="mt-2 border-0 rounded"
                key={indx}
                onClick={() => {
                  setSelectedOrder(indx);
                  getOrderDetails(item?.invoice_id);
                }}
                style={{ cursor: "pointer" }}
              >
                <Card.Body
                  className={indx === selectedOrder ? `shadow-sm` : ``}
                  style={{
                    background: indx === selectedOrder ? "#edf8ff" : "white",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="d-flex flex-column ">
                        <small>Order ID: </small>
                        <strong>{item?.invoice_id}</strong>
                      </h5>
                      <p>
                        Date: <strong>{item?.order_date}</strong>
                      </p>
                      <p className="mb-0">
                        Status:{" "}
                        <strong className="text-primary">
                          {item?.order_status}
                        </strong>
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
        {orders?.length > 5 && (
          <ClientPagination
            loading={false}
            pagination={pagination.pagination}
            onChange={(e: any) => {
              setSelectedOrder(null);
              setPage(e.page);
            }}
          />
        )}
      </Col>
      {orderDetails &&
        typeof orderDetails == "object" &&
        Object.keys(orderDetails)?.length > 0 && (
          <Col lg="7">
            {loading && (
              <>
                <div className="mt-5 d-flex align-items-center flex-column">
                  <Spinner
                    animation="border"
                    variant="primary"
                    style={{ width: 50, height: 50 }}
                  />
                </div>
              </>
            )}
            {!loading && (
              <Card
                className="px-2 mt-2 border-0 rounded-xl"
                style={{ background: "#f9fafb" }}
              >
                <Card.Body>
                  <table className="table border-0">
                    <thead>
                      <tr>
                        <th className="text-left border-0 profile-th">
                          Product / Quantity
                        </th>
                        <th className="text-right border-0 profile-th">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.product_details &&
                        orderDetails?.product_details?.length > 0 &&
                        orderDetails?.product_details?.map(
                          (item: any, indx: any) => (
                            <tr key={indx} className="no-border">
                              <td className="no-border">
                                <div className="d-flex">
                                  <div
                                    className="mr-3"
                                    style={{
                                      maxWidth: "60px",
                                      minWidth: "60px",
                                    }}
                                  >
                                    <Link href={`/product/${item?.pd_slug}`}>
                                      <img
                                        src={getThumbnail(item)}
                                        alt=""
                                        width={60}
                                      />
                                    </Link>
                                  </div>
                                  <div className={`mr-0`}>
                                    <Link href={`/product/${item?.pd_slug}`}>
                                      {item?.name}
                                    </Link>
                                    &nbsp;
                                    <strong>x {item?.qty}</strong>
                                    <br />
                                    <>
                                      {item?.option &&
                                        item?.value &&
                                        item?.option !== "Variant" &&
                                        item?.value !== "Default" && (
                                          <span
                                            style={{ display: "block" }}
                                          >{`${item?.option} : ${item?.value}`}</span>
                                        )}
                                      {item?.option2 && item?.value2 && (
                                        <span
                                          style={{ display: "block" }}
                                        >{`${item?.option2} : ${item?.value2}`}</span>
                                      )}
                                      {item?.option3 && item?.value3 && (
                                        <span
                                          style={{ display: "block" }}
                                        >{`${item?.option3} : ${item?.value3}`}</span>
                                      )}
                                    </>
                                    <div className="mr-1 mt-3">
                                      {orderDetails.order_description
                                        .order_status === "Delivered" && (
                                        <>
                                          <div className="mt-0">
                                            <h6 className="mb-0">
                                              {item.customer_rating.comment?.slice(
                                                0,
                                                65
                                              )}
                                            </h6>
                                            {item.customer_rating.rating ? (
                                              <RatingMake
                                                total={
                                                  item.customer_rating.rating
                                                }
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Link
                                            href={`/review/${
                                              item?.pd_slug
                                            }?key=${
                                              item?.attribute_id
                                            }&rating=${
                                              item.customer_rating.rating || 0
                                            }&comment=${encodeURIComponent(
                                              item.customer_rating.comment || ""
                                            )}`}
                                            className="px-2 py-2 rounded-sm btn-success d-inline-block"
                                          >
                                            <i className="mr-1 fa fa-pen-to-square"></i>
                                            {item.customer_rating.rating ||
                                            item.customer_rating.comment
                                              ? ""
                                              : "Review"}
                                          </Link>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                className="no-border text-right"
                                style={{
                                  width: "90px",
                                }}
                              >
                                ৳ {item.total_price}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                  <div className="customer-details">
                    <div className=" order-reverse">
                      <div
                        className={`col-sm-12`}
                        style={{ paddingTop: "15px" }}
                      >
                        <div className="col-sm-12">
                          <div className="customer-address">
                            <address>
                              <p className="mb-2">
                                <strong>Shipping Address</strong>
                              </p>
                              <span>
                                {orderDetails?.order_description &&
                                  getShippingAddress(
                                    orderDetails?.order_description
                                      .shipping_address
                                  )}
                              </span>
                            </address>
                          </div>
                        </div>
                        <div
                          className={`d-flex`}
                          style={{ paddingLeft: "15px" }}
                        >
                          <p>
                            <strong>Sub Total: </strong>
                            <span>{`${currency?.symbol} ${setDecimal(
                              orderDetails?.order_description.subtotal
                            )}`}</span>
                          </p>
                        </div>
                        <div
                          className={`d-flex`}
                          style={{ paddingLeft: "15px" }}
                        >
                          <p>
                            <strong>Discount: </strong>
                            <span>{`${currency?.symbol} ${setDecimal(
                              orderDetails?.order_description.discount
                            )}`}</span>
                          </p>
                        </div>
                        <div
                          className={`d-flex`}
                          style={{ paddingLeft: "15px" }}
                        >
                          <p>
                            <strong>Delivery Fee: </strong>
                            <span>{`${currency?.symbol} ${setDecimal(
                              orderDetails?.order_description.shipping_fee
                            )}`}</span>
                          </p>
                        </div>
                        <div
                          className={`d-flex`}
                          style={{ paddingLeft: "15px" }}
                        >
                          <p>
                            <strong>Tax: </strong>
                            <span>{`${currency?.symbol} ${setDecimal(
                              orderDetails?.order_description.tax
                            )}`}</span>
                          </p>
                        </div>
                        <div
                          className={`d-flex`}
                          style={{ paddingLeft: "15px" }}
                        >
                          <p>
                            <strong>Total: </strong>
                            <span>{`${currency?.symbol} ${setDecimal(
                              orderDetails?.order_description.total
                            )}`}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {incomplete_payment_ids.includes(
                    orderDetails?.order_description?.payment_status_id
                  ) &&
                    orderDetails?.order_description?.order_status_id < 4 &&
                    !orderDetails?.order_description?.paymentchannel
                      ?.toLowercase()
                      .includes("cod") && (
                      <>
                        {orderDetails.order_description.payment_method !==
                        "Cash On Delivery" ? (
                          <div className="pay-now-btn" onClick={toggle}>
                            <strong>Pay Now</strong>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  <OrderProgress
                    invoice_id={orders[selectedOrder]?.invoice_id}
                    orderCancelled={orderCancelled}
                  />
                  {orderDetails?.order_description?.order_status_id !== 7 && (
                    <>
                      <Link
                        className="mt-2 mb-2 btn track-order-btn d-block w-100"
                        href={`/tracking?invoice_id=${orders[selectedOrder]?.invoice_id}`}
                      >
                        <i className="mr-1 fa fa-info-circle"></i>
                        Track Order
                      </Link>
                      <Button
                        className="mt-2 rounded btn d-block w-100"
                        onClick={cancelOrder}
                        variant="danger"
                        style={{ color: "white" }}
                      >
                        <i className="mr-1 fa fa-trash"></i>
                        <span>Cancel Order</span>
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        )}
    </>
  );
}
