import { FC } from "react";
import { Modal } from "reactstrap";
import CompareMoal from "./CompareModal";
import QuickViewModal from "./quickViewModal";

type ModalProps = {
  product: any;
  setModal: any;
  show: boolean;
};

export const CardModal: FC<ModalProps> = ({ product, show, setModal }) => {
  return (
    <Modal
      isOpen={show}
      toggle={() => setModal(!show)}
      className="modal-lg quickview-modal"
      centered
    >
      <QuickViewModal product={product} setModal={setModal} />
    </Modal>
  );
};
export const CompareModal: FC<ModalProps> = ({ product, show, setModal }) => {
  return (
    <Modal
      isOpen={show}
      toggle={() => setModal(!show)}
      className=" quickview-modal"
      size="lg"
      centered
    >
      <CompareMoal product={product} />
    </Modal>
  );
};
