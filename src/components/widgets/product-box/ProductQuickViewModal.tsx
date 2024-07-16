import { useCart } from "@/contexts/cart/CartContext";
import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import {
  formatPrice,
  getDefaultVariant,
  getPriceStringWithDiscount,
  getPriceStringWithoutDiscount,
  getProductURL,
} from "@/helpers/misc";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Col, Media, ModalBody, Row } from "reactstrap";
const dummy_image = "https://dummyimage.com/600x620/d4d4d4/6b6a6b.jpg";

export default function QuickViewModal({ product }: any) {
  const getUniqueValues = (valueName = "value1") => {
    const list = [];
    for (let i = 0; i < product?.variants?.length; i++) {
      const value = product?.variants[i][valueName];
      if (list.indexOf(value) == -1 && value != null) {
        list.push(value);
      }
    }

    return list;
  };
  const router = useRouter();

  const { plusQty, minusQty, quantity, setQuantity, addToCart } = useCart();
  const curContext: any = useContext(CurrencyContext);
  const currency = curContext?.state;
  const { symbol } = curContext?.state;

  const values1 = getUniqueValues("value1") || [];
  const values2 = getUniqueValues("value2") || [];
  const values3 = getUniqueValues("value3") || [];
  const defaultVariant = getDefaultVariant(product);

  const defaultValue1 = defaultVariant?.value1
    ? values1.indexOf(defaultVariant?.value1)
    : null;
  const defaultValue2 = defaultVariant?.value2
    ? values2.indexOf(defaultVariant?.value2)
    : null;
  const defaultValue3 = defaultVariant?.value3
    ? values3.indexOf(defaultVariant?.value3)
    : null;

  const [value1, setVal1] = useState<any>(defaultValue1);
  const [value2, setVal2] = useState<any>(defaultValue2);
  const [value3, setVal3] = useState<any>(defaultValue3);

  const changeQty = (e: any) => {
    setQuantity(parseInt(e.target.value));
  };

  const inStockVariant = () => {
    return (
      product?.variants[getVarIndx()]?.in_stock >= quantity &&
      product?.variants[getVarIndx()]?.in_stock > 0
    );
  };
  const variantChangehandler = (variantName: any, value: any, indx: number) => {
    const val1 =
      variantName == "value1" ? value : getUniqueValues("value1")[value1];
    const val2 =
      variantName == "value2" ? value : getUniqueValues("value2")[value2];
    const val3 =
      variantName == "value3" ? value : getUniqueValues("value3")[value3];

    const varIndx: any = getVarIndx(val1, val2, val3);

    if (varIndx >= 0 && varIndx != null) {
      if (variantName == "value1") {
        setVal1(indx);
      } else if (variantName == "value2") {
        setVal2(indx);
      } else if (variantName == "value3") {
        setVal3(indx);
      }
    }
  };
  const getUniqueOptions = (optionName = "option1") => {
    const list = [];
    for (let i = 0; i < product?.variants?.length; i++) {
      const option = product?.variants[i][optionName];
      if (list.indexOf(option) == -1 && option != null) {
        list.push(option);
      }
    }

    return list;
  };

  const isValue2Valid = (item: any) => {
    const val1 = getUniqueValues("value1")[value1];
    for (let i = 0; i < product?.variants?.length; i++) {
      const variant = product?.variants[i];
      if (variant?.value1 == val1 && variant?.value2 == item) {
        return true;
      }
    }
    return false;
  };
  const isValue3Valid = (item: any) => {
    const val2 = getUniqueValues("value2")[value2];
    for (let i = 0; i < product?.variants?.length; i++) {
      const variant = product?.variants[i];
      if (variant?.value2 == val2 && variant?.value3 == item) {
        return true;
      }
    }
    return false;
  };
  const getVarIndx = (
    var1: any = null,
    var2: any = null,
    var3: any = null
  ): any => {
    const values1 = getUniqueValues("value1");
    const values2 = getUniqueValues("value2");
    const values3 = getUniqueValues("value3");

    const val1 = values1?.length > 0 ? (var1 ? var1 : values1[value1]) : null;
    const val2 = values2?.length > 0 ? (var2 ? var2 : values2[value2]) : null;
    const val3 = values3?.length > 0 ? (var3 ? var3 : values3[value3]) : null;

    let indx = null;
    for (let i = 0; i < product?.variants?.length; i++) {
      if (
        product?.variants[i]?.value1 == val1 &&
        product?.variants[i]?.value2 == val2 &&
        product?.variants[i]?.value3 == val3
      ) {
        indx = i;
      }
    }
    return indx;
  };

  const clickProductDetail = () => {
    const titleProps = product.name.split(" ").join("");
    router.push(getProductURL(product));
  };

  const enableIncButton = () => {
    return product?.variants[getVarIndx()]?.in_stock >= quantity + 1;
  };

  const enableDecButton = () => {
    return quantity > 1;
  };

  return (
    <ModalBody>
      <Row>
        <Col lg="6" xs="12">
          <div className="quick-view-img">
            <Media
              src={`${
                product?.variants[getVarIndx()]?.thumbnail || dummy_image
              }`}
              alt=""
              className="img-fluid"
            />
          </div>
        </Col>
        <Col lg="6" className="rtl-text">
          <div className="product-right">
            <h2> {product.name} </h2>
            {product.price_visibility === 1 && (
              <h3>
                {currency.symbol}
                {getPriceStringWithDiscount(product)}
                {product?.discount?.amount > 0 && (
                  <del>
                    <span className="money">
                      {currency.symbol}
                      {getPriceStringWithoutDiscount(product)}
                    </span>
                  </del>
                )}
              </h3>
            )}
            <div className="product-description border-product">
              {getUniqueValues("value1")?.length > 0 &&
                (getUniqueValues("value1")?.length === 1
                  ? getUniqueValues("value1")[0] !== "Default"
                  : true) && (
                  <h6 className="product-title size-text">
                    {getUniqueOptions("option1")[0]}:
                  </h6>
                )}
              {getUniqueOptions("option1")?.length > 0 &&
              (getUniqueValues("value1")?.length === 1
                ? getUniqueValues("value1")[0] !== "Default"
                : true) ? (
                <div>
                  <div className="size-box">
                    <ul>
                      {getUniqueValues("value1")?.length <= 4 ? (
                        getUniqueValues("value1").map((data, i) => {
                          return (
                            <li
                              key={i}
                              className={`w-auto h-auto rounded px-3  ${
                                i == value1 ? "active" : ""
                              }`}
                              onClick={() =>
                                variantChangehandler("value1", data, i)
                              }
                            >
                              <a href={"#"}>{data}</a>
                            </li>
                          );
                        })
                      ) : (
                        <select
                          className="form-control"
                          onChange={(e) =>
                            variantChangehandler(
                              "value1",
                              e.target.value,
                              getUniqueValues("value1")?.indexOf(e.target.value)
                            )
                          }
                        >
                          {getUniqueValues("value1")?.map((item, indx) => (
                            <option key={indx} selected={indx === value1}>
                              {item}
                            </option>
                          ))}
                        </select>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
              {getUniqueValues("value2")?.length > 0 && (
                <h6 className="product-title size-text">
                  {" "}
                  {getUniqueOptions("option2")[0]}:
                </h6>
              )}
              {getUniqueOptions("option2")?.length > 0 ? (
                <div>
                  <div className="size-box">
                    <ul>
                      {getUniqueValues("value2")?.length <= 4 ? (
                        getUniqueValues("value2").map((data, i) => {
                          return (
                            <li
                              key={i}
                              style={
                                isValue2Valid(data)
                                  ? {}
                                  : { opacity: 0.5, cursor: "no-drop" }
                              }
                              className={`w-auto h-auto rounded px-3 ${
                                i == value2 ? "active" : ""
                              }`}
                              onClick={() =>
                                variantChangehandler("value2", data, i)
                              }
                            >
                              <a href={"#"}>{data}</a>
                            </li>
                          );
                        })
                      ) : (
                        <select
                          className="form-control form-select"
                          onChange={(e) =>
                            variantChangehandler(
                              "value2",
                              e.target.value,
                              getUniqueValues("value2")?.indexOf(e.target.value)
                            )
                          }
                        >
                          {getUniqueValues("value2")?.map((item, indx) => (
                            <option key={indx} selected={indx === value2}>
                              {item}
                            </option>
                          ))}
                        </select>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
              {getUniqueValues("value3")?.length > 0 && (
                <h6 className="product-title size-text">
                  {" "}
                  {getUniqueOptions("option3")[0]}:
                </h6>
              )}
              {getUniqueOptions("option3")?.length > 0 ? (
                <div>
                  <div className="size-box">
                    <ul>
                      {getUniqueValues("value3")?.length <= 4 ? (
                        getUniqueValues("value3").map((data, i) => {
                          return (
                            <li
                              key={i}
                              style={
                                isValue3Valid(data)
                                  ? {}
                                  : { opacity: 0.5, cursor: "no-drop" }
                              }
                              className={`w-auto h-auto rounded px-3 ${
                                i == value3 ? "active" : ""
                              }`}
                              onClick={() =>
                                variantChangehandler("value3", data, i)
                              }
                            >
                              <a href={"#"}>{data}</a>
                            </li>
                          );
                        })
                      ) : (
                        <select
                          className="form-control"
                          onChange={(e) =>
                            variantChangehandler(
                              "value3",
                              e.target.value,
                              getUniqueValues("value3")?.indexOf(e.target.value)
                            )
                          }
                        >
                          {getUniqueValues("value3")?.map((item, indx) => (
                            <option key={indx} selected={indx === value3}>
                              {item}
                            </option>
                          ))}
                        </select>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
              <span className="instock-cls">
                {getVarIndx() !== null && inStockVariant()
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
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
                      disabled={!enableDecButton()}
                      style={{
                        cursor: enableDecButton() ? "pointer" : "not-allowed",
                      }}
                    >
                      <i className="fa fa-angle-left"></i>
                    </button>
                  </span>
                  <input
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
                      onClick={() => plusQty(product)}
                      data-type="plus"
                      disabled={!enableIncButton()}
                      data-field=""
                      style={{
                        cursor: enableIncButton() ? "pointer" : "not-allowed",
                      }}
                    >
                      <i className="fa fa-angle-right"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span>Total Price: </span>
              <h3>
                {symbol}
                {formatPrice(
                  product?.variants[getVarIndx() || 0]?.selling_price *
                    quantity || 0
                )}
              </h3>
            </div>
            <div className="product-buttons">
              <a
                href={"#"}
                className={`btn btn-solid ${
                  getVarIndx() !== null && inStockVariant() ? "" : "disabled"
                }`}
                onClick={() => addToCart(product, quantity, getVarIndx())}
              >
                add to cart
              </a>
              <button className="btn btn-solid" onClick={clickProductDetail}>
                View detail
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </ModalBody>
  );
}
