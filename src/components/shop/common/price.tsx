import { CurrencyContext } from "@/contexts/Currency/CurrencyContext";
import { PRICE_MAX, useFilter } from "@/contexts/filter/FilterProvider";
import { formatPrice } from "@/helpers/misc";
import { useContext, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 250;
const MIN = 0;
const MAX = PRICE_MAX;

const Price = () => {
  const curContext: any = useContext(CurrencyContext);
  const symbol = curContext?.state?.symbol;
  const { max_price, min_price, setParam, setParamNew } = useFilter();
  const [values, setValues] = useState([
    Number(min_price) || MIN,
    Number(max_price) || MAX,
  ]);

  const handleRangeChange = (newValues: any) => {
    setValues(newValues);
  };

  const handleFinalChange = (newValues: any) => {
    setParamNew({min_price: newValues[0], max_price: newValues[1]})
    // setParam("min_price", newValues[0].toString());
    // setParam("max_price", newValues[1].toString());
  }

  return (
    <div className="border-0 collection-collapse-block open">
      <h3 className="collapse-block-title">price</h3>
      <div className="collection-collapse-block-content">
        <div className="mt-3 wrapper">
          <div className="range-slider">
            <Range
              values={values}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={handleRangeChange}
              onFinalChange={handleFinalChange}
              // onFinalChange={price => {
              //   // setParam("min_price", price[0].toString());
              //   setParam("max_price", price[1].toString());
              // }}
              renderTrack={({ props, children }) => (
                <div
                {...props}
                style={{
                  ...props.style,
                  height: '6px',
                  width: '100%',
                  background: getTrackBackground({
                    values: values,
                    colors: [
                      "#ccc",
                      "var(--theme-deafult)",
                      "#ccc",
                    ],
                    min: MIN,
                    max: MAX,
                  }),
                  borderRadius: '4px',
                }}
                >
                    {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "16px",
                    width: "16px",
                    borderRadius: "60px",
                    backgroundColor: "var(--theme-deafult)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                ></div>
              )}
            />
            <div style={{ marginTop: '20px' }}>
              {`Range: ${symbol}(${formatPrice(Number(values[0]))} - ${formatPrice(Number(values[1]))})`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;