import Link from "next/link";
import { FC } from "react";
import { formatLongString, getProductURL } from "../../../helpers/misc";
import { PriceParties, RatingMake } from "./includes/parties";

type Props = {
  product: any;
  productDetail?: any;
  detailClass?: any;
};

const MasterProductDetailList: FC<Props> = ({
  product,
  productDetail,
  detailClass,
}) => {
  return (
    <div className="mx-3">
      <div className="d-flex flex-column align-items-start">
        <Link href={getProductURL(product)}>
          <h6
            className="mt-0"
            style={{ fontWeight: "500", wordBreak: "break-word" }}
          >
            {formatLongString(product?.name || product?.title, 40)}
          </h6>
        </Link>
        <div>
          <RatingMake total={product?.rating?.avg} />
        </div>
        <PriceParties product={product} />
      </div>
    </div>
  );
};

export default MasterProductDetailList;
