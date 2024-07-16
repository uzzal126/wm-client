import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Media, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { ImageHelper } from "../../../helpers/lazy-load-image/image-lazy-load2";
import {
  getDefaultVariantIndex,
  getProductURL,
  getThumbnail,
  wishlistHandler,
} from "../../../helpers/misc";
import MasterProductDetail from "./MasterProductDetail";
import QuickViewModal from "./ProductQuickViewModal";

const ProductItem = ({
  product,
  addCart,
  addWishlist,
  addToCompare,
  cartClass,
}: any) => {
  // eslint-disable-next-line
  const router = useRouter();
  const varIndex: any = getDefaultVariantIndex(product);
  const [variationIndx, setVarIndx] = useState(varIndex >= 0 ? varIndex : null);
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(product?.wishlist || false);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const toggle = () => setModal(!modal);

  const onClickHandle = (img: any) => {
    setImage(img);
  };

  let RatingStars = [];
  for (var i = 0; i < product.rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

  const hanldeCartAdd = () => {
    if (Array.isArray(product?.variants) && product?.variants?.length > 1) {
      toggle();
    } else {
      addCart(product, 1, variationIndx);
    }
  };

  return (
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
          <>
            <div className="front">
              <ImageHelper
                src={image || getThumbnail(product)}
                className="img-fluid"
                alt=""
                style=""
              />
            </div>
            {product?.gallery && product?.gallery.length > 0 ? (
              <div className="back">
                <Media
                  src={`${image ? image : product?.gallery[0].src}`}
                  className="img-fluid"
                  alt=""
                />
              </div>
            ) : (
              ""
            )}
          </>
        </Link>

        <div className={cartClass}>
          {product.cart_visibility === 1 && (
            <button title="Add to cart" onClick={hanldeCartAdd}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </button>
          )}
          <a
            href={"#"}
            title="Add to Wishlist"
            onClick={(e: any) => {
              e.preventDefault();
              wishlistHandler(addWishlist, product, router);
              setIsInWishlist(!isInWishlist);
            }}
          >
            <i
              className={`fa${isInWishlist ? "-solid" : "-regular"} fa-heart`}
              aria-hidden="true"
            ></i>
          </a>
          <a href={"#"} title="Quick View" onClick={toggle}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          <a href={"#"} title="Compare" onClick={toggleCompare}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a>
          <Modal isOpen={modalCompare} toggle={toggleCompare} centered>
            <ModalHeader toggle={toggleCompare}>Quick View</ModalHeader>
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <Media
                      src={`${
                        product.variants && image
                          ? image
                          : getThumbnail(product)
                      }`}
                      alt=""
                      className="img-fluid"
                    />
                    <div className="text-center media-body align-self-center">
                      <h5>
                        <i className="fa fa-check"></i>{" "}
                        <span>{product.name}</span>
                        <span>successfully added to your Compare list</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link
                          href="/product/compare"
                          className="btn-sm btn-solid"
                          onClick={addToCompare}
                        >
                          View Compare list
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
        {product.images ? (
          <ul className="product-thumb-list">
            {product.images?.map((img: any, i: any) => (
              <li
                className={`grid_thumb_img ${
                  i === variationIndx ? "active" : ""
                }`}
                key={i}
              >
                <a href={"#"} title="Add to Wishlist">
                  <Media
                    src={`${img?.thumbnail}`}
                    alt="wishlist"
                    onClick={() => onClickHandle(i)}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail
        product={product}
        productDetail=""
        // currency={currency}
        // uniqueTags={uniqueTags}
        // variantChangeByColor={variantChangeByColor}
        detailClass="text-center"
      />
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-lg quickview-modal"
        centered
        size="lg"
      >
        <QuickViewModal
          product={product}
          // variationIndx={variationIndx}
          // setVarIndx={setVarIndx}
        />
      </Modal>
    </div>
  );
};

export default ProductItem;
