import { getAuth } from "@/helpers/auth/AuthHelper";
import { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import AddressComponent from ".";
import { TypeAddressModal } from "./Type";

export default function AddressModal({
  edit,
  data,
  onChange,
  index,
  editStyle = "",
  addStyle = "",
}: TypeAddressModal) {
  const [open, setOpen] = useState(false);
  let customer = getAuth();
  return (
    <div>
      {edit ? (
        <button
          className={`btn btn-warning ${editStyle}`}
          onClick={() => setOpen(!open)}
        >
          <i className="fa fa-pencil" />
        </button>
      ) : (
        <button
          className={`px-3 py-1 rounded-lg btn btn-sm btn-outline-info ${addStyle}`}
          onClick={() => setOpen(!open)}
        >
          Add
        </button>
      )}

      <Modal
        show={open}
        toggle={setOpen}
        backdrop={"static"}
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>
            {" "}
            {edit ? "Edit Address" : "Add New Address"}
          </Modal.Title>
          <Modal.Title
            onClick={() => setOpen(false)}
            className="ml-auto text-danger"
          >
            <i
              className="fa fa-times-circle"
              style={{ cursor: "pointer", fontSize: 30 }}
            />
          </Modal.Title>
        </Modal.Header>
        <ModalBody className="p-3">
          <AddressComponent
            formValues={
              data
                ? data
                : {
                    name: customer?.name || "",
                    email: customer?.email || "",
                    address_type: 'Home'
                  }
            }
            onChange={onChange}
            edit={edit}
            index={index}
            onCancel={() => setOpen(false)}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}
