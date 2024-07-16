import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { useCart } from "@/contexts/cart/CartContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Media, Row } from "reactstrap";

const cart = "/assets/images/cart.png";

export default function CartItems() {
  const curContext: any = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const [quantityError, setQuantityError] = useState(false);

  const { cartItems, removeFromCart, updateQty } = useCart()

  const handleQtyUpdate = (item: any, quantity: any) => {
    if (quantity >= 1) {
      setQuantityError(false);
      updateQty(item, quantity, false);
    } else {
      setQuantityError(true);
    }
  };

  const handleItemRemove = (item: any) => {
    if (cartItems.length === 1) {
      toast.error("Sorry! This is the only item in your cart...");
      return;
    }
    removeFromCart(item);
  };

  const getUnitPriceWithDiscount = (item: any, varIndex: any) => {
    if (!item) return 0;

    const price =
      varIndex >= 0 &&
        Array.isArray(item?.variants) &&
        item?.variants?.length > varIndex &&
        item?.variants[varIndex]?.selling_price
        ? item?.variants[varIndex]?.selling_price
        : item?.price?.base_sale
          ? item?.price?.base_sale
          : 0;

    const discount_amount =
      item?.discount && item?.discount?.amount ? item?.discount?.amount : 0;
    const campaign_discount =
      item?.campaigns &&
        Array.isArray(item?.campaigns) &&
        item?.campaigns?.length > 0
        ? item?.campaigns[0]?.end_at > Date.now()
          ? item?.campaigns[0]?.discount
          : 0
        : 0;

    if (varIndex >= 0) {
      const variant_discount =
        item?.variants &&
          Array.isArray(item?.variants) &&
          item?.variants?.length > varIndex
          ? Math.max(
            item?.variants[varIndex]?.price?.campaign_discount_amount,
            item?.variants[varIndex]?.price?.general_discount_amount
          ) || 0
          : 0;

      return (
        price -
        Math.max(
          variant_discount,
          Math.max(discount_amount, campaign_discount)
        ) || price - 0
      );
    } else {
      return price - Math.max(discount_amount, campaign_discount) || price - 0;
    }
  };
  const getUnitPriceWithoutDiscount = (item: any, varIndex: any) => {
    if (!item) return 0;

    const price =
      varIndex >= 0 &&
        Array.isArray(item?.variants) &&
        item?.variants?.length > varIndex
        ? item?.variants[varIndex]?.selling_price
        : item?.price?.base_sale
          ? item?.price?.base_sale
          : 0;

    return price;
  };

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <section className="">
          <Container>
            <Row>
              <Col sm="12">
                <table className="table">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">image</th>
                      <th scope="col">product name</th>
                      <th scope="col">price</th>
                      <th scope="col">quantity</th>
                      <th scope="col">action</th>
                      <th scope="col">total</th>
                    </tr>
                  </thead>
                  {cartItems.map((item: any, index: any) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            <div
                              style={{
                                maxWidth: 120,
                              }}>
                              <Link href={`/product/` + item.slug}>
                                <Media
                                  src={
                                    item?.variant >= 0
                                      ? item?.variants[item?.variant]?.thumbnail
                                      : item?.thumbnail?.src
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                              </Link>
                            </div>
                          </td>
                          <td>
                            <Link href={`/product/` + item.slug}>
                              {item?.name || item?.title || ""}
                            </Link>
                            {item?.variants &&
                              item?.variants?.length > 1 &&
                              item?.variant >= 0 && (
                                <>
                                  {item?.variants[item?.variant]?.option1 &&
                                    item?.variants[item?.variant]?.value1 && (
                                      <span style={{ display: "block" }}>{`${item?.variants[item?.variant]?.option1
                                        } : ${item?.variants[item?.variant]?.value1
                                        }`}</span>
                                    )}
                                  {item?.variants[item?.variant]?.option2 &&
                                    item?.variants[item?.variant]?.value2 && (
                                      <span style={{ display: "block" }}>{`${item?.variants[item?.variant]?.option2
                                        } : ${item?.variants[item?.variant]?.value2
                                        }`}</span>
                                    )}
                                  {item?.variants[item?.variant]?.option3 &&
                                    item?.variants[item?.variant]?.value3 && (
                                      <span style={{ display: "block" }}>{`${item?.variants[item?.variant]?.option3
                                        } : ${item?.variants[item?.variant]?.value3
                                        }`}</span>
                                    )}
                                </>
                              )}
                          </td>
                          <td>
                            <div>
                              {symbol}
                              {getUnitPriceWithDiscount(item, item?.variant)}
                            </div>
                            <div>
                              <del>
                                {symbol}
                                {getUnitPriceWithoutDiscount(
                                  item,
                                  item?.variant
                                )}
                              </del>
                            </div>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <input
                                  type="number"
                                  name="quantity"
                                  min={1}
                                  onChange={(e) =>
                                    handleQtyUpdate(
                                      item,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  className="form-control input-number"
                                  value={item.qty}
                                  style={{
                                    borderColor: quantityError ? "red" : "",
                                  }}
                                />
                              </div>
                            </div>
                            {item.qty >= item.stock ? "out of Stock" : ""}
                          </td>
                          <td>
                            <i
                              className="fa fa-times"
                              onClick={() => handleItemRemove(item)}></i>
                          </td>
                          <td>
                            {symbol}
                            {item?.qty *
                              getUnitPriceWithDiscount(item, item?.variant)}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                {/* <table className='table cart-table table-responsive-md'>
                  <tfoot>
                    <tr>
                      <td>total price :</td>
                      <td>
                        <h2>
                          {symbol} {total?.toFixed(2)}
                        </h2>
                      </td>
                    </tr>
                  </tfoot>
                </table> */}
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src={cart}
                      className="img-fluid mb-4 mx-auto"
                      alt=""
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Explore more shortlist some items.</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
}
