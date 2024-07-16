import { Media } from "reactstrap";
import {
  CompareBtn,
  WishlistBtn,
} from "../../widgets/product-box/includes/btns";
import MasterSocial from "./master_social";
import VariantTable from "./variableTable";

const visa = "/assets/images/icon/visa.png";
const mastercard = "/assets/images/icon/mastercard.png";
const paypal = "/assets/images/icon/paypal.png";
const express = "/assets/images/icon/american-express.png";
const discover = "/assets/images/icon/discover.png";

const PaymentData = [
  { img: visa, link: "#" },
  { img: mastercard, link: "#" },
  { img: paypal, link: "#" },
  { img: express, link: "#" },
  { img: discover, link: "#" },
];

const Detail = ({ product, variant }: { variant: any; product: any }) => {
  return (
    <div className="product-right product-description-box">
      <div className={`product-icon`}>
        <h2> {product?.name} </h2>
      </div>
      <div className="border-product">
        <h6 className="product-title">product details</h6>
        <div
          className="sort-dest"
          dangerouslySetInnerHTML={{ __html: unescape(product.description) }}
        />
      </div>
      <div className="single-product-tables border-product detail-section">
        <VariantTable variant={variant} />
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
          <WishlistBtn product={product} className="wishlist-btn" />
          <CompareBtn product={product} />
        </div>
      </div>
      <div className="border-product">
        <div className="payment-card-bottom">
          <ul>
            {PaymentData.map((data, index) => {
              return (
                <li key={index}>
                  <a href={data.link}>
                    <Media src={data.img} alt="" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
