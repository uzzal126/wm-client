import { FC, useState } from "react";
import { Col, Media, ModalBody, Row } from "reactstrap";

import { BuyNowBtn, CardBtn } from "../btns";
import { PriceParties } from "../parties";
import VariantHandler from "../variantHandler";

type Props = {
  product: any;
  setModal: any;
};

const dummy_image = "https://dummyimage.com/600x620/d4d4d4/6b6a6b.jpg";

const QuickViewModal: FC<Props> = ({ product, setModal }) => {
  const [selected, setSelectedVariant] = useState<any>({});
  const [qty, setQty] = useState<any>(0);

  return (
    <ModalBody>
      <Row>
        <Col lg="6" xs="12">
          <div className="quick-view-img">
            <Media
              src={
                (selected &&
                  selected?.variants &&
                  selected?.variants?.thumbnail) ||
                product?.thumbnail?.src ||
                dummy_image
              }
              alt={product.name}
              className="img-fluid"
            />
          </div>
        </Col>
        <Col lg="6" className="rtl-text">
          <div className="pr-4 product-right position-relative">
            <button
              className="rounded btn btn-sm btn-danger position-absolute end-0"
              onClick={() => setModal(false)}
            >
              <i className="fa fa-times" />
            </button>
            <h2> {product.name} </h2>
            <PriceParties product={product} selected={selected} />
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
        </Col>
      </Row>
    </ModalBody>
  );
};
export default QuickViewModal;
