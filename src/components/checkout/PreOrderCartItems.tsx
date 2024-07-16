"use client";
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { useCart } from "@/contexts/cart/CartContext";
import {
  formatPrice,
  getDiscountAmountVariant,
  getDiscountPercentVariant,
  getDiscountPriceVariant,
  getNormalPriceVariant,
} from "@/helpers/misc";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function PreOrderCartItems() {
  const [cartItems, setCartItems] = useState([]);

  const {
    updatePreOrderQty: updateQty,
    selectedPreOrderItems: selectedItems,
    selectedPreOrderItemsDiscount: selectedItemsDiscount,
    setSelectedPreOrderItems: setSelectedItems,
    selectedPreOrderItemsSubtotal: selectedItemsSubtotal,
    clearPreOrderItems: clearCart,
    preOrderShippingFee: shippingFee,
    preOrderItems: startCartItems,
  } = useCart();
  // console.log("pre order items page", startCartItems);

  useEffect(() => {
    setCartItems(startCartItems as never);
  }, [startCartItems]);

  const curContext: any = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;

  const handleQtyUpdate = (item: any, quantity: number) => {
    if (quantity >= 1) {
      updateQty(item, quantity, false);
    }
  };

  const isSelectedItem = (indx: any) => {
    return selectedItems && selectedItems.includes(indx);
  };

  const handleSelectItem = (indx: any) => {
    !isSelectedItem(indx)
      ? setSelectedItems([...selectedItems, indx])
      : setSelectedItems([...selectedItems.filter((e: any) => e !== indx)]);
  };

  const handleSelectAll = () => {
    const alreadySelected = cartItems.length === selectedItems.length;

    if (alreadySelected) {
      setSelectedItems([]);
    } else {
      const items = [];
      for (let i = 0; i < cartItems.length; i++) {
        items.push(i);
      }
      setSelectedItems([...items]);
    }
  };

  return (
    <div className="pt-4">
      <div className="">
        <p className="text-danger">
          {selectedItems?.length === 0
            ? "Please select items to place order"
            : ""}
        </p>
      </div>
      <div className="py-2">
        <div className="mb-3 row align-items-center">
          <div className="col">
            <Form.Check
              type="checkbox"
              className="form-check-lg"
              id={`select-all`}
              label={`Select All (${
                cartItems && cartItems.length > 0 ? cartItems.length : 0
              })`}
              onChange={handleSelectAll}
              checked={cartItems && cartItems.length === selectedItems.length}
            />
          </div>
          {selectedItems.length >= 1 && (
            <div className="text-right col" onClick={clearCart}>
              <button className="px-3 rounded-lg btn btn-sm btn-danger font-size-sm">
                <i className="fa fa-trash"></i> Delete
              </button>
            </div>
          )}
        </div>
        {/* END HEADER */}
        <div className="py-2">
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item: any, indx: any) => (
              <div className="mb-2 row" key={indx}>
                <div className="col-lg-6">
                  <div className="gap-2 d-flex">
                    <Form.Check
                      type="checkbox"
                      id={`select-cart-item-${indx}`}
                      label=""
                      checked={isSelectedItem(indx)}
                      onChange={() => handleSelectItem(indx)}
                    />
                    <div className="flex-1 mx-1 flex-grow-1">
                      <div className="media align-items-start">
                        <Link href={`/product/${item?.slug}`}>
                          <img
                            alt=""
                            style={{ height: "auto", width: "50px" }}
                            src={item?.variants?.thumbnail}
                            className="mr-1 rounded-lg"
                          />
                        </Link>
                        <div className="ml-2 text-left media-body">
                          <Link href={`/product/${item?.slug}`}>
                            <h5
                              className="pb-1 mb-0 text-dark"
                              style={{ lineHeight: 1 }}
                            >
                              {item?.name}
                            </h5>
                          </Link>
                          {item?.variants && (
                            <>
                              <h6>
                                {item?.variants?.option1 &&
                                  item?.variants?.value1 && (
                                    <span>{`${item?.variants?.option1} : ${item?.variants?.value1}`}</span>
                                  )}
                              </h6>
                              <h4>
                                {item?.variants?.option2 &&
                                  item?.variants?.value2 && (
                                    <span>{`${item?.variants?.option2} : ${item?.variants?.value2}`}</span>
                                  )}
                              </h4>
                              <h4>
                                {item?.variants?.option3 &&
                                  item?.variants?.value3 && (
                                    <span>{`${item?.variants?.option3} : ${item?.variants?.value3}`}</span>
                                  )}
                              </h4>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex justify-content-between">
                    <div className="qty-box cart_qty">
                      <div className="input-group">
                        <span className="input-group-prepend">
                          <button
                            type="button"
                            className="btn quantity-left-minus"
                            data-type="minus"
                            onClick={() =>
                              handleQtyUpdate(
                                item,
                                parseInt(
                                  item?.qty > 1 ? item?.qty - 1 : item?.qty
                                )
                              )
                            }
                            disabled={item?.qty === 1}
                            style={{
                              cursor:
                                item?.qty === 1 ? "not-allowed" : "pointer",
                            }}
                          >
                            <i className="fa fa-angle-left" />
                          </button>
                        </span>
                        <input
                          type="text"
                          name="quantity"
                          className="form-control input-number"
                          min={1}
                          value={item?.qty}
                          onChange={e =>
                            handleQtyUpdate(item, parseInt(e.target.value))
                          }
                        />
                        <span className="input-group-prepend">
                          <button
                            type="button"
                            className="btn quantity-right-plus"
                            data-type="plus"
                            onClick={() =>
                              handleQtyUpdate(item, parseInt(item?.qty + 1))
                            }
                          >
                            <i className="fa fa-angle-right" />
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* END */}
                    <div className="cart-price d-flex flex-column">
                      <h5 className="mb-0 mr-0 price text-info">
                        {symbol}{" "}
                        {formatPrice(
                          getDiscountPriceVariant(item, item?.variants)
                        )}
                      </h5>
                      {getDiscountAmountVariant(item, item?.variants) > 0 && (
                        <p className="mb-0 mr-0 price">
                          <del>
                            {symbol}{" "}
                            {formatPrice(
                              getNormalPriceVariant(item, item?.variants)
                            )}
                          </del>
                        </p>
                      )}
                      {getDiscountPercentVariant(item, item?.variants) > 0 && (
                        <p className="mb-0 mr-0 price">
                          -{getDiscountPercentVariant(item, item?.variants)}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* END */}
        </div>
        {/* END BODY */}
        <div className="pt-4 row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex align-items-center justify-content-between">
                <span>
                  Subtotal{" "}
                  {`(${selectedItems.length} Item${
                    selectedItems.length > 1 ? "s" : ""
                  })`}
                </span>
                <span>
                  {symbol} {formatPrice(selectedItemsSubtotal())}
                </span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center justify-content-between">
                <span>Shipping Fee</span>
                <span>
                  {symbol} {formatPrice(shippingFee)}
                </span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex flex-column ">
                <div className="d-flex align-items-center justify-content-between">
                  <span>Discount</span>
                  <span>
                    -{symbol} {formatPrice(selectedItemsDiscount())}
                  </span>
                </div>
                {/* {selectedItems && selectedItems.length > 0 && (
                  <div>
                    <CouponComp
                      handleCouponSubmit={handleCouponSubmit}
                      className="py-2"
                    />
                  </div>
                )} */}
              </ListGroup.Item>

              <ListGroup.Item className="d-flex align-items-center justify-content-between">
                <h4 className="font-weight-bold">Total</h4>
                <h4 className="font-weight-bold">
                  {symbol}
                  {formatPrice(
                    selectedItemsSubtotal() -
                      selectedItemsDiscount() +
                      shippingFee
                  )}
                </h4>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
