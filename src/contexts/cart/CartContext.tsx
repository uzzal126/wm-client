import { getAuth } from "@/helpers/auth/AuthHelper";
import {
  getDiscountAmountVariant,
  getDiscountPriceVariant
} from "@/helpers/misc";
import {
  COUPON_APPLY,
  GET_SHIPPING_FEE,
  UPDATE_CART,
} from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLocal, removeLocal, setLocal } from "../../helpers/storage";
import { useAddress } from "../address/AddressProvider";
import { useCheckout } from "../checkout/CheckoutContext";
import Context from "./index";

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem("cartList");
    if (list === null) {
      return [];
    } else {
      return JSON.parse(list);
    }
  } catch (err) {
    return [];
  }
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { shippingInfo, setShippingInfo } = useCheckout();
  const { addresses, selected } = useAddress();

  const [cartItems, setCartItems] = useState(getLocalCartItems() || []);
  const [preOrderItems, setPreOrderItems] = useState<any>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [preOrderQty, setPreOrderQty] = useState(1);
  const [couponDetails, setCouponDetails] = useState(getLocal("coupon") || {});
  // console.log(
  //     "🚀 ~ file: CartContext.tsx:45 ~ CartProvider ~ couponDetails:",
  //     cartItems,
  //     couponDetails
  // );
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [selectedPreOrderItems, setSelectedPreOrderItems] = useState([]);
  const [stock, setStock] = useState("InStock");
  const [shippingFee, setShippingFee] = useState(0);
  const [preOrderShippingFee, setPreOrderShippingFee] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const user = getAuth();

  const removeCoupon = () => {
    removeLocal("coupon");
    setCouponDetails({});
    setCouponDiscount(0);
  };

  const isEligibleForCouponApply = (item: any) => {
    const couponCatIds =
      typeof couponDetails?.catids === "string" ? couponDetails?.catids : "";
    const couponBrandIds =
      typeof couponDetails?.brandids === "string"
        ? couponDetails?.brandids
        : "";
    const couponProductIds =
      typeof couponDetails?.productids === "string"
        ? couponDetails?.productids
        : "";

    const eligibleCategories =
      couponCatIds?.length > 0 ? couponCatIds?.split(",") : [];
    const eligibleBrands =
      couponCatIds?.length > 0 ? couponBrandIds?.split(",") : [];
    const eligibleProducts =
      couponProductIds?.length > 0 ? couponProductIds?.split(",") : [];

    const belongsToEligibleCategories = Array.isArray(item?.categories)
      ? item?.categories?.some((category: any) =>
          eligibleCategories?.includes(category?.id?.toString())
        )
      : false;
    const belongsToEligibleBrands = eligibleBrands.includes(item?.brand_id);
    const belongsToEligibleProducts = eligibleProducts.includes(
      item?.id?.toString()
    );

    return couponDetails?.application_type === "flat"
      ? true
      : belongsToEligibleCategories ||
          belongsToEligibleBrands ||
          belongsToEligibleProducts;
  };

  useEffect(() => {
    const Total = cartItems.reduce(
      (a: any, b: any) => a + getDiscountPriceVariant(b, b.variants) * b.qty,
      0
    );
    setCartTotal(Total);

    setLocal("cartList", cartItems);
    // localStorage.setItem("cartList", JSON.stringify(cartItems));
  }, [cartItems, preOrderItems]);

  useEffect(() => {
    getShippingFee();
  }, [
    selected,
    cartItems,
    addresses,
    selectedItems,
    selectedPreOrderItems,
    preOrderItems,
  ]);

  // update coupon discount amount as the coupon and selectedItems changes
  useEffect(() => {
    const selectedItemsTotalPrice = cartItems.reduce(
      (acc: any, cur: any, indx: any) => {
        return selectedItems.includes(indx)
          ? acc + getDiscountPriceVariant(cur, cur.variants) * cur.qty
          : acc;
      },
      0
    );

    if (selectedItemsTotalPrice >= couponDetails?.min_order_value) {
      const couponApplicableItemsPrice = cartItems.reduce(
        (acc: any, cur: any, indx: any) => {
          return selectedItems.includes(indx) && isEligibleForCouponApply(cur)
            ? acc + getDiscountPriceVariant(cur, cur.variants) * cur.qty
            : acc;
        },
        0
      );

      const couponDiscountAmount =
        couponDetails?.discount_type === "Percentage"
          ? (couponApplicableItemsPrice * couponDetails?.amount) / 100
          : Math.min(couponDetails?.amount, couponApplicableItemsPrice);

      setCouponDiscount(
        Math.floor(Math.min(
          couponDiscountAmount,
          couponDetails?.max_discount_limit || 99999
        ))
      );
    } else {
      setCouponDiscount(0);
    }
  }, [couponDetails, selectedItems, cartItems]);

  const selectedItemsSubtotal = () => {
    const subTotal = cartItems.reduce((a: any, b: any, i: any) => {
      if (selectedItems.includes(i as never)) {
        return a + getDiscountPriceVariant(b, b?.variants) * b?.qty;
      }
      return a;
    }, 0);

    return subTotal;
  };

  const selectedPreOrderItemsSubtotal = () => {
    const subTotal = preOrderItems.reduce((a: any, b: any, i: any) => {
      if (selectedPreOrderItems.includes(i as never)) {
        return a + getDiscountPriceVariant(b, b?.variants) * b?.qty;
      }
      return a;
    }, 0);

    return subTotal;
  };

  const selectedItemsDiscount = () => {
    const discount = cartItems.reduce((a: any, b: any, i: any) => {
      if (selectedItems.includes(i as never)) {
        return a + getDiscountAmountVariant(b, b?.variants) * b?.qty;
      }
      return a;
    }, 0);

    return discount;
  };

  const selectedPreOrderItemsDiscount = () => {
    const discount = preOrderItems.reduce((a: any, b: any, i: any) => {
      if (selectedPreOrderItems.includes(i as never)) {
        return a + getDiscountAmountVariant(b, b?.variants) * b?.qty;
      }
      return a;
    }, 0);

    return discount;
  };

  // Add Product To Cart
  const handleCartAdd = async (pd: any, qty: any) => {
    if (pd?.variants) {
      if (
        typeof pd?.variants !== "object" ||
        (typeof pd?.variants === "object" &&
          Object.keys(pd?.variants).length === 0)
      ) {
        toast.error("Please select a variant");
        return false;
      }
    }

    if (pd?.variants?.in_stock < qty) {
      toast.error("Insufficient product stock!");
      return false;
    }

    if (user) {
      const cart_details = [
        {
          product_id: pd?.id,
          attribute_id: pd?.variants?.id,
          qty,
        },
      ];
      const res = await queryRequest(UPDATE_CART, {
        customer_id: user && user?.id,
        cart_details,
      });

      if (res?.success) {
        return true;
      } else {
        toast.error("Could not add to cart!");
        return false;
      }
    } else {
      return true;
    }
  };
  const addToPreOrder = (item: any, quantity: any) => {
    if (item?.variants) {
      if (
        typeof item?.variants !== "object" ||
        (typeof item?.variants === "object" &&
          Object.keys(item?.variants).length === 0)
      ) {
        toast.error("Please select a variant");
        return false;
      }
    } else {
      console.log("pre order func");
      const index = preOrderItems.findIndex(
        (itm: any) =>
          itm.id === item?.id && itm.variants?.id === item?.variants?.id
      );

      let price = item?.variants?.price?.selling_price;
      let discount =
        item?.variants?.price?.general_discount_amount +
        item?.variants?.price?.campaign_discount_amount;

      if (index !== -1) {
        let tl = 0;
        let qty = "1";
        if (quantity) {
          qty = quantity;
        } else {
          qty = preOrderItems[index].qty + 1;
        }
        tl = (price - discount) * parseInt(qty);
        preOrderItems[index] = {
          ...item,
          qty,
          total: tl,
        };
        setPreOrderItems([...preOrderItems]);
        // toast.info("Pre-order Updated Successfully !");
      } else {
        let tl = (price - discount) * parseInt(quantity || 1);
        const product = {
          ...item,
          qty: quantity || 1,
          total: tl,
        };
        setPreOrderItems([...preOrderItems, product]);
        // toast.success("Product Added Successfully !");
      }
    }
  };
  const addToCart = async (item: any, quantity: any) => {
    const goodToGo = await handleCartAdd(item, quantity);
    if (!goodToGo) {
      return;
    }

    if (quantity === 0) {
      removeFromCart(item);
    } else {
      const index = cartItems.findIndex(
        (itm: any) =>
          itm.id === item?.id && itm.variants?.id === item?.variants?.id
      );

      let price = item?.variants?.price?.selling_price;
      let discount =
        item?.variants?.price?.general_discount_amount +
        item?.variants?.price?.campaign_discount_amount;

      if (index !== -1) {
        let tl = 0;
        let qty = "1";
        if (quantity) {
          qty = quantity;
        } else {
          qty = cartItems[index].qty + 1;
        }
        tl = (price - discount) * parseInt(qty);
        cartItems[index] = {
          ...item,
          qty,
          total: tl,
        };
        setCartItems([...cartItems]);
        toast.info("Cart Updated Successfully !");
      } else {
        let tl = (price - discount) * parseInt(quantity || 1);
        const product = {
          ...item,
          qty: quantity || 1,
          total: tl,
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Added Successfully !");
      }
    }
  };
  // Remove From Cart
  const handleCartRemove = async (item: any) => {
    if (!user?.id) {
      return true;
    } else {
      const cart_details = [
        {
          product_id: item?.id,
          attribute_id: item?.variants?.id,
          qty: 0,
        },
      ];
      const res = await queryRequest(UPDATE_CART, {
        customer_id: user && user?.id,
        cart_details,
      });
      if (res?.success) {
        return true;
      } else {
        toast.error("Could not Remove from cart!");
        return false;
      }
    }
  };

  const removeFromCart = async (item: any) => {
    const goodToGo = await handleCartRemove(item);
    if (!goodToGo) {
      return;
    }
    toast.error("Product Removed Successfully !");
    let items = cartItems.filter(
      (e: any) => e.variants?.id !== item?.variants?.id
    );
    setCartItems(items);
  };

  const minusQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setStock("InStock");
    }
  };

  const minusPreOrderQty = () => {
    if (preOrderQty > 1) {
      setPreOrderQty(quantity - 1);
    }
  };

  const plusQty = (item: any) => {
    if (item?.stock >= quantity) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  const plusPreOrderQty = () => {
    if (preOrderQty > 1) {
      setPreOrderQty(quantity + 1);
    }
  };

  // Get Product Quantity
  const getQty = (item: any) => {
    const index = cartItems.filter(
      (itm: any) =>
        itm.id === item?.id && itm.variants?.id === item?.variants?.id
    );
    if (index && index.length > 0) {
      return index[0].qty;
    } else {
      return 1;
    }
  };

  // Update Product Quantity
  const updateQty = (item: any, quantity: any) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm: any) => itm.id === item?.id);
      if (index !== -1) {
        cartItems[index] = {
          ...item,
          qty: quantity,
          total: item?.price * quantity,
        };
        setCartItems([...cartItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const product = {
          ...item,
          qty: quantity,
          total:
            (item?.price - (item?.price * item?.discount) / 100) * quantity,
        };
        setCartItems([...cartItems, product]);
        toast.success("Product Quantity Updated !");
      }
    } else {
      toast.error("Invalid Quantity !");
    }
  };

  const updatePreOrderQty = (item: any, quantity: any) => {
    if (quantity >= 1) {
      const index = preOrderItems.findIndex((itm: any) => itm.id === item?.id);
      if (index !== -1) {
        preOrderItems[index] = {
          ...item,
          qty: quantity,
          total: item?.price * quantity,
        };
        setPreOrderItems([...preOrderItems]);
        toast.info("Product Quantity Updated !");
      } else {
        const product = {
          ...item,
          qty: quantity,
          total:
            (item?.price - (item?.price * item?.discount) / 100) * quantity,
        };
        setPreOrderItems([...preOrderItems, product]);
        toast.success("Product Quantity Updated !");
      }
    } else {
      toast.error("Invalid Quantity !");
    }
  };

  const calcCartItemsWeight = () => {
    let weight = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i] && cartItems[i]?.variants;
      weight += selectedItems.includes(i as never)
        ? item?.shipping_attribute?.weight
        : 0;
    }

    return weight;
  };

  const calcPreOrderItemsWeight = () => {
    let weight = 0;
    for (let i = 0; i < preOrderItems.length; i++) {
      const item = preOrderItems[i] && preOrderItems[i]?.variants;
      weight += selectedPreOrderItems.includes(i as never)
        ? item?.shipping_attribute?.weight
        : 0;
    }

    return weight;
  };

  const getPreOrderShippingFee = async () => {
    const data = {
      COD: 1,
      item_type: 2,
      delivery_type: 48,
      item_weight: calcPreOrderItemsWeight(),
      recipient_city: Array.isArray(addresses)
        ? addresses[selected]?.city_id
        : 0,
      recipient_zone: Array.isArray(addresses)
        ? addresses[selected]?.zone_id
        : 0,
      recipient_area: Array.isArray(addresses)
        ? addresses[selected]?.area_id
        : 0,
    };
    if (data?.item_weight !== 0 && data?.recipient_area) {
      const res = await queryRequest(GET_SHIPPING_FEE, data);
      if (res?.success && res?.data) {
        setShippingInfo({
          ...shippingInfo,
          fee: Math.ceil(Number(res?.data?.price)) || 0,
        });
        setPreOrderShippingFee(Math.ceil(Number(res?.data?.price)) || 0);
      } else {
        setShippingInfo({
          ...shippingInfo,
          fee: 0,
        });
        setPreOrderShippingFee(0);
      }
    }
  };

  const getShippingFee = async () => {
    const data = {
      COD: 1,
      item_type: 2,
      delivery_type: 48,
      item_weight: calcCartItemsWeight(),
      recipient_city: Array.isArray(addresses)
        ? addresses[selected]?.city_id
        : 0,
      recipient_zone: Array.isArray(addresses)
        ? addresses[selected]?.zone_id
        : 0,
      recipient_area: Array.isArray(addresses)
        ? addresses[selected]?.area_id
        : 0,
    };
    if (data?.item_weight !== 0 && data?.recipient_area) {
      const res = await queryRequest(GET_SHIPPING_FEE, data);
      if (res?.success && res?.data) {
        setShippingInfo({
          ...shippingInfo,
          fee: Math.ceil(Number(res?.data?.price)) || 0,
        });
        setShippingFee(Math.ceil(Number(res?.data?.price)) || 0);
      } else {
        setShippingInfo({
          ...shippingInfo,
          fee: 0,
        });
        setShippingFee(0);
      }
    }
  };

  const bulkUpdateCart = (items: any) => {
    if (cartItems.length > 0) setCartItems([...items]);
    else setCartItems([...items]);
  };

  const handleCouponSubmit = async (coupon: string) => {
    let auth = getAuth();
    // ABD14
    const res = await queryRequest(COUPON_APPLY, {
      coupon_code: coupon,
      customer_id: auth && auth?.user_id,
    });
    if (res?.success && res?.status_code === 200) {
      const _coupon = { ...res?.data, code: coupon };
      setCouponDetails(_coupon);
      toast.success("Successfully applied coupon!");
      setLocal("coupon", _coupon);
    } else {
      setCouponDetails({});
      toast.error(res?.message || "Error Occurred");
    }
  };

  const clearCart = () => {
    const list = [];
    for (let i = 0; i < cartItems.length; i++) {
      if (!selectedItems.includes(i as never)) {
        list.push(cartItems[i]);
      }
    }
    setCartItems(list);
  };

  const clearPreOrderItems = () => {
    const list = [];
    for (let i = 0; i < preOrderItems.length; i++) {
      if (!selectedPreOrderItems.includes(i as never)) {
        list.push(preOrderItems[i]);
      }
    }
    setPreOrderItems(list);
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        couponDetails,
        couponDiscount,
        cartTotal,
        selectedItems,
        setSelectedItems,
        setSelectedPreOrderItems,
        setQuantity,
        getQty,
        quantity,
        stock,
        clearCart,
        addToCart,
        removeFromCart,
        preOrderItems,
        preOrderQty,
        addToPreOrder,
        minusPreOrderQty,
        plusPreOrderQty,
        plusQty,
        minusQty,
        updateQty,
        selectedPreOrderItems,
        selectedPreOrderItemsDiscount,
        clearPreOrderItems,
        selectedPreOrderItemsSubtotal,
        selectedItemsSubtotal,
        selectedItemsDiscount,
        calcPreOrderItemsWeight,
        getPreOrderShippingFee,
        preOrderShippingFee,
        updatePreOrderQty,
        setCouponDetails,
        calcCartItemsWeight,
        shippingFee,
        handleCouponSubmit,
        bulkUpdateCart,
        removeCoupon,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCart = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCart must be used within an Cart Provider");
  }
  return context;
};

export default CartProvider;
