import { useContext } from "react";
import { useSelector } from "react-redux";
import { CurrencyContext } from "../../../contexts/Currency/CurrencyContext";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
import { CardBtn } from "../../widgets/product-box/includes/btns";
import { PriceParties } from "../../widgets/product-box/includes/parties";

type Props = {
  product: any;
  stickyClass?: any;
};

const DetailsMinimal = ({ product, stickyClass }: Props) => {
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  const { general_settings } = data;

  const CurContent: any = useContext(CurrencyContext);
  const symbol = CurContent.state.symbol;

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <div className="d-flex justify-content-between align-items-center">
          <h2> {product.name} </h2>
          <CardBtn product={product} style="details" preOrder={false} />
        </div>
        {product.price_visibility === 1 && (
          <div className="py-2">
            {product?.discount?.amount > 0 && (
              <h4>
                <del>
                  {symbol}
                  {product.price?.max}
                  {general_settings?.product_page?.vat_text &&
                    general_settings?.product_page?.vat_text}
                </del>
                <span>{product?.discount?.amount} off</span>
              </h4>
            )}
            <PriceParties product={product} />
          </div>
        )}
        <div className="border-product">
          <h3 className="product-title">product details</h3>
          <div
            className="sort-dest"
            dangerouslySetInnerHTML={{ __html: unescape(product.description) }}
          />
        </div>
      </div>
    </>
  );
};

export default DetailsMinimal;
