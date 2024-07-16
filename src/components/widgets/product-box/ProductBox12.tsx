import Link from "next/link";
import { FC } from "react";
import { ImageHelper } from "../../../helpers/lazy-load-image/image-lazy-load";
import { getProductURL, getThumbnail } from "../../../helpers/misc";
import {
  CardBtn,
  CompareBtn,
  QuickViewBtn,
  WishlistBtn,
} from "./includes/btns";
import { PriceParties, RatingMake } from "./includes/parties";

type Props = {
  product: any;
  spanClass?: any;
  productDetail?: string;
  productClass?: string;
  styles?: any;
};

const ProductItem: FC<Props> = ({
  product,
  spanClass,
  styles = {},
  productClass,
  productDetail,
}) => {
  return (
    <div
      className={`product-box product-wrap ${productClass || ""}`}
      style={{ ...styles }}
    >
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new === "true" ? <span className="lable3">new</span> : ""}
          {product.sale === "true" ? (
            <span className="lable4">on sale</span>
          ) : (
            ""
          )}
        </div>
        <Link href={getProductURL(product)}>
          <div className="front">
            <ImageHelper
              alt={product?.thumbnail?.alt}
              src={getThumbnail(product)}
              className="img-fluid blur-up lazyload bg-img"
            />
          </div>
        </Link>
        <div
          className="cart-info cart-wrap"
          style={{ background: "rgba(50, 50, 50, 0.9)" }}
        >
          <WishlistBtn product={product} />
          {spanClass ? (
            <CardBtn product={product} style="text" />
          ) : (
            <CardBtn product={product} />
          )}
          <CompareBtn product={product} />
        </div>
        <div className="quick-view-part">
          <QuickViewBtn className="mobile-quick-view" product={product} />
        </div>
      </div>
      <div className={`product-info ${productDetail || ""}`}>
        <div className="my-2 d-flex flex-column align-items-center">
          <RatingMake total={product?.rating?.avg} />
        </div>
        <Link href={getProductURL(product)} prefetch={false}>
          <h6>{product.name}</h6>
        </Link>
        <PriceParties product={product} />
      </div>
    </div>
  );
};

export default ProductItem;
