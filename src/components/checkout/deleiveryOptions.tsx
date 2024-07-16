"use client";
import { useAddress } from "@/contexts/address/AddressProvider";
import { useCheckout } from "@/contexts/checkout/CheckoutContext";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import AddressModal from "./address/addressModal";

export default function DeliveryOptions() {
  const [addresses, setAddresses] = useState([]);
  const { getCheckoutData } = useCheckout();
  const {
    addresses: stateAddress,
    selected,
    setSelected,
    remove,
  } = useAddress();

  useEffect(() => {
    if (stateAddress?.length > 0 && !stateAddress[0]?.area_name) {
      getCheckoutData();
    }
    setAddresses(stateAddress as never);
  }, [stateAddress]);

  const handleDeleteAddress = (index: number) => {
    Swal.fire({
      title: "Do you want to delete this address?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
      cancelButtonText: "Close",
    }).then(async result => {
      if (result.isConfirmed) {
        remove(index);
      }
    });
  };

  return (
    <div className="pt-4">
      <div className="">
        <p className="text-muted">Select a delivery option: </p>
      </div>
      <div className="row">
        {addresses && addresses.length > 0 ? (
          addresses.map((item: any, index) => (
            <div className="col-sm-6 mt-2" key={index}>
              <div
                className={`position-relative card card-body `}
                style={{
                  backgroundColor:
                    index === selected ? "#edf8ff" : "transparent",
                }}
              >
                <div
                  className=""
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(index)}
                >
                  <div className="card-title">
                    <strong>{item?.name}</strong>
                  </div>
                  <p className="mb-0 card-text" />
                  <p>{item?.mobile}</p>
                  <p className="mb-0">
                    {item?.area_name +
                      ", " +
                      item?.city_name +
                      ", " +
                      item?.region_name +
                      ", " +
                      item?.address}
                  </p>
                  <p />
                </div>
                <div className="position-absolute top-0 end-0 d-flex flex-column">
                  <AddressModal
                    data={item}
                    onChange={(e: any) => {}}
                    index={index}
                    edit
                  />
                  {index === selected ? (
                    <Button variant="success">
                      <i className="fa fa-check-circle" />
                    </Button>
                  ) : (
                    ""
                  )}
                  {index !== selected && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-6 col-lg-6 text-danger">
            No Delivery Options Added Yet!
          </div>
        )}
      </div>
    </div>
  );
}
