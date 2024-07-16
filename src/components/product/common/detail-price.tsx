import { FC, useEffect, useState } from "react";

import CountdownTimer from "@/helpers/countdown-component/countdown";
import {
  BuyNowBtn,
  CardBtn,
  CompareBtn,
  WishlistBtn,
} from "../../widgets/product-box/includes/btns";
import {
  PriceParties,
  RatingMake,
} from "../../widgets/product-box/includes/parties";
import VariantHandler from "../../widgets/product-box/includes/variantHandler";
import MasterSocial from "./master_social";

type Props = {
  item: any;
  stickyClass?: any;
  changeImage?: any;
};

const DetailsWithPrice: FC<Props> = ({
  item: product,
  stickyClass,
  changeImage,
}) => {
  const [selected, setSelectedVariant] = useState<any>({});
  const [qty, setQty] = useState<any>(0);

  useEffect(() => {
    const variants = Array.isArray(product?.variants) ? product?.variants : [];
    for (let i = 0; i < variants?.length; i++) {
      if (variants[i]?.id === selected.variants?.id && changeImage) {
        changeImage(i);
      }
    }
  }, [selected]);

  return (
    <div className="pl-3">
      <div className={`product-right ${stickyClass}`}>
        <div className={`product-icon`}>
          <h2> {product?.name} </h2>
        </div>
        <div className="mb-3 product-icon">
          <RatingMake total={product?.rating.avg} />
        </div>
        {/* <div className="pb-1">
          SKU: <span style={{ color: "#999" }}>{product?.prod_id}</span>
        </div> */}

        <h4>Price:</h4>
        <PriceParties product={product} selected={selected} />

        <VariantHandler
          product={product}
          selected={selected}
          onSelected={setSelectedVariant}
          onQty={setQty}
        />

        <div className="product-buttons">
          <CardBtn
            product={{ ...selected, qtyNew: qty }}
            style="details"
            preOrder={false}
          />
          <BuyNowBtn product={{ ...selected, qtyNew: qty }} />
        </div>
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          {product.description.includes("%") ||
          product.description.includes("//") ||
          product.description.includes("/\\/") ? (
            <div
              className="sort-dest"
              dangerouslySetInnerHTML={{
                __html: unescape(product.description),
              }}
            />
          ) : (
            <div
              className="sort-dest"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
        </div>
        <div className="border-product">
          <h6 className="mb-2 product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial
              categories={product.categories}
              image={product.thumbnail?.src}
              name={product.name}
              url={`product/${product?.slug}`}
            />
            <div className="ml-2 d-flex align-items-center">
              <WishlistBtn product={product} className="wishlist-btn" />
              <div className="ml-3">
                <CompareBtn product={product} />
              </div>
            </div>
          </div>
        </div>
        {Array.isArray(product?.campaigns) &&
          product?.campaigns?.length > 0 && (
            <div className="border-product">
              <h6 className="product-title">Time Reminder</h6>
              <div className="timer">
                <CountdownTimer time={product?.campaigns[0]?.end_at} />
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default DetailsWithPrice;
