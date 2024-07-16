import Link from "next/link";
import { FC, Fragment } from "react";
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
  productClass?: any;
  styles?: any;
};

const ProductSection: FC<Props> = ({ product, productClass, styles = {} }) => {

  return (
    <Fragment>
      {product !== undefined ? (
        <div className={`product-box ${productClass}`} style={{ ...styles }}>
          <div className="img-wrapper">
            <div className="front">
              <Link href={getProductURL(product)}>
                <>
                  {product.picture !== undefined ? (
                    <div className={`market-bg${product.picture}`}></div>
                  ) : (
                    <div className="front">
                      <ImageHelper
                        src={getThumbnail(product)}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  )}
                </>
              </Link>
            </div>
            <div
              className="cart-info cart-wrap"
              style={{ background: "rgba(50, 50, 50, 0.9)" }}
            >
              <WishlistBtn product={product} />
              <QuickViewBtn product={product} />
              <CompareBtn product={product} />
            </div>
            <div className="addtocart_count">
              <CardBtn product={product} style="solid" />
            </div>
          </div>

          <MasterProductDetail product={product} />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ProductSection;
