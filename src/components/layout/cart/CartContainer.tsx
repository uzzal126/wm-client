import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { useCart } from "@/contexts/cart/CartContext";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { Media } from "reactstrap";
import CartHeader from "./cart-header";

const icon = "/assets/images/icon/dark/cart_dark.svg";
const iconLight = "/assets/images/icon/cart_white.svg";

const CartContainer = ({ dark }: any) => {
  const currContext: any = useContext(CurrencyContext);
  const symbol = currContext?.state?.symbol;

  const { cartTotal: total, cartItems: cartList } = useCart();
  return (
    <Fragment>
      <li className="onhover-div mobile-cart">
        <div className="cart-qty-cls">{cartList.length}</div>
        <Link href={`/cart`}>
          <>
            <Media
              src={!dark ? icon : iconLight}
              className="img-fluid"
              alt=""
              style={{ width: "24px", height: "24px" }}
            />
            <i className="fa fa-shopping-cart"></i>
          </>
        </Link>
        <ul className="show-div shopping-cart">
          {cartList.map((item: any, index: number) => (
            <CartHeader key={index} item={item} total={total} symbol={symbol} />
          ))}
          {cartList.length > 0 ? (
            <div>
              <li>
                <div className="total">
                  <h5>
                    subtotal :{" "}
                    <span>
                      {symbol}
                      {total?.toFixed(2)}
                    </span>
                  </h5>
                </div>
              </li>
              <li>
                <div className="buttons view-cart">
                  <Link href={`/cart`}>view cart</Link>
                  <Link href={`/checkout`} className="checkout">
                    checkout
                  </Link>
                </div>
              </li>
            </div>
          ) : (
            <li>
              <h5>Your cart is currently empty.</h5>
            </li>
          )}
        </ul>
      </li>
    </Fragment>
  );
};

export default CartContainer;
