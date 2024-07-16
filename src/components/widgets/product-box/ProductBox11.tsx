import Link from "next/link";
import { FC, Fragment } from "react";
import { Col } from "reactstrap";
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
};

const ProductSection: FC<Props> = ({ product }) => {
  return (
    <Fragment>
      {product !== undefined ? (
        <Col className="product-box">
          <div className="img-wrapper">
            <Link href={getProductURL(product)}>
              <div className="front">
                {product.picture !== undefined ? (
                  <div className={`market-bg${product.picture}`}></div>
                ) : (
                  <div className="front">
                    <Link href={`/product/${product?.slug}`}>
                      <ImageHelper
                        src={getThumbnail(product)}
                        className="img-fluid bg-img blur-up lazyload"
                        alt={product.name || ""}
                      />
                    </Link>
                  </div>
                )}
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
            <div className="addtocart_count">
              <CardBtn product={product} style="solid" />
            </div>
          </div>

          <MasterProductDetail product={product} />
        </Col>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ProductSection;
