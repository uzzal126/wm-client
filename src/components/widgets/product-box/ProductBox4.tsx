import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { ImageHelper } from "../../../helpers/lazy-load-image/image-lazy-load";
import { getProductURL, getThumbnail } from "../../../helpers/misc";
import MasterProductDetail from "./MasterProductDetail";
import {
  CardBtn,
  CompareBtn,
  QuickViewBtn,
  WishlistBtn,
} from "./includes/btns";

type Props = {
  product: any;
  cartClass?: any;
};

const ProductBox4: FC<Props> = ({ product, cartClass }) => {
  // eslint-disable-next-line
  const router = useRouter();

  const clickProductDetail = () => {
    router.push(`/product/${product?.slug}`);
  };

  return (
    <>
      <div className="product-box product-wrap">
        <div className="img-wrapper">
          <div className="lable-block">
            {product.new === "true" ? <span className="lable3">new</span> : ""}
            {product.sale === "true" ? (
              <span className="lable4">on sale</span>
            ) : (
              ""
            )}
          </div>
          <Link href={getProductURL(product)} prefetch={false}>
            <div className="front" onClick={clickProductDetail}>
              <ImageHelper
                src={getThumbnail(product)}
                className="img-fluid"
                alt=""
              />
            </div>
          </Link>
          <div
            className="cart-info cart-wrap"
            style={{ background: "rgba(50, 50, 50, 0.9)" }}
          >
            <WishlistBtn product={product} />
            <QuickViewBtn product={product} />
            <CompareBtn product={product} />
          </div>

          <CardBtn product={product} style="counter" />
        </div>
        <MasterProductDetail
          product={product}
          productDetail=""
          detailClass="text-center"
        />
      </div>
    </>
  );
};

export default ProductBox4;
