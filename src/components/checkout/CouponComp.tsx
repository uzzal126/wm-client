import { useCart } from "@/contexts/cart/CartContext";
import { useState } from "react";

type PropTypes = {
    handleCouponSubmit: any;
    className?: string | undefined;
};

function CouponComp({ handleCouponSubmit, className }: PropTypes) {
    const { couponDetails, removeCoupon, couponDiscount } = useCart();
    const [coupon, setCoupon] = useState("");

    const isDisabledSubmission = () => coupon?.length === 0;

    const handleCouponRemove = () => {
        setCoupon("");
        removeCoupon();
    };

    const handleKeyPress = (e: any) => {
        if (e?.key === "Enter") {
            handleCouponSubmit(coupon);
        }
    };

    const handleConfirmClick = () => {
        if (!isDisabledSubmission()) {
            handleCouponSubmit(coupon);
        }
    };

    return (
        <div className={className}>
            {typeof couponDetails === "object" &&
            Object.keys(couponDetails).length > 0 ? (
                <div>
                    <div className='d-flex align-items-center'>
                        <i className='fas fa-check-circle'></i>
                        <span className='ml-2 text-info'>
                            {`Coupon(${couponDetails?.code}) is applied.`}
                        </span>
                        <span
                            className='ml-2 text-danger'
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={handleCouponRemove}
                        >
                            Remove?
                        </span>
                    </div>
                    <div>
                        <span style={{ fontWeight: 500, fontSize: "0.75rem" }}>
                            Coupon Discount :
                        </span>
                        <span>{couponDiscount}</span>
                    </div>
                </div>
            ) : (
                <div
                    className='voucher-code-wrapper'
                    style={{
                        boxSizing: "border-box",
                        position: "relative",
                    }}
                >
                    <span
                        style={{
                            borderColor: "#e5e5e5",
                            borderRadius: "4px",
                            border: "1px solid #e5e5e5",
                            width: "100%",
                            marginBottom: "4px",

                            display: "inline-table",
                            borderCollapse: "separate",
                            overflow: "visible",
                            borderSpacing: 0,
                            backgroundColor: "#fff",
                            transition: "all .3s ease-out",
                        }}
                    >
                        <input
                            type='text'
                            placeholder='Enter Coupon Code'
                            defaultValue=''
                            maxLength={20}
                            height='100%'
                            style={{
                                color: "#212121",
                                width: "74%",
                                height: "38px",
                                margin: 0,
                                padding: "0 8px",
                                fontSize: "14px",
                                borderRadius: 0,
                                border: "none",
                                outline: "none",
                                fontWeight: "400",
                                verticalAlign: "baseline",
                                backgroundColor: "transparent",
                            }}
                            onChange={(e) => setCoupon(e.target.value)}
                            value={coupon}
                            onKeyDown={handleKeyPress}
                        />
                    </span>
                    <span
                        className='voucher-code-confirm'
                        style={{
                            color: "#165fcf",
                            position: "absolute",
                            right: 0,
                            top: 0,

                            width: "74px",
                            height: "16px",
                            display: "inline-block",
                            lineHeight: "16px",

                            borderLeft: ".5px solid #e5e5e5",
                            textAlign: "center",
                            margin: "12px 0",

                            cursor: isDisabledSubmission()
                                ? "not-allowed"
                                : "pointer",
                            opacity: isDisabledSubmission() ? 0.5 : 1,
                        }}
                        aria-disabled={isDisabledSubmission()}
                        onClick={handleConfirmClick}
                    >
                        Confirm
                    </span>
                </div>
            )}
        </div>
    );
}

export default CouponComp;
