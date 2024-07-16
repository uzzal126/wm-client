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
  productClass?: string;
};

const ProductItem: FC<Props> = ({ product, productClass }) => {
  return (
    <div className={`product-box ${productClass}`}>
      <div className="img-wrapper">
        <Link href={getProductURL(product)}>
          <div className="front">
            <ImageHelper
              src={getThumbnail(product)}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="back">
            <ImageHelper
              src={getThumbnail(product)}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
        </Link>
      </div>
      <div className="product-detail">
        <RatingMake size={16} total={product?.rating?.avg} />
        <Link href={getProductURL(product)}>
          <h6>{product.name}</h6>
        </Link>
        <PriceParties product={product} />
        <div
          className="cart-bottom"
          style={{ background: "rgba(50, 50, 50, 0.9)" }}
        >
          <CardBtn product={product} />
          <WishlistBtn product={product} />
          <QuickViewBtn product={product} />
          <CompareBtn product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
