import { createContext } from "react";

export interface CartType {
    cartItems: any;
    couponDiscount: any;
    cartTotal: any;
    selectedItems: any;
    setSelectedItems: any;
    setQuantity: any;
    getQty: any;
    quantity: any;
    stock: any;
    clearCart: any;
    addToCart: any;
    removeFromCart: any;
    preOrderQty: any;
    preOrderItems: any;
    addToPreOrder: any;
    plusPreOrderQty: any;
    minusPreOrderQty: any;
    plusQty: any;
    minusQty: any;
    updateQty: any;
    setCouponDetails: any;
    couponDetails: any;
    selectedItemsSubtotal: any;
    selectedItemsDiscount: any;
    calcCartItemsWeight: any;
    shippingFee: any;
    handleCouponSubmit: any;
    setSelectedPreOrderItems: any;
    bulkUpdateCart: any;
    selectedPreOrderItems: any;
    selectedPreOrderItemsSubtotal: any;
    selectedPreOrderItemsDiscount: any;
    clearPreOrderItems: any;
    getPreOrderShippingFee: any;
    calcPreOrderItemsWeight: any;
    preOrderShippingFee: any;
    updatePreOrderQty: any;
    removeCoupon: any;
}

const CartContext = createContext<CartType | undefined>(undefined);

export default CartContext;
