import { FC, useEffect, useState } from "react";
import { Col } from "reactstrap";
import ProductAccordion from "./accordian_exple";
import DetailBox from "./detail-box";
import Detail from "./detailPage";

type Props = {
  data: any;
  accordion?: any;
  changeImage?: any;
};

const Details: FC<Props> = ({ data, accordion = false, changeImage }) => {
  const [selected, setSelectedVariant] = useState<any>({});
  useEffect(() => {
    const variants = Array.isArray(data?.variants) ? data?.variants : [];
    for (let i = 0; i < variants?.length; i++) {
      if (variants[i]?.id === selected.variants?.id && changeImage) {
        changeImage(i);
      }
    }
  }, [selected]);

  return (
    <>
      <Col lg="4">
        {accordion ? (
          <ProductAccordion item={data} variant={selected} />
        ) : (
          <Detail product={data} variant={selected} />
        )}
      </Col>
      <Col lg="4">
        <DetailBox
          product={data}
          selected={selected}
          setSelectedVariant={setSelectedVariant}
        />
      </Col>
    </>
  );
};
export default Details;
