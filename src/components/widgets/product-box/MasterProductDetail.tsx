import Link from "next/link";
import { FC } from "react";
import { getProductURL } from "../../../helpers/misc";
import { PriceParties, RatingMake } from "./includes/parties";

type Props = {
  product: any;
  productDetail?: any;
  detailClass?: any;
};

const MasterProductDetail: FC<Props> = ({
  product,
  productDetail,
  detailClass,
}) => {
  return (
    <div
      className={`product-detail ${productDetail || ""} ${
        detailClass || ""
      } py-1`}
    >
      <div className="text-center d-flex flex-column align-items-center">
        <div className="mt-1">
          <RatingMake total={product?.rating?.avg} />
        </div>
        <Link href={getProductURL(product)}>
          <h6 className="mt-0">{product?.name || product?.title}</h6>
        </Link>
        <div className="mt-0">
          <PriceParties product={product} />
        </div>
      </div>
    </div>
  );
};

export default MasterProductDetail;
