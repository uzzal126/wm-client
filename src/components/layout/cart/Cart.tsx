import { useCart } from "@/contexts/cart/CartContext";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import Link from "next/link";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Media } from "reactstrap";
import { CurrencyContext } from "../../../contexts/Currency/CurrencyContext";
import { formatPrice } from "../../../helpers/misc";
import EmptyCart from "./empty-cart";

const iconLight = "/assets/images/icon/cart_white.svg";
const icon = "/assets/images/icon/dark/cart_dark.svg";

type Props = {
  layout?: any;
  dark?: any;
};

const CartDrowner: FC<Props> = ({ layout, dark }) => {
  const currContext: any = useContext(CurrencyContext);
  let storeData = useSelector(selectStoreData);
  const { data: headerData } = storeData;
  const symbol = currContext.state.symbol;

  const {
    cartItems: cartList,
    cartTotal: total,
    removeFromCart,
    addToCart,
  } = useCart();

  const [openSide, setOpenSide] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartItems(cartList);
    setCartTotal(cartList.length);
  }, [cartList, total]);

  const closeCart = () => {
    let cardId = document.getElementById("cart_side");
    if (cardId) {
      cardId.classList.remove("open-side");
    }
  };

  const openCart = () => {
    let cardId = document.getElementById("cart_side");
    if (cardId) {
      cardId.classList.add("open-side");
    }
  };

  const onQtyChange = (item: any, indicator: any, quantity: any = null) => {
    let qty = indicator === "plus" ? item.qty + 1 : item.qty - 1;
    if (quantity) qty = quantity;

    if (quantity !== 0) {
      addToCart(item, qty);
    }
  };

  return (
    <Fragment>
      {
        <li className="onhover-div mobile-cart" onClick={openCart}>
          <div className="cart-qty-cls">{cartTotal}</div>
          <div>
            <Media
              alt="cart"
              src={
                headerData?.header?.layout !==
                "left-logo-on-transparent-back-header"
                  ? icon
                  : iconLight
              }
              style={{ width: "24px", height: "24px" }}
              className="img-fluid blur-up lazyload"
            />
            <i className="fa fa-shopping-cart"></i>
          </div>
        </li>
      }

      <div
        id="cart_side"
        className={`add_to_cart ${layout} ${openSide ? "open-side" : ""} `}
      >
        <div className="overlay" onClick={closeCart}></div>
        <div className="cart-inner">
          <div className="cart_top">
            <h3>my cart </h3>
            <div
              className="close-cart"
              style={{ cursor: "pointer" }}
              onClick={closeCart}
            >
              <>
                <i className="fa fa-times" aria-hidden="true"></i>
              </>
            </div>
          </div>
          <div className="cart_media">
            <ul className="cart_product">
              {cartItems.length > 0 ? (
                cartItems.map((item: any, index) => (
                  <li key={`cart-popup-${index}`} className="pl-0">
                    <div className="d-flex">
                      <div className="qty-box versicle-qty">
                        <div className="input-group flex-column">
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              onClick={() =>
                                item.qty > 0 && onQtyChange(item, "plus")
                              }
                              disabled={item?.variants?.in_stock < item.qty}
                              className="border-0 btn quantity-left-minus"
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </span>
                          <input
                            type="number"
                            name="quantity"
                            className="p-1 border-0 form-control numberInput"
                            value={item.qty === 0 ? "" : item.qty}
                            onChange={(e: any) =>
                              parseInt(e.target.value) > 0
                                ? item &&
                                  item?.variants &&
                                  item?.variants?.in_stock >=
                                    parseInt(e.target.value) &&
                                  onQtyChange(
                                    item,
                                    "minus",
                                    parseInt(e.target.value)
                                  )
                                : onQtyChange(item, "minus", 0)
                            }
                            style={{
                              width: 36,
                            }}
                          />
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              onClick={() =>
                                item.qty > 0 && onQtyChange(item, "minus")
                              }
                              disabled={item?.variants?.in_stock < item.qty}
                              className="border-0 btn quantity-right-plus"
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                      {/* END QTY */}
                      <div className="flex-1 mx-1 flex-grow-1">
                        <div className="media align-items-start">
                          <Link
                            href={`/product/${item?.slug}`}
                            onClick={() => closeCart()}
                          >
                            <Media
                              alt=""
                              className="mr-1"
                              style={{
                                height: "auto",
                                width: 50,
                              }}
                              src={`${
                                item?.variants?.thumbnail || item.thumbnail?.src
                              }`}
                            />
                          </Link>
                          <div className="text-left media-body">
                            <Link href={`/product/${item?.slug}`}>
                              <h6
                                className="pb-1"
                                style={{
                                  lineHeight: 1,
                                }}
                              >
                                {item.title || item?.name}
                              </h6>
                            </Link>
                            {item?.variants && (
                              <>
                                {item?.variants.option1 &&
                                  item?.variants.value1 && (
                                    <p className="mb-0">
                                      <span>{`${item?.variants.option1} : ${item?.variants.value1}`}</span>
                                    </p>
                                  )}
                                {item?.variants.option2 &&
                                  item?.variants.value2 && (
                                    <p className="mb-0">
                                      <span>{`${item?.variants.option2} : ${item?.variants.value2}`}</span>
                                    </p>
                                  )}
                                {item?.variants.option3 &&
                                  item?.variants.value3 && (
                                    <p className="mb-0">
                                      <span>{`${item?.variants.option3} : ${item?.variants.value3}`}</span>
                                    </p>
                                  )}
                              </>
                            )}
                            <h6 className="font-weight-bold">
                              {item.qty} x {symbol}
                              {item?.variants
                                ? item?.variants.selling_price -
                                  (item?.discount?.amount || 0)
                                : item?.price?.min -
                                  (item?.discount?.amount || 0)}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <button
                          className="p-1 rounded btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item)}
                          style={{
                            width: 30,
                            height: 30,
                            lineHeight: 1,
                          }}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <EmptyCart onClickFunc={closeCart} />
              )}
            </ul>
            {cartItems?.length > 0 && (
              <>
                <ul className="cart_total">
                  <li>
                    <div className="total">
                      <h5>
                        subtotal :
                        <span>
                          {symbol} {formatPrice(total)}
                        </span>
                      </h5>
                    </div>
                  </li>
                </ul>
                <div
                  className="buttons d-flex align-items-center justify-content-between"
                  onClick={closeCart}
                >
                  <Link
                    href="/shop"
                    className="px-3 py-1 btn btn-outline view-cart"
                  >
                    Continue
                  </Link>
                  <Link
                    href="/checkout"
                    className="btn btn-solid btn-xs checkout"
                  >
                    checkout
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartDrowner;
