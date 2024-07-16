import { useCart } from "@/contexts/cart/CartContext";
import { FC, useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../../../../contexts/Currency/CurrencyContext";
import {
  findUnique,
  formatPrice,
  getDiscountPriceVariant,
} from "../../../../helpers/misc";

type Props = {
  product: any;
  selected: any;
  onSelected: any;
  onQty: any;
  showQty?: boolean;
};

const VariantHandler: FC<Props> = ({
  product,
  selected,
  onSelected,
  onQty,
  showQty = true,
}) => {
  const [v1, setV1] = useState<string>("");
  const [v2, setV2] = useState<string>("");
  const [v3, setV3] = useState<string>("");
  const [quantity, setQuantity] = useState<any>(1);

  const [option1, setOption1] = useState<any>([]);
  const [option2, setOption2] = useState<any>([]);
  const [option3, setOption3] = useState<any>([]);

  const curContext: any = useContext(CurrencyContext);
  const { getQty } = useCart();
  const { symbol } = curContext.state;

  useEffect(() => {
    if (selected && Object.keys(selected).length > 0) {
      onQty(quantity);
    }
  }, [quantity, selected]);

  useEffect(() => {
    setQuantity(Number(getQty(selected)));
  }, [selected]);

  useEffect(() => {
    if (product?.variants && product?.variants?.length > 0) {
      if (product?.variants.length === 1) {
        // handleVariantChange(1, product?.variants[0]);
        handleOption(product?.variants);
      } else {
        handleOption(product?.variants);
      }
    }
  }, [product]);

  function getUniqueObjects(arr: any, propertyName: any) {
    return arr.filter(
      (obj: any, index: number, self: any) =>
        index ===
        self.findIndex((o: any) => o[propertyName] === obj[propertyName])
    );
  }

  const handleOption = (variants: any) => {
    let value1 = "";
    let value2 = "";
    let value3 = "";
    let op: any = variants.filter((f: any) => f.option1 !== null);

    op = getUniqueObjects(op, "value1");

    if (op && op.length > 0) {
      let stockValue = op.filter((f: any) => f.in_stock > 0);
      if (stockValue && stockValue.length > 0) {
        onSelected({
          ...product,
          variants: { ...stockValue[0] },
        });
        value1 = stockValue[0].value1;
        value2 = stockValue[0].value2;
        value3 = stockValue[0].value3;
        setV1(value1);
        setV2(value2);
        setV3(value3);
        let op2 = variants.filter(
          (f: any) => f.option2 !== null && f.value1 === value1
        );
        op2 = getUniqueObjects(op2, "value2");
        if (op2 && op2.length > 0) {
          setOption2(op2);
          let op3 = variants.filter(
            (f: any) =>
              f.option3 !== null && f.value2 === value2 && f.value1 === value1
          );
          op3 = getUniqueObjects(op3, "value3"); //findUnique(op3, (d: any) => d.value3);
          if (op3 && op3.length > 0) {
            setOption3(op3);
          } else {
            setOption3([]);
          }
        } else {
          setOption2([]);
          setOption3([])
        }
      } else {
        setOption2([])
        setOption3([])
        onSelected({})
      }
      setOption1(op);
    } else {
      setOption1([]);
      setOption2([]);
      setOption3([]);
      onSelected({})
    }
  };

  const handleVariantChange = (option: any, item: any) => {
    let variants = product?.variants;
    if (option === 1) {
      setV1(item.value1);

      if (option2 && option2.length > 0) {
        let op2 = variants.filter(
          (f: any) => f.option2 !== null && f.value1 === item.value1
        );
        op2 = findUnique(op2, (d: any) => d.value2);
        setOption2(op2.length > 0 ? op2 : []);

        let op3 = variants.filter(
          (f: any) =>
            f.option3 !== null && f.value2 === v2 && f.value1 === item.value1
        );
        op3 = findUnique(op3, (d: any) => d.value3);
        setOption3(op3.length > 0 ? op3 : []);
        onSelected({});
        setV2("");
        setV3("");
      } else {
        handleSetSelected(item);
      }
    }
    if (option === 2) {
      setV2(item.value2);
      if (option3 && option3.length > 0) {
        let op3 = variants.filter(
          (f: any) =>
            f.option3 !== null && f.value2 === item.value2 && f.value1 === v1
        );
        op3 = findUnique(op3, (d: any) => d.value3);
        setOption3(op3.length > 0 ? op3 : []);
        onSelected({});
        setV3("");
      } else {
        handleSetSelected(item);
      }
    }
    if (option === 3) {
      setV3(item.value3);
      if (v1 !== "" && v2 !== "" && v3 !== "") handleSetSelected(item);
    }
  };

  const handleSetSelected = (item: any) => {
    if (item) {
      onSelected({ ...product, variants: { ...item } });
    }
  };
  if (product.cart_visibility !== 1) return <></>;

  return (
    <div className="product-description border-product">
      {option1.length > 0 &&
        option1.filter((f: any) => f.option1 !== "Variant").length > 0 && (
          <>
            <h6 className="product-title size-text">{option1[0].option1}:</h6>
            <div>
              <div className="size-box">
                <ul>
                  {option1.length <= 4 ? (
                    option1
                      .filter((f: any) => f.option1 !== "Variant")
                      .map((data: any, i: any) => {
                        return (
                          <li
                            key={i}
                            className={`w-auto h-auto rounded px-3 ${
                              data.value1 === v1 ? "active" : ""
                            }`}
                            style={{
                              color:
                                data.value1 === v1
                                  ? "var(--theme-deafult)"
                                  : "#212529",
                              marginTop: 5,
                            }}
                            onClick={() => handleVariantChange(1, data)}
                          >
                            <>{data.value1}</>
                          </li>
                        );
                      })
                  ) : (
                    <select
                      className="form-control"
                      onChange={(e) =>
                        handleVariantChange(1, JSON.parse(e.target.value))
                      }
                    >
                      <option value={""} disabled>
                        Please Select
                      </option>
                      {option1
                        .filter((f: any) => f.option1 !== "Variant")
                        .map((item: any, indx: any) => (
                          <option
                            key={indx}
                            value={JSON.stringify(item)}
                            selected={item.value1 === v1}
                          >
                            {item.value1}
                          </option>
                        ))}
                    </select>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      {option2.length > 0 && (
        <>
          <h6 className="product-title size-text">{option2[0].option2}:</h6>
          <div>
            <div className="size-box">
              <ul>
                {option2.length <= 4 ? (
                  option2.map((data: any, i: any) => {
                    return (
                      <li
                        key={i}
                        className={`w-auto h-auto rounded px-3 ${
                          data.value2 === v2 ? "active" : "is-invalid"
                        }`}
                        style={{
                          color:
                            data.value2 === v2
                              ? "var(--theme-deafult)"
                              : "#212529",
                        }}
                        onClick={() => handleVariantChange(2, data)}
                      >
                        <>{data.value2}</>
                      </li>
                    );
                  })
                ) : (
                  <select
                    className={`form-control ${v2 === "" ? "is-invalid" : ""}`}
                    onChange={(e) =>
                      handleVariantChange(2, JSON.parse(e.target.value))
                    }
                  >
                    <option value={""} disabled>
                      Please Select
                    </option>
                    {option2.map((item: any, indx: any) => (
                      <option
                        key={indx}
                        value={JSON.stringify(item)}
                        selected={item.value2 === v2}
                      >
                        {item.value2}
                      </option>
                    ))}
                  </select>
                )}
              </ul>
              {v2 === "" ? (
                <div className="text-danger">Please Choose Variant</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
      {option3.length > 0 && (
        <>
          <h6 className="product-title size-text">{option3[0].option3}:</h6>
          <div>
            <div className="size-box">
              {option3.length <= 4 ? (
                <ul className={v3 === "" ? `border border-danger` : ""}>
                  {option3.map((data: any, i: any) => {
                    return (
                      <li
                        key={i}
                        className={`w-auto h-auto rounded px-3 ${
                          data.value3 === v3 ? "active" : ""
                        }`}
                        style={{
                          color:
                            data.value3 === v3
                              ? "var(--theme-deafult)"
                              : "#212529",
                        }}
                        onClick={() => handleVariantChange(3, data)}
                      >
                        <>{data.value3}</>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <select
                  className={`form-control ${v3 === "" ? "is-invalid" : ""}`}
                  onChange={(e) =>
                    handleVariantChange(2, JSON.parse(e.target.value))
                  }
                >
                  {option3.map((item: any, indx: any) => (
                    <option
                      key={indx}
                      value={JSON.stringify(item)}
                      selected={item.value3 === v3}
                    >
                      {item.value3}
                    </option>
                  ))}
                </select>
              )}
              {v3 === "" ? (
                <div className="text-danger">Please Choose Variant</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
      <div
        className="mb-2 instock-cls"
        style={{
          color: "#00e600",
        }}
      >
        {/* {Object.keys(selected).length > 0 ? (
          selected && selected?.variants && selected?.variants?.in_stock > 0 ? (
            "In Stock"
          ) : (
            <span className="text-danger">of Stock</span>
          )
        ) : null} */}
        {selected && selected?.variants && selected?.variants?.in_stock > 0 ? (
          "In Stock"
        ) : (
          <span className="text-danger">Out of Stock</span>
        )}
      </div>
      {showQty ? (
        <>
          <h6 className="product-title">quantity</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  style={{
                    cursor: quantity > 1 ? "pointer" : "not-allowed",
                    opacity: quantity > 1 ? 1 : 0.3,
                  }}
                >
                  <i className="fa fa-minus"></i>
                </button>
              </span>
              <input
                type="number"
                inputMode="numeric"
                name="quantity"
                value={quantity === 0 ? "" : quantity}
                onChange={(e: any) =>
                  parseInt(e.target.value) > 0
                    ? selected &&
                      selected?.variants &&
                      selected?.variants?.in_stock >=
                        parseInt(e.target.value) &&
                      setQuantity(parseInt(e.target.value))
                    : setQuantity(0)
                }
                className="form-control input-number numberInput"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={() =>
                    selected &&
                    selected?.variants &&
                    selected?.variants?.in_stock >= quantity &&
                    setQuantity(quantity + 1)
                  }
                  disabled={
                    selected &&
                    selected?.variants &&
                    selected?.variants?.in_stock < quantity
                  }
                  style={{
                    cursor:
                      selected &&
                      selected?.variants &&
                      selected?.variants?.in_stock >= quantity
                        ? "pointer"
                        : "not-allowed",
                    opacity:
                      selected &&
                      selected?.variants &&
                      selected?.variants?.in_stock >= quantity
                        ? 1
                        : 0.3,
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {Object.keys(selected).length > 0 && (
        <div className="mt-3">
          <span>Total Price: </span>
          <h3>
            {symbol?.length > 1 ? `${symbol} ` : `${symbol}`}
            {formatPrice(
              getDiscountPriceVariant(product, selected?.variants) *
                (quantity === 0 ? 1 : quantity)
            )}
          </h3>
        </div>
      )}
    </div>
  );
};

export default VariantHandler;
