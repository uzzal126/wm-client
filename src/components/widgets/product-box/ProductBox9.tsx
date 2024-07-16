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
import { PriceParties } from "./includes/parties";

type Props = {
  product: any;
  overlay?: boolean;
};

const ProductBox: FC<Props> = ({ product, overlay = true }) => {
  return (
    <div className="product-box">
      <div className="img-wrapper">
        <Link href={getProductURL(product)}>
          <div className="front">
            <ImageHelper
              src={getThumbnail(product)}
              className="img-fluid"
              alt=""
            />
          </div>
        </Link>
        <div
          className="cart-info cart-wrap"
          style={{
            background: overlay ? "rgba(50, 50, 50, 0.9)" : "transparent",
          }}
        >
          <CardBtn product={product} />
          <WishlistBtn product={product} />
          <QuickViewBtn product={product} />
          <CompareBtn product={product} />
        </div>
      </div>
      <div className="product-detail">
        <Link href={getProductURL(product)}>
          <h6>{product.name}</h6>
        </Link>
        <PriceParties product={product} />
      </div>
    </div>
  );
};
export default ProductBox;
