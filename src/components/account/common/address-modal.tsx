import { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  Button,
  Card,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
} from "react-bootstrap";

import AddressField from "@/components/checkout/address-field/AddressField";
import { getAuth } from "@/helpers/auth/AuthHelper";
import {
  ADD_EDIT_ADDRESS,
  GET_AREA_LIST,
  GET_CITY_LIST,
  GET_REGION_LIST,
  GET_ZONE_LIST,
} from "@/helpers/services/api";
import { getQueryRequest, queryRequest } from "@/helpers/services/request";
import { useFormik } from "formik";

const phoneRegExp = /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/;

const schema = Yup.object().shape({
  city: Yup.object().required(),
  area: Yup.object().required(),
  zone: Yup.object().required(),
});

type Props = {
  user: any;
  setUser: any;
  modal: any;
  setModal: any;
  address: any;
  setAddress: any;
};

const AddressModal = ({
  user,
  setUser,
  modal,
  setModal,
  address,
  setAddress,
}: Props) => {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  const [CTR, setCTR] = useState({ country: "Bangladesh", region: "Dhaka" });
  const [newAddress, setNewAddress] = useState({
    ...address,
    address_type: address?.address_type || "Home",
  });
  const [shippingInfo, setShippingInfo] = useState({});

  let auth = getAuth();

  const formik: any = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      //console.log("formik submitted...");
    },
  });

  useEffect(() => {
    getRegionList();
  }, []);

  const getRegionList = async () => {
    const res = await getQueryRequest(GET_REGION_LIST);
    if (res?.success && res?.data?.length > 0) {
      const region = res?.data?.filter((e: any) =>
        newAddress.region_id >= 0 ? e?.id == newAddress?.region_id : e?.id === 3
      )[0];
      const res2 = await getQueryRequest(`${GET_CITY_LIST}/${region?.id}`);
      const city = res2.data?.filter(
        (e: any) => e?.id === newAddress?.city_id
      )[0];
      const res3 = await getQueryRequest(`${GET_ZONE_LIST}/${city?.id}`);
      const zone = res3.data?.filter(
        (e: any) => e?.id === newAddress?.zone_id
      )[0];
      const res4 = await getQueryRequest(`${GET_AREA_LIST}/${zone?.id}`);
      setShippingInfo({
        ...shippingInfo,
        regionList: res?.data,
        region: region?.name || region?.title || "Dhaka",
        cityList: res2?.success && Array.isArray(res2?.data) ? res2?.data : [],
        city: city?.name || city?.title,
        zoneList: res3?.success && Array.isArray(res3?.data) ? res3?.data : [],
        zone: zone?.name || zone?.title,
        areaList: res4?.success && Array.isArray(res4?.data) ? res4?.data : [],
      });
      setCTR({
        ...CTR,
        region: region?.name || region?.title || "Dhaka",
      });
    }
  };
  const onSubmit = async (data: any) => {
    if (data !== "") {
      const city = formik.values.city;
      const reg = formik.values.region;
      const area = formik.values.area;
      const zone = formik.values.zone;
      const address_details = {
        address_type: newAddress.address_type,
        street_address: newAddress?.street_address,
        city_id: city?.id || 0,
        area_id: area?.id || 0,
        region_id: reg?.id || 0,
        zone_id: zone?.id || 0,
      };
      const res = await queryRequest(ADD_EDIT_ADDRESS, {
        name: newAddress?.name,
        customer_id: auth && auth?.user_id,
        address_id: newAddress?.id,
        msisdn: newAddress?.msisdn,
        address_details,
      });
      if (res?.success) {
        setModal(false);
        updateUser({
          name: newAddress?.name,
          customer_id: auth && auth?.user_id,
          id: newAddress?.id,
          msisdn: newAddress?.msisdn,
          ...address_details,
        });
      }
    } else {
      // console.log("err");
    }
  };

  const updateUser = (newAdr: any) => {
    const list = [];
    for (let i = 0; i < user?.address_list?.length; i++) {
      const adr = user?.address_list[i];
      if (adr?.id == address?.id) {
        list.push({
          ...adr,
          ...newAdr,
        });
      } else {
        list.push(adr);
      }
    }
    if (!address?.id) {
      list.push({
        ...newAdr,
      });
    }

    setUser({
      ...user,
      address_list: list,
    });
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        // toggle={() => setModal(!modal)}
        backdrop={"static"}
        centered
        size="lg"
      >
        {/* <ModalHeader toggle={() => setModal(!modal)} className="flex-grow-1"> */}
        {/* </ModalHeader> */}
        <ModalHeader>
          <h5 className="font-weight-bolder">
            {Object.keys(address).length > 0 ? "Edit Address" : "Add Address"}
          </h5>
        </ModalHeader>
        <ModalBody className="p-3">
          <Card body>
            {/* handleSubmit(onSubmit) */}
            <Form onSubmit={e => console.log(e)}>
              <div className="row check-out">
                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                  <div className="field-label">Full Name</div>
                  <input
                    value={newAddress?.name}
                    type="text"
                    className={`form-control ${
                      formik.errors.name ? "error_border" : ""
                    }`}
                    name="name"
                    // {...register("name", { required: true })}
                    onChange={e =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                  <span className="error-message">
                    {/* {errors.name && "Name is required"} */}
                  </span>
                </div>
                <div className="form-group col-md-6 col-sm-6 col-xs-6">
                  <div className="field-label">Mobile</div>
                  <input
                    type="text"
                    name="phone"
                    // className={`form-control ${
                    //   phone ? "error_border" : ""
                    // }`}
                    // {...register("phone", {
                    //   pattern: /^(?:\+?88|0088)?01[15-9]\d{8}$/,
                    //   required: true,
                    // })}
                    value={newAddress?.msisdn}
                    onChange={e =>
                      setNewAddress({ ...newAddress, msisdn: e.target.value })
                    }
                  />
                  <span className="error-message">
                    {/* {errors.phone && "Please enter number for phone."} */}
                  </span>
                </div>
                <div className="form-group col-md-6 col-sm-6 col-xs-6">
                  <div className="field-label">Email</div>
                  <input
                    type="text"
                    name="email"
                    // className={`form-control ${
                    //   errors.email ? "error_border" : ""
                    // }`}
                    // {...register("email", {
                    //   pattern:
                    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    //   required: true,
                    // })}
                    value={newAddress?.email}
                    onChange={e =>
                      setNewAddress({ ...newAddress, email: e.target.value })
                    }
                  />
                  <span className="error-message">
                    {/* {errors.email && "Please enter a valid email."} */}
                  </span>
                </div>
                <div className="form-group col-sm-12 col-md-12 col-xs-12">
                  <div className="field-label">Delivery Details</div>
                  <AddressField
                    setData={address}
                    formik={formik}
                    onChange={null}
                  />
                  {formik.errors?.area && (
                    <span className="error-message">
                      {`Please add a valid delivery address`}
                    </span>
                  )}
                </div>
                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                  <div className="field-label">Address</div>
                  <textarea
                    //className="form-control"
                    // className={`form-control ${
                    //   errors.address ? "error_border" : ""
                    // }`}
                    // type="text"
                    // name="address"
                    // {...register("address", {
                    //   required: true,
                    //   min: 20,
                    //   max: 120,
                    // })}
                    placeholder="Street address"
                    value={newAddress?.street_address}
                    onChange={e =>
                      setNewAddress({
                        ...newAddress,
                        street_address: e.target.value,
                      })
                    }
                  />
                  <span className="error-message">
                    {/* {errors.address && "Please right your address ."} */}
                  </span>
                </div>

                <div className="form-group col-md-12 col-sm-6 col-xs-12">
                  <div className="row">
                    <div
                      className="col-6 col-lg-4"
                      onClick={() =>
                        setNewAddress({ ...newAddress, address_type: "Home" })
                      }
                    >
                      <div
                        className="shadow p-3 d-flex flex-column position-relative"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fa fa-home text-primary"
                          style={{
                            fontSize: 30,
                          }}
                        />
                        <h4>Home</h4>
                        {newAddress?.address_type === "Home" && (
                          <div
                            className="position-absolute mt-2 mr-2 end-0 top-0 p-1 text-center bg-success rounded-circle"
                            style={{
                              width: 30,
                              height: 30,
                            }}
                          >
                            <i className="fa fa-check text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-6 col-lg-4"
                      onClick={() =>
                        setNewAddress({ ...newAddress, address_type: "Office" })
                      }
                    >
                      <div
                        className="shadow p-3 d-flex flex-column position-relative"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fa fa-industry text-primary"
                          style={{
                            fontSize: 30,
                          }}
                        />
                        <h4>Office</h4>
                        {newAddress?.address_type === "Office" && (
                          <div
                            className="position-absolute mt-2 mr-2 end-0 top-0 p-1 text-center bg-success rounded-circle"
                            style={{
                              width: 30,
                              height: 30,
                            }}
                          >
                            <i className="fa fa-check text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button color="primary" type="submit" className="mr-2">
                Save
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setModal(!modal);
                  // reset({ data: "" });
                  setAddress(null);
                }}
              >
                Cancel
              </Button>
            </Form>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddressModal;
