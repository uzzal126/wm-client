import { useContext, useState } from "react";
import { CurrencyContext } from "../../../contexts/Currency/CurrencyContext";
import CountdownTimer from "../../../helpers/countdown-component/countdown";
import { BuyNowBtn, CardBtn } from "../../widgets/product-box/includes/btns";
import { PriceParties } from "../../widgets/product-box/includes/parties";
import VariantHandler from "../../widgets/product-box/includes/variantHandler";

const DetailBox = ({
  product,
  setSelectedVariant,
  selected,
}: {
  product: any;
  setSelectedVariant: any;
  selected: any;
}) => {
  const [qty, setQty] = useState<any>(0);

  const CurContent: any = useContext(CurrencyContext);
  const symbol = CurContent.state.symbol;

  return (
    <div className="product-right product-form-box">
      <PriceParties product={product} selected={selected} />

      {product?.campaigns?.length > 0 && product?.discount?.amount > 0 && (
        <>
          <h6 className="product-title">Time Reminder</h6>
          <CountdownTimer time={product?.campaigns[0]?.end_at} />
        </>
      )}
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
    </div>
  );
};

export default DetailBox;
