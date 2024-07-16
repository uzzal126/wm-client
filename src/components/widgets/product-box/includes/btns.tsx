import { useCart } from "@/contexts/cart/CartContext";
import { WishlistContext } from "@/contexts/wishlist/WishlistContext";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAuth } from "../../../../helpers/auth/AuthHelper";
import { getDefaultVariantIndex } from "../../../../helpers/misc";
import { CardModal, CompareModal } from "./modal";

type Props = {
  product: any;
  style?:
    | "details"
    | "counter"
    | "solid"
    | "outline"
    | "text"
    | "icon"
    | "wishlist";
  className?: string;
  preOrder?: boolean;
};

export const CardBtn: FC<Props> = ({
  product,
  style,
  className,
  preOrder = false,
}) => {
  const { cartItems, addToCart, preOrderItems, addToPreOrder } = useCart();
  const varIndex: any = getDefaultVariantIndex(product);
  const [modal, setModal] = useState(false);
  const [cartItem, setCartItem] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    if (style === "counter" || style === "solid") {
      setCartItem(
        cartItems && cartItems.length > 0
          ? cartItems.filter((f: any) => f.id === product.id).length > 0 &&
              cartItems.filter((f: any) => f.id === product.id)[0]
          : {}
      );
    }
  }, [cartItems, style]);

  const handleCartAdd = () => {
    if (Array.isArray(product?.variants) && product?.variants?.length > 1) {
      setModal(true);
    } else {
      if (varIndex !== null) {
        addToCart({ ...product, variants: product.variants[varIndex] });
      } else {
        toast.error("Insufficient stock");
      }
    }
  };
  const handleCounterCartAdd = (prod: any, qty: any) => {
    if (prod && Object.keys(prod).length > 0) {
      if (prod?.variants?.in_stock > 0 && prod?.variants?.in_stock >= qty) {
        addToCart(prod, qty);
      } else {
        toast.error("Insufficient stock");
      }
    } else {
      toast.error("Try Again");
    }
  };

  const handlePreOrder = (product: any, qty: number) => {
    if (Array.isArray(product?.variants) && product?.variants?.length > 1) {
      setModal(true);
    } else {
      if (product?.variants) {
        addToPreOrder({ ...product, variants: product.variants }, qty);
        console.log("pre order prod");
        router.push("/checkout/pre-order");
      } else {
        toast.error("Error Occurred", {
          position: "top-right",
        });
      }
    }
  };

  // if (modal)
  //   return

  const renderButton = () => {
    if (product.cart_visibility === 1) {
      if (preOrder) {
        switch (style) {
          case "details":
            return (
              <button
                className={`${className || "btn btn-solid"} ${
                  Object.keys(product).length > 0 ? "" : "disabled"
                }`}
                disabled={Object.keys(product).length === 0}
                onClick={() => {
                  if (product?.variants && product?.variants?.in_stock === 0) {
                    handlePreOrder(product, product.qtyNew);
                  } else {
                    addToCart(product, product.qtyNew);
                  }
                }}
              >
                {product?.variants && product?.variants?.in_stock === 0
                  ? "Pre-order"
                  : "add to cart"}
              </button>
            );
        }
      }
      switch (style) {
        case "details":
          return (
            <button
              className={`${className || "btn btn-solid"} ${
                Object.keys(product).length > 0 ? "" : "disabled"
              }`}
              disabled={
                Object.keys(product).length === 0 ||
                (product &&
                  product?.variants &&
                  product?.variants?.in_stock === 0)
              }
              onClick={() => addToCart(product, product.qtyNew)}
            >
              add to cart
            </button>
          );
        case "outline":
          return (
            <div className="add-btn">
              <button onClick={handleCartAdd} className="btn btn-outline">
                <i className="fa fa-shopping-cart"></i> add to cart
              </button>
            </div>
          );
        case "icon":
          return (
            <div className="add-btn">
              <button onClick={handleCartAdd} className="btn btn-outline">
                <i className="fa fa-shopping-cart"></i>
              </button>
            </div>
          );
        case "wishlist":
          return (
            <>
              <Button
                onClick={handleCartAdd}
                className="px-2 py-1 m-1 border-0 rounded btn-primary wishlist-cart"
              >
                <i className=" fa fa-shopping-cart"></i>
              </Button>
            </>
          );
        case "counter":
        case "solid":
          return (
            <div className="addtocart_btn">
              <button
                className={`add-button ${className || ""} ${
                  style === "counter" ? "add_cart" : "border-0"
                } ${varIndex === null ? "disabled" : ""}`}
                disabled={varIndex === null}
                title={varIndex === null ? "Out of stock" : "Add to cart"}
                onClick={handleCartAdd}
              >
                {varIndex === null ? "Out of stock" : "Add to cart"}
              </button>
              <div
                className={`qty-box cart_qty ${
                  cartItem && Object.keys(cartItem).length > 0 ? "open" : ""
                }`}
              >
                <div className="input-group">
                  <span className="input-group-prepend">
                    <button
                      type="button"
                      className="btn quantity-left-minus"
                      onClick={() =>
                        handleCounterCartAdd(cartItem, cartItem.qty - 1)
                      }
                      data-type="minus"
                      data-field=""
                    >
                      -
                    </button>
                  </span>
                  <input
                    type="text"
                    name="quantity"
                    value={cartItem?.qty}
                    // onChange={() => addCart(product, Number(e.target.value), 0)}
                    className="form-control input-number"
                  />
                  <span className="input-group-prepend">
                    <button
                      type="button"
                      className="btn quantity-right-plus"
                      onClick={() =>
                        handleCounterCartAdd(cartItem, cartItem.qty + 1)
                      }
                      data-type="plus"
                      data-field=""
                    >
                      +
                    </button>
                  </span>
                </div>
              </div>
            </div>
          );
        case "text":
          return (
            <>
              <button
                title={varIndex === null ? "Insufficient stock" : "Add to cart"}
                onClick={handleCartAdd}
                style={{
                  opacity: varIndex === null ? 0.5 : 1,
                }}
              >
                <i className="fa fa-shopping-cart"></i>
                <span>Add to cart</span>
              </button>
            </>
          );

        default:
          return (
            <button
              title={varIndex === null ? "Insufficient stock" : "Add to cart"}
              onClick={handleCartAdd}
              style={{
                opacity: varIndex === null ? 0.5 : 1,
              }}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
          );
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      {renderButton()}
      <CardModal product={product} show={modal} setModal={setModal} />
    </>
  );
};

export const WishlistBtn: FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const contextWishlist = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(product?.wishlist || false);
  let storeData = useSelector(selectStoreData);
  const header = storeData?.data?.header;

  const wishlistHandler = () => {
    let user = getAuth();
    if (user && user?.id) {
      contextWishlist?.addToWish(product);
    } else {
      router.push("/auth/login");
    }
  };

  return header?.wishlist ? (
    <a
      title="Add to Wishlist"
      className={className}
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        e.preventDefault();
        wishlistHandler();
        setIsInWishlist(!isInWishlist);
      }}
    >
      <i
        className={`fa${isInWishlist ? "-solid" : "-regular"} fa-heart`}
        /* style={{
          color: isInWishlist ? "var(--theme-deafult)" : "",
          fontSize: 22,
        }} */
        aria-hidden="true"
      ></i>
    </a>
  ) : (
    <></>
  );
};

export const QuickViewBtn: FC<Props> = ({ product, className }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <a
        title="Quick View"
        className={className}
        style={{ cursor: "pointer" }}
        onClick={() => setModal(!modal)}
      >
        <i className="fa fa-search" aria-hidden="true"></i>
      </a>
      <CardModal product={product} show={modal} setModal={setModal} />
    </>
  );
};

export const CompareBtn: FC<Props> = ({ product }) => {
  const [modalCompare, setModalCompare] = useState(false);
  let storeData = useSelector(selectStoreData);
  const header = storeData?.data?.header;

  return (
    <>
      {header?.compare && (
        <>
          <a
            title="Compare"
            onClick={() => setModalCompare(!modalCompare)}
            style={{ cursor: "pointer", fontSize: 22 }}
          >
            <i className="fa fa-exchange" aria-hidden="true"></i>
          </a>
          <CompareModal
            product={product}
            setModal={setModalCompare}
            show={modalCompare}
          />
        </>
      )}
    </>
  );
};

export const BuyNowBtn: FC<Props> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    router.push("/checkout");
    addToCart(product, product?.qtyNew);
  };
  return product.cart_visibility === 1 ? (
    <button
      disabled={product?.variants?.in_stock <= 0 || product?.qtyNew <= 0}
      className={`btn btn-solid ${
        Object.keys(product).length <= 0 ||
        (product && product?.variants && product?.variants?.in_stock <= 0) ||
        product?.qtyNew < 0
          ? "disabled"
          : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        handleBuyNow();
      }}
    >
      buy now
    </button>
  ) : (
    <></>
  );
};
