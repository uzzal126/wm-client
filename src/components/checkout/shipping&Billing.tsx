import { useAddress } from "@/contexts/address/AddressProvider";
import { useEffect, useState } from "react";
import AddressModal from "./address/addressModal";

type Props = {
  isSeperateDeliveryAddress: boolean | string;
};

export default function ShippingDetails({
  isSeperateDeliveryAddress = false,
}: Props) {
  const [addresses, setAddresses] = useState([]);
  const { addresses: stateAddress, selected } = useAddress();

  useEffect(() => {
    setAddresses(stateAddress as never);
  }, [stateAddress]);

  const address: any =
    addresses.length > 0 ? addresses.find((_, i) => i === selected) : undefined;

  return (
    <>
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="title font-weight-bold">{`${
            isSeperateDeliveryAddress ? "Shipping" : ""
          } Address`}</h4>
          <AddressModal onChange={(e: any) => console.log(e)} />
        </div>
        {address && Object.keys(address).length > 0 ? (
          <>
            <div className="location">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">
                  <i className="mr-2 fa fa-map-marker" />
                  <strong>{address?.name ? address?.name : "Name"}</strong>
                </p>
              </div>
              <div className="pl-3">
                <p>{address?.address ? address?.address : "Address"}</p>
              </div>
            </div>
            <div className="location">
              <div className="d-flex justify-content-between align-items-center">
                <p className="">
                  <i className="mr-2 fa fa-address-book"> </i>
                  {address?.email ? address?.email : "Email"}
                </p>
              </div>
            </div>
            <div className="location">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">
                  <i className="mr-2 fa fa-phone"> </i>{" "}
                  {address?.mobile ? address?.mobile : "Mobile"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-danger">Please add an address</p>
        )}
      </div>
    </>
  );
}
