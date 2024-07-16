import { FC, useContext } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
// import StarRatings from 'react-star-ratings';
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import {
  formatPrice,
  getDiscountAmountVariant,
  getDiscountPriceVariant,
  getNormalPriceVariant,
  getPriceStringWithDiscount,
  getPriceStringWithoutDiscount,
} from "@/helpers/misc";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSelector } from "react-redux";

type Props = {
  product: any;
  selected?: any;
  styles?: string;
};

export const PriceParties: FC<Props> = ({ product, selected, styles = "" }) => {
  const curContext: any = useContext(CurrencyContext);
  const symbol = curContext?.state?.symbol;
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data?.general_settings;

  if (product?.price_visibility !== 1) return <></>;

  return (
    <>
      {selected ? (
        getDiscountAmountVariant(product, selected?.variants) > 0 ? (
          <h4 className={`${styles}`}>
            <div className="mb-1">
              <del className="text-danger">
                {symbol?.length > 1 ? `${symbol}` : `${symbol}`}
                {formatPrice(
                  getNormalPriceVariant(product, selected?.variants)
                )}
              </del>
              <span className="text-dark" style={{ fontSize: 12 }}>
                ({symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
                {getDiscountAmountVariant(product, selected?.variants).toFixed(
                  2
                )}{" "}
                off)
              </span>
            </div>
            {symbol?.length > 1 ? `${symbol}` : `${symbol}`}
            {formatPrice(getDiscountPriceVariant(product, selected?.variants))}
            <small
              style={{ fontSize: 14, color: "rgba(160, 160, 160)" }}
              className="mx-2"
            >
              {data?.product_page?.vat_text
                ? `+ ${data?.product_page?.vat_text}`
                : ""}
            </small>
          </h4>
        ) : (
          <h4 className={`${styles}`}>
            {symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
            {formatPrice(getDiscountPriceVariant(product, selected?.variants))}
            <small
              style={{ fontSize: 14, color: "rgba(160, 160, 160)" }}
              className="mx-2"
            >
              {data?.product_page?.vat_text
                ? `+ ${data?.product_page?.vat_text}`
                : ""}
            </small>
          </h4>
        )
      ) : (product?.discount &&
          product?.discount?.length > 0 &&
          product?.discount[0]?.amount > 0) ||
        product?.discount[0]?.percent > 0 ||
        product?.discount?.percent > 0 ||
        product?.discount?.amount > 0 ? (
        <h4 className={`${styles}`}>
          <div className="mb-1">
            <del className="text-danger">
              {symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
              {getPriceStringWithoutDiscount(product)}
            </del>
            {product?.discount[0]?.amount > 0 ||
            product?.discount?.amount > 0 ? (
              <span style={{ fontSize: 12 }}>
                ({symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
                {product?.discount[0]?.amount || product?.discount?.amount} off)
              </span>
            ) : (
              <></>
            )}
            {product?.discount[0]?.percent > 0 ||
            product?.discount?.percent > 0 ? (
              <span style={{ fontSize: 12 }}>
                {`(${
                  product?.discount[0]?.percent || product?.discount?.percent
                }% off)`}
              </span>
            ) : (
              <></>
            )}
          </div>
          {symbol?.length > 1 ? `${symbol} ` : `${symbol}`}{" "}
          {getPriceStringWithDiscount(product)}
          <small
            style={{ fontSize: 14, color: "rgba(160, 160, 160)" }}
            className="mx-2"
          >
            {data?.product_page?.vat_text
              ? `+ ${data?.product_page?.vat_text}`
              : ""}
          </small>
        </h4>
      ) : (
        // <h4 className={`${styles}`}>
        //   {symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
        //   {getPriceStringWithoutDiscount(product)}
        //   <small
        //     style={{ fontSize: 14, color: "rgba(160, 160, 160)" }}
        //     className="mx-2"
        //   >
        //     {data?.product_page?.vat_text
        //       ? `+ ${data?.product_page?.vat_text}`
        //       : ""}
        //   </small>
        // </h4>
        <h4 className={`${styles}`}>
          {product.variants.length === 1 &&
          product.variants[0].price.general_discount_amount > 0 &&
          product.discount.type === "Fixed" ? (
            <div className="mb-1">
              <del className="text-danger">
                {symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
                {getPriceStringWithoutDiscount(product)}
              </del>

              <span className="text-dark" style={{ fontSize: 12 }}>
                ({symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
                {product.variants[0].price.general_discount_amount} off)
              </span>
            </div>
          ) : (
            ""
          )}
          {symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
          {formatPrice(getDiscountPriceVariant(product, product?.variants[0]))}
          <small
            style={{ fontSize: 14, color: "rgba(160, 160, 160)" }}
            className="mx-2"
          >
            {data?.product_page?.vat_text
              ? `+ ${data?.product_page?.vat_text}`
              : ""}
          </small>
        </h4>
      )}
    </>
  );
};

type Rating = {
  total: number;
  size?: number;
};

export const RatingMake: FC<Rating> = ({ total, size = 18 }) => {
  const rattingConfig = {
    size: size,
    value: total,
    edit: false,
    isHalf: true,
    a11y: true,
    color: "#999",
    activeColor: "var(--theme-deafult)",
    emptyIcon: <i className="fa-regular fa-star" />,
    halfIcon: <i className="fa-solid fa-star-half-stroke" />,
    filledIcon: <i className="fa-solid fa-star" />,
  };
  return (
    <div className="ratings">
      <ReactStars {...rattingConfig} />
    </div>
  );
};
