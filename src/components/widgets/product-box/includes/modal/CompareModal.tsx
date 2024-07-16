import Link from "next/link";
import { FC, useContext, useEffect } from "react";
import { Col, Media, ModalBody, Row } from "reactstrap";
import { CompareContext } from "../../../../../contexts/Compare/CompareContext";

const dummy_image = "https://dummyimage.com/600x620/d4d4d4/6b6a6b.jpg";

type Props = {
  product: any;
};

const CompareMoal: FC<Props> = ({ product }) => {
  const comContext = useContext(CompareContext);
  const addCompare = comContext.addToCompare;

  useEffect(() => {
    addCompare({ ...product });
  }, []);

  return (
    <ModalBody>
      <Row className="compare-modal">
        <Col lg="12">
          <div className="media">
            <Media
              src={`${product.thumbnail ? product.thumbnail.src : dummy_image}`}
              alt=""
              className="img-fluid"
            />
            <div className="text-center media-body align-self-center">
              <h5>
                <i className="fa fa-check"></i>
                <span>{product.name}</span>
                <span>successfully added to your Compare list</span>
              </h5>
              <div className="buttons d-flex justify-content-center">
                <Link href="/product/compare" className="btn-sm btn-solid">
                  View Compare list
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </ModalBody>
  );
};

export default CompareMoal;
