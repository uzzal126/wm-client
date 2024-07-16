import Link from "next/link";
import { FC, useState } from "react";
import { ImageHelper } from "../../../helpers/lazy-load-image/image-lazy-load";
import {
  getDefaultVariantIndex,
  getProductURL,
  getThumbnail,
} from "../../../helpers/misc";
import {
  CardBtn,
  CompareBtn,
  QuickViewBtn,
  WishlistBtn,
} from "./includes/btns";
import MasterProductDetail from "./MasterProductDetail";

type Props = {
  product: any;
  cartClass?: any;
  productDetail?: any;
  productClass?: any;
  styles?: any;
};

const ProductItem: FC<Props> = ({
  product,
  cartClass,
  productDetail,
  productClass,
  styles = {},
}) => {
  const varIndex: any = getDefaultVariantIndex(product);
  const [variationIndx, setVarIndx] = useState(varIndex >= 0 ? varIndex : null);
  const [image, setImage] = useState("");

  const onClickHandle = (indx: any) => {
    setImage(product?.variants[indx]?.thumbnail);
    setVarIndx(indx);
  };

  return (
    <div
      className={`product-box product-wrap ${productClass}`}
      style={{ ...styles }}
    >
      <div className="img-wrapper">
        <div className="lable-block">
          {product.new_arriaval !== 0 ? (
            <span className="lable3 z-1">new</span>
          ) : (
            ""
          )}
          {product.on_sale ? (
            <span
              className="bottom-0 lable3 z-1 end-0"
              style={{ left: "auto", top: "auto", fontSize: 10 }}
            >
              on sale
            </span>
          ) : (
            ""
          )}
        </div>

        <Link href={getProductURL(product)} prefetch={false}>
          <>
            <div className="front">
              <ImageHelper
                src={getThumbnail(product) || image}
                className="img-fluid"
                alt=""
              />
            </div>

            {product?.gallery && product?.gallery.length > 0 && (
              <div className="back">
                <ImageHelper
                  src={`${image ? image : product?.gallery[0].src}`}
                  className="m-auto img-fluid"
                  alt={product?.name}
                />
              </div>
            )}
          </>
        </Link>

        <div
          className={cartClass}
          style={{ background: "rgba(30, 30, 30, 0.9)", padding: 10 }}
        >
          <CardBtn product={product} />
          <WishlistBtn product={product} />
          <QuickViewBtn product={product} />
          <CompareBtn product={product} />
        </div>
        {product?.variants && product?.variants?.length > 1 ? (
          <ul className="product-thumb-list">
            {product?.variants?.map((item: any, i: number) => (
              <li
                className={`grid_thumb_img ${
                  i === variationIndx ? "active" : ""
                }`}
                key={i}
              >
                <a onClick={() => onClickHandle(i)}>
                  <ImageHelper
                    src={`${item?.thumbnail}`}
                    className="w-30px"
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    size={true}
                    alt={product?.name}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail product={product} productDetail={productDetail} />
    </div>
  );
};

export default ProductItem;
