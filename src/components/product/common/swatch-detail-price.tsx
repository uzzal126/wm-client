import Link from "next/link";
import { useContext, useState } from "react";
import { Input, Media, Modal, ModalBody, ModalHeader } from "reactstrap";

import CountdownComponent from "@/components/widgets/countdownComponent";
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { useCart } from "@/contexts/cart/CartContext";
import MasterSocial from "./master_social";

const SwatchDetailsWithPrice = (params: any) => {
  const [modal, setModal] = useState<any>(false);
  const CurContect: any = useContext(CurrencyContext);
  const symbol = CurContect?.state?.symbol;
  const toggle = () => setModal(!modal);
  const product = params.item;

  const { addToCart, stock, plusQty, minusQty, quantity, setQuantity } =
    useCart();

  const uniqueColor: any = [];
  const uniqueSize: any = [];

  const changeQty = (e: any) => {
    setQuantity(parseInt(e.target.value));
  };
  return (
    <>
      <div className={`product-right ${params.stickyClass}`}>
        <h2> {product.name} </h2>
        <h4>
          <del>
            {symbol}
            {product.price}
          </del>
          <span>{product.discount}% off</span>
        </h4>
        <h3>
          {symbol}
          {product.price - (product.price * product.discount) / 100}{" "}
        </h3>
        {product.variants.map((vari: any) => {
          var findItem = uniqueColor.find((x: any) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x: any) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })}
        {uniqueColor ? (
          <ul className="color-variant">
            {uniqueColor.map((vari: any, i: number) => {
              return (
                <li
                  className={vari.color}
                  key={i}
                  title={vari.color}
                  onClick={() => params.changeColorVar(i)}
                ></li>
              );
            })}
          </ul>
        ) : (
          ""
        )}

        <ul className="image-swatch">
          <li className="active">
            <a href="#">
              <img
                src={"/assets/images/fashion/pro/001.jpg"}
                alt=""
                className="img-fluid blur-up lazyloaded"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src={"/assets/images/fashion/pro/002.jpg"}
                alt=""
                className="img-fluid blur-up lazyloaded"
              />
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src={"/assets/images/fashion/pro/02.jpg"}
                alt=""
                className="img-fluid blur-up lazyloaded"
              />
            </a>
          </li>
        </ul>

        <div className="product-description border-product">
          {product.variants ? (
            <div>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a
                    href={""}
                    data-toggle="modal"
                    data-target="#sizemodal"
                    onClick={toggle}
                  >
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media
                    src={"/assets/images/size-chart.jpg"}
                    alt="size"
                    className="img-fluid"
                  />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSize.map((data: any, i: number) => {
                    return (
                      <li key={i}>
                        <p style={{ cursor: "pointer" }}>{data}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          <span className="instock-cls">{stock}</span>
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="py-3 btn quantity-left-minus"
                  onClick={minusQty}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={quantity}
                onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="py-3 btn quantity-right-plus"
                  onClick={plusQty}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <div
            style={{ cursor: "pointer" }}
            className="btn btn-solid"
            onClick={() => addToCart(product, quantity)}
          >
            add to cart
          </div>
          <Link href={`/page/account/checkout`} className="btn btn-solid">
            buy now
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">product details </h6>
          <div
            className="sort-dest"
            dangerouslySetInnerHTML={{ __html: unescape(product.description) }}
          />
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial
              categories={product.categories}
              image={product.thumbnail?.src}
              name={product.name}
              url={`product/${product?.slug}`}
            />
          </div>
        </div>
        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default SwatchDetailsWithPrice;
