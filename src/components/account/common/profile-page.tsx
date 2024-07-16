"use client";
import { useFetchAccountDetailsMutation } from "@/redux-handler/api/slices/profileSlice";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import AddressModal from "@/components/checkout/address/addressModal";
import { useAddress } from "@/contexts/address/AddressProvider";
import { getAuth, setAuth } from "@/helpers/auth/AuthHelper";
import { UPDATE_USER_PROFILE } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import FileUploadHandler from "./FileUploadHandler";
import ProfileSettings from "./ProfileSettings";
import Orders from "./orders";
import WishList from "./wishlist";

type Props = {
  showOrders?: boolean;
  showWishList?: boolean;
  showProfileSettings?: boolean;
  oldData?: any;
};

export default function ProfilePage({
  showOrders = true,
  showWishList = true,
  showProfileSettings = false,
  oldData = {},
}: Props) {
  const { addresses, remove, setAddresses } = useAddress();
  const router = useRouter();
  const fileUploadRef = useRef<any>();
  let auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);

  let customer = getAuth();
  const queryParams = useSearchParams();
  const tab: any = queryParams.get("tab");

  const [fetchAccDetails, { isLoading: isAccDetailsLoading }] =
    useFetchAccountDetailsMutation();

  // const router = useRouter();
  // const { tab }: any = router?.query;

  useEffect(() => {
    getDetails();
  }, [tab]);

  const getDetails = async () => {
    const res: any = await fetchAccDetails(customer?.id);
    if (res?.data?.success) {
      setLoading(isAccDetailsLoading);
      setUser(res?.data);
      setAddresses({ list: res?.data?.address_list, email: res?.data?.email });
    }
  };
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

  const handleProfilePicUpdate = async (url = attachmentUrl) => {
    setUser({ ...auth, profile: url });
    try {
      const res = await queryRequest(UPDATE_USER_PROFILE, {
        profile: url,
        customer_id: customer?.id,
      });
      if (res?.success && res?.status_code === 200) {
        toast.success("Account updated successfully !", {
          position: "top-right",
        });
        setUser({ ...auth, profile: url });
        setAuth({ ...auth, profile: url });
        return;
      } else {
        return toast.error(res?.message || "Error Occurred", {
          position: "top-right",
        });
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  if (!user) return <h5 style={{ textAlign: "center" }}>No user found!</h5>;

  if (isAccDetailsLoading) {
    return (
      <div className="py-5 d-flex justify-content-center align-items-center">
        <Spinner
          animation="border"
          variant="primary"
          // color="var(--theme-deafult)"
          style={{
            width: 50,
            height: 50,
            color: "var(--theme-deafult)",
          }}
        />
      </div>
    );
  }

  return loading ? (
    <div className="loader-wrapper">
      <div className="pre-loader"></div>
    </div>
  ) : (
    <>
      <section className="contact-page register-page">
        <Container>
          <Row>
            <Col sm="4">
              <Card
                style={{ background: "#f9fafb" }}
                className="px-2 border-0 rounded"
              >
                <Card.Body>
                  <div className="text-center">
                    <div
                      className="my-2"
                      style={{
                        maxWidth: "50px",
                        height: "50px",
                        cursor: "pointer",
                        fontSize: "1rem",
                        marginLeft: "auto",
                        marginRight: "20px",
                      }}
                    >
                      <FileUploadHandler
                        ref={fileUploadRef}
                        field="profile"
                        title=""
                        setAttachmentUrl={setAttachmentUrl}
                        setSelectedFile={setSelectedFile}
                        postFunc={handleProfilePicUpdate}
                        acceptedFileTypes="image"
                        toastMessage="Profile Picture Uploaded"
                        placeHolder={`<i class="fa fa-pencil mb-4 pointer"/>`}
                        hideToast={true}
                      />
                    </div>
                    <div>
                      <Image
                        className="rounded-circle"
                        src={user?.profile}
                        rounded
                        width={200}
                        height={200}
                        style={{ cursor: "pointer" }}
                        onClick={() => fileUploadRef?.current?.click()}
                      />
                    </div>
                    <h4 className="mt-2">{user?.name}</h4>
                    <h6>{user?.email}</h6>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 font-weight-bolder">Address Book</h5>
                    <AddressModal onChange={(e: any) => {}} />
                  </div>
                  <div className="mt-2">
                    <ListGroup>
                      {addresses &&
                        addresses.length > 0 &&
                        addresses?.map((item: any, indx: any) => (
                          <ListGroupItem
                            style={{ border: "1px solid #e0e0e0" }}
                            className="px-1 my-1 rounded-sm d-flex justify-content-between align-items-center"
                            key={indx}
                          >
                            <div className="pl-2 d-flex flex-grow-1 flex-column">
                              <h5>{item.name || item.title}</h5>
                              <div className="d-flex align-items-center">
                                <div className="mr-2">
                                  {item?.address_type?.toLowerCase() ===
                                  "home" ? (
                                    <Button
                                      variant="success"
                                      size="sm"
                                      className="border-0 rounded"
                                    >
                                      <i className="px-1 py-1 fa fa-home" />
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="warning"
                                      size="sm"
                                      className="border-0 rounded-lg"
                                    >
                                      <i className="px-1 py-1 fa fa-briefcase " />
                                    </Button>
                                  )}
                                </div>
                                <div className="font-weight-bolder">
                                  {item?.address || item?.street_address}
                                </div>
                              </div>
                            </div>
                            <div className="px-2 d-flex justify-content-between align-items-center">
                              <AddressModal
                                data={item}
                                onChange={(e: any) => {}}
                                index={indx}
                                edit
                                editStyle={"address-edit rounded-lg mx-1"}
                              />
                              <button
                                className="border-0 rounded btn btn-danger wishlist-delete"
                                onClick={() => handleDeleteAddress(indx)}
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </div>
                          </ListGroupItem>
                        ))}
                    </ListGroup>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="8">
              <Tabs
                defaultActiveKey={
                  tab === "wishlist"
                    ? "wishlist"
                    : showProfileSettings
                    ? "settings"
                    : "order"
                }
                id="profile"
                className="mb-3"
                key={tab}
                onClick={() => {
                  router.replace("/account/profile", undefined, {
                    shallow: true,
                  });
                }}
                // activeKey={tab}
              >
                {showOrders && (
                  <Tab eventKey="order" title="Orders" id="wishlist-tab">
                    <Row>
                      <Orders />
                    </Row>
                  </Tab>
                )}
                {showWishList && (
                  <Tab eventKey="wishlist" title="Wishlist" id="wishlist-tab">
                    <WishList />
                  </Tab>
                )}
                {showProfileSettings && (
                  <Tab eventKey="settings" title="Settings" id="wishlist-tab">
                    <Row>
                      <ProfileSettings oldData={oldData} />
                    </Row>
                  </Tab>
                )}
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <AddressAddEditModal /> */}
    </>
  );
}

// export default ProfilePage;
