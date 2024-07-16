import Link from "next/link";
import { FC, useState } from "react";
import { Media } from "reactstrap";
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
  cartClass?: any;
};

const ProductItem: FC<Props> = ({ product }) => {
  // eslint-disable-next-line
  const [image, setImage] = useState("");

  const onClickHandle = (img: string) => {
    setImage(img);
  };

  // const variantChangeByColor = (imgId, product_images) => {
  //   product_images.map((data) => {
  //     if (data.image_id == imgId) {
  //       setImage(data.src);
  //     }
  //   });
  // };

  let RatingStars = [];
  for (var i = 0; i < product.rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

  return (
    <>
      <div className="product-box product-wrap" key={i}>
        <div className="img-wrapper">
          <div className="lable-block">
            {product.new === true ? <span className="lable3">new</span> : ""}
            {product.sale === true ? (
              <span className="lable4">on sale</span>
            ) : (
              ""
            )}
          </div>
          <Link href={getProductURL(product)} prefetch={false}>
            <>
              <div className="front">
                <ImageHelper
                  src={image || getThumbnail(product)}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="back">
                <ImageHelper
                  src={image ? image : getThumbnail(product)}
                  className="img-fluid"
                  alt=""
                />
              </div>
            </>
          </Link>

          <div
            className="cart-detail"
            style={{ background: "rgba(50, 50, 50, 0.9)" }}
          >
            <WishlistBtn product={product} />
            <QuickViewBtn product={product} />
            <CompareBtn product={product} />
          </div>
          {product.images ? (
            <ul className="product-thumb-list">
              {product.images.map((img: any, i: number) => (
                <li
                  className={`grid_thumb_img ${
                    img.src === image ? "active" : ""
                  }`}
                  key={i}
                >
                  <a
                    onClick={() => onClickHandle(img.src)}
                    title="Product Gallery"
                  >
                    <Media
                      src={`${img.src}`}
                      alt="Gallery"
                      onClick={() => onClickHandle(img.src)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="product-info text-align-center d-flex flex-column align-items-center">
          <RatingMake size={16} total={product?.rating?.avg} />
          <Link href={getProductURL(product)}>
            <h6>{product?.name || product?.title}</h6>
          </Link>

          <PriceParties product={product} />
          {/* 
          {product.variants.map((vari) => {
            var findItem = uniqueTags.find((x) => x.color === vari.color);
            if (!findItem) uniqueTags.push(vari);
          })}

          {uniqueTags ? (
            <ul className="color-variant">
              {uniqueTags.map((vari, i) => {
                return (
                  <li
                    className={vari.color}
                    key={i}
                    title={vari.color}
                    onClick={() =>
                      variantChangeByColor(vari.image_id, product.images)
                    }></li>
                );
              })}
            </ul>
          ) : (
            ""
          )} */}
          <CardBtn product={product} style="outline" />
        </div>
      </div>
    </>
  );
};

export default ProductItem;
