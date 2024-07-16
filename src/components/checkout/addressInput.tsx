import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button, Card } from "reactstrap";
import * as Yup from "yup";

import { getAuth } from "@/helpers/auth/AuthHelper";
import {
  ADD_EDIT_ADDRESS,
  GET_AREA_LIST,
  GET_CITY_LIST,
  GET_REGION_LIST,
} from "@/helpers/services/api";
import { getQueryRequest, queryRequest } from "@/helpers/services/request";
import AddressField from "./address-field/AddressField";

const phoneRegExp = /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  email: Yup.string().email(),
  mobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone no. is required"),
  mobile2: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  address: Yup.string()
    .min(15, "Address might contains at least 15 characters!")
    .required("Address is required"),
  city: Yup.object().required(),
  area: Yup.object().required(),
  zone: Yup.object().required(),
  address_type: Yup.string().required(),
});

type Props = {
  address: any;
  setAddress: any;
  editIndx: any;
  shippingInfo: any;
  setShippingInfo: any;
  edit: any;
  setEdit: any;
  selectedAdr: any;
  setSelectedAdr: any;
  active: any;
  setActive: any;
  setModal: any;
};

export default function AddressInput({
  address,
  setAddress,
  editIndx,
  shippingInfo,
  setShippingInfo,
  edit,
  setEdit,
  selectedAdr,
  setSelectedAdr,
  active,
  setActive,
  setModal,
}: Props) {
  const [CTR, setCTR] = useState({ country: "Bangladesh", region: "Dhaka" });
  const [addTobeEdited, setAddTobeEdited] = useState(
    edit ? { ...address[editIndx] } : {} || {}
  );
  const user = getAuth();

  const initValues = edit ? address[editIndx] : { address_type: "Home" };

  const formik: any = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (user) {
          //console.log("user: ", user);
          if (edit) {
            const res = await queryRequest(ADD_EDIT_ADDRESS, {
              name: values?.name,
              customer_id: user && user?.id,
              address_id: values?.id,
              msisdn: values?.mobile,
              address_details: {
                address_type: "Home",
                street_address: values?.address,
                city_id: values?.city?.id || 0,
                area_id: values?.area?.id || 0,
                region_id: values?.region?.id || 0,
                zone_id: values?.zone?.id || 0,
              },
            });
            if (res?.success) {
              const list = [];
              for (let i = 0; i < address?.length; i++) {
                if (i == editIndx) {
                  list.push({
                    ...values,
                    city_id: values?.city?.id,
                    region_id: values?.region?.id,
                    area_id: values?.area?.id,
                    zone_id: values?.zone?.id,
                    city_name: values?.city?.name,
                    region_name: values?.region?.name,
                    area_name: values?.area?.name,
                    region: values?.region,
                    city: values?.city,
                    zone: values?.zone,
                    area: values?.area,
                  });
                } else {
                  list.push(address[i]);
                }
              }
              setAddress(list);
              localStorage.setItem("address_list", JSON.stringify(address));
              setActive("1");
              setEdit(false);
            }
          } else {
            const res = await queryRequest(ADD_EDIT_ADDRESS, {
              name: values?.name,
              customer_id: user && user?.id,
              address_id: values?.id || null,
              msisdn: values?.mobile,
              address_details: {
                address_type: "Home",
                street_address: values?.address,
                city_id: values?.city?.id || 0,
                area_id: values?.area?.id || 0,
                region_id: values?.region?.id || 0,
                zone_id: values?.zone?.id || 0,
              },
            });
            if (res?.success) {
              const list = [...address];
              list.push({
                ...values,
                city_id: values?.city?.id,
                region_id: values?.region?.id,
                area_id: values?.area?.id,
                zone_id: values?.zone?.id,
                city_name: values?.city?.name,
                region_name: values?.region?.name,
                area_name: values?.area?.name,
                region: values?.region,
                city: values?.city,
                zone: values?.zone,
                area: values?.area,
                id: res?.new_address_details?.id,
              });
              setAddress(list);
              localStorage.setItem("address_list", JSON.stringify(list));
              setActive("1");
              setEdit(false);
            }
          }
        } else {
          if (edit) {
            const list = [];
            for (let i = 0; i < address?.length; i++) {
              if (i == editIndx) {
                list.push({
                  ...values,
                  city_id: values?.city?.id,
                  region_id: values?.region?.id,
                  area_id: values?.area?.id,
                  zone_id: values?.zone?.id,
                  city_name: values?.city?.name,
                  region_name: values?.region?.name,
                  area_name: values?.area?.name,
                  region: values?.region,
                  city: values?.city,
                  zone: values?.zone,
                  area: values?.area,
                });
              } else {
                list.push(address[i]);
              }
            }
            setActive("1");
            setAddress([...list]);
            localStorage.setItem("address_list", JSON.stringify(list));
            setEdit(false);
          } else {
            const list = address || [];
            list.push({
              ...values,
              city_id: values?.city?.id,
              region_id: values?.region?.id,
              area_id: values?.area?.id,
              zone_id: values?.zone?.id,
              city_name: values?.city?.name,
              region_name: values?.region?.name,
              area_name: values?.area?.name,
              region: values?.region,
              city: values?.city,
              zone: values?.zone,
              area: values?.area,
            });
            setAddress([...list]);
            localStorage.setItem("address_list", JSON.stringify(list));
            setActive("1");
            setSelectedAdr(list?.length - 1 || 0);
          }
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(true);
        // cancel(true)
      }
    },
  });

  useEffect(() => {
    getRegionList();
  }, [editIndx]);
  useEffect(() => {
    setShippingInfo({
      ...shippingInfo,
      city: "",
      cityList: [],
      area: "",
      areaList: [],
    });
    const reg = shippingInfo?.regionList?.filter(
      (e: any) => e?.name == CTR?.region
    )[0];
    if (!CTR?.region) {
      return;
    }
    getCityList(reg?.id || 3);
  }, [CTR, editIndx]);
  useEffect(() => {
    setShippingInfo({ ...shippingInfo, area: "", areaList: [] });
    const city = shippingInfo?.cityList?.filter(
      (e: any) => e?.name == shippingInfo?.city
    )[0];
    if (!city) {
      return;
    }
    getAreaList(city?.id || 0);
  }, [CTR, shippingInfo?.city, editIndx]);

  const getRegionList = async () => {
    const res = await getQueryRequest(GET_REGION_LIST);
    if (res?.success && res?.region_list?.length > 0) {
      const region = res?.region_list?.filter(
        (e: any) => e?.id == addTobeEdited?.region_id
      )[0];
      setShippingInfo({
        ...shippingInfo,
        regionList: res?.region_list,
        region: region?.name,
      });
      setCTR({
        ...CTR,
        region: region?.name,
      });
      if (!formik.values?.region) {
        const dhaka = res?.region_list?.filter(
          (e: any) => e?.name == "Dhaka"
        )[0];
        if (dhaka) formik.setFieldValue("region", dhaka);
      }
    }
  };

  const getCityList = async (regionId: string | number) => {
    const res = await queryRequest(GET_CITY_LIST, { region_id: regionId });
    if (res?.success && res?.city_list?.length > 0) {
      const city = res?.city_list?.filter(
        (e: any) => e?.id == addTobeEdited?.city_id
      )[0];
      setShippingInfo({
        ...shippingInfo,
        cityList: res?.city_list,
        city: city?.name,
      });
    }
  };
  const getAreaList = async (cityId: string | number) => {
    const res = await queryRequest(GET_AREA_LIST, { city_id: cityId });
    if (res?.success && res?.area_list?.length > 0) {
      const area = res?.area_list?.filter(
        (e: any) => e?.id == addTobeEdited?.area_id
      )[0];
      setShippingInfo({
        ...shippingInfo,
        areaList: res?.area_list,
        area: area?.name,
      });
    }
  };

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   // getValues,
  //   // watch,
  //   formState: { errors },
  // } = useForm();

  const setStateFromInput = (event: any) => {
    //console.log(event.target.name, ") : ", event.target.value);
    // if(edit) {
    //   alert('cannot edit now.....');
    // } else {
    // }
    // address[event.target.name] = event.target.value;
    // //console.log(event.target.name, ': ', event.target.value)
    // setAddress(obj);
  };

  const onSubmit = async (data: any) => {
    if (data !== "") {
      const city = shippingInfo?.cityList?.filter(
        (e: any) => e?.name == shippingInfo?.city
      )[0];
      const reg = shippingInfo?.regionList?.filter(
        (e: any) => e?.name == CTR?.region
      )[0];
      const area = shippingInfo?.areaList?.filter(
        (e: any) => e?.name?.trim() == shippingInfo?.area?.trim()
      )[0];
      //console.log("shipping info: ", shippingInfo);

      if (user) {
        const address_details = {
          address_type: "Home",
          street_address: addTobeEdited?.address,
          city_id: city?.id || 0,
          area_id: area?.id || 0,
          region_id: reg?.id || 0,
        };
        const res = await queryRequest(ADD_EDIT_ADDRESS, {
          name: addTobeEdited?.full_name,
          customer_id: user && user?.id,
          address_id: addTobeEdited?.id,
          msisdn: addTobeEdited?.phone,
          address_details,
        });
        if (res?.success) {
          const list = [];
          setActive("1");
          if (address?.length > 0 && editIndx >= 0) {
            for (let i = 0; i < address?.length; i++) {
              if (i == editIndx) {
                list.push({
                  ...addTobeEdited,
                  city: shippingInfo?.city,
                  area: shippingInfo?.area,
                  region: CTR?.region,
                });
              } else {
                list.push(address[i]);
              }
            }
            setAddress(list);
            localStorage.setItem("address_list", JSON.stringify(list));
          } else {
            list.push({
              ...addTobeEdited,
              city: shippingInfo?.city,
              area: shippingInfo?.area,
              region: CTR?.region,
            });
            setAddress(list);
            localStorage.setItem("address_list", JSON.stringify(list));
          }
          setEdit(false);
        }
      } else {
        if (edit) {
          if (user) {
            const address_details = {
              address_type: "Home",
              street_address: addTobeEdited?.address,
              city_id: city?.id || 0,
              area_id: area?.id || 0,
              region_id: reg?.id || 0,
            };
            const res = await queryRequest(ADD_EDIT_ADDRESS, {
              name: addTobeEdited?.full_name,
              customer_id: user && user?.id,
              address_id: addTobeEdited?.id,
              msisdn: addTobeEdited?.phone,
              address_details,
            });
            if (res?.success) {
              const list = [];
              setActive("1");
              if (address?.length > 0 && editIndx >= 0) {
                for (let i = 0; i < address?.length; i++) {
                  if (i == editIndx) {
                    list.push({
                      ...addTobeEdited,
                      city: shippingInfo?.city,
                      area: shippingInfo?.area,
                      region: CTR?.region,
                    });
                  } else {
                    list.push(address[i]);
                  }
                }
                setAddress(list);
                localStorage.setItem("address_list", JSON.stringify(list));
              } else {
                list.push({
                  ...addTobeEdited,
                  city: shippingInfo?.city,
                  area: shippingInfo?.area,
                  region: CTR?.region,
                });
                setAddress(list);
                localStorage.setItem("address_list", JSON.stringify(list));
              }
              setEdit(false);
            }
          } else {
            const list = [];
            for (let i = 0; i < address?.length; i++) {
              if (i == editIndx) {
                list.push({
                  ...addTobeEdited,
                  city: shippingInfo?.city,
                  area: shippingInfo?.area,
                  region: CTR?.region,
                });
              } else {
                list.push(address[i]);
              }
            }
            setAddress(list);
            localStorage.setItem("address_list", JSON.stringify(list));
          }
        } else {
          const list = address || [];
          list.push({
            ...data,
            city: shippingInfo?.city,
            area: shippingInfo?.area,
            region: CTR?.region,
            city_id: city?.id || 0,
            area_id: area?.id || 0,
            region_id: reg?.id,
          });
          setAddress([...list]);
          localStorage.setItem("address_list", JSON.stringify(list));
          setActive("1");
          setSelectedAdr(list?.length - 1 || 0);
        }
      }
    } else {
      console.log("err");
    }
  };

  return (
    <Card body>
      <form onSubmit={formik.handleSubmit}>
        <div className="row check-out">
          <div className="form-group col-md-12 col-sm-12 col-xs-12">
            <div className="field-label">Full Name</div>
            <input
              placeholder="Full Name"
              {...formik.getFieldProps("name")}
              type="text"
              className={`form-control ${
                (formik.errors.name && formik.touched.name) ||
                (formik.errors.name && formik.submitCount > 0)
                  ? "error_border"
                  : ""
              }`}
              name="name"
            />
            {((formik.touched.name && formik.errors.name) ||
              formik.submitCount > 0) && (
              <span className="error-message">{formik.errors.name}</span>
            )}
          </div>
          <div className="form-group col-md-6 col-sm-6 col-xs-12">
            <div className="field-label">Mobile</div>
            <input
              type="text"
              name="mobile"
              placeholder={`Mobile`}
              {...formik.getFieldProps("mobile")}
              className={`form-control ${
                (formik.errors.mobile && formik.touched.mobile) ||
                (formik.errors.mobile && formik.submitCount > 0)
                  ? "error_border"
                  : ""
              }`}
            />
            {((formik.touched.mobile && formik.errors.mobile) ||
              formik.submitCount > 0) && (
              <span className="error-message">{formik.errors.mobile}</span>
            )}
          </div>
          {/* <div className='form-group col-md-6 col-sm-6 col-xs-12'>
                        <div className='field-label'>Phone (Optional)</div>
                        <input
                            type='text'
                            name='mobile2'
                            {...formik.getFieldProps('mobile2')}
                            className={`form-control ${formik.errors.mobile2 && formik.touched.mobile2? 'error_border' : ''
                                }`}
                        />
                        {formik.touched.mobile2 && formik.errors.mobile2 && (
                            <span className='error-message'>
                                {formik.errors.mobile2 && 'Please enter a valid phone no.'}
                            </span>
                        )}
                    </div> */}
          <div className="form-group col-md-6 col-sm-6 col-xs-12">
            <div className="field-label">Email Address</div>
            <input
              //className="form-control"
              placeholder={`email`}
              className={`form-control ${
                (formik.errors.email && formik.touched.email) ||
                (formik.errors.email && formik.submitCount > 0)
                  ? "error_border"
                  : ""
              }`}
              {...formik.getFieldProps("email")}
              type="text"
              name="email"
            />
            {((formik.touched.email && formik.errors.email) ||
              formik.submitCount > 0) && (
              <span className="error-message">
                {formik.errors.email && "Please enter proper email address ."}
              </span>
            )}
          </div>
          {/*<RegionCityArea formik={formik}/>*/}
          <div className="form-group col-sm-12 col-md-12 col-xs-12">
            <div className="field-label">Delivery Details</div>
            <AddressField
              setData={addTobeEdited}
              formik={formik}
              onChange={null}
            />
            {formik.errors.area && formik.submitCount > 0 && (
              <span className="error-message">
                {`Please add a valid delivery address`}
              </span>
            )}
          </div>

          <div className="form-group col-md-12 col-sm-12 col-xs-12">
            <div className="field-label">Address</div>
            <textarea
              //className="form-control"
              className={`form-control ${
                (formik.errors.address && formik.touched.address) ||
                (formik.errors.address && formik.submitCount > 0)
                  ? "error_border"
                  : ""
              }`}
              type="text"
              name="address"
              {...formik.getFieldProps("address")}
              placeholder="Street address"
            />
            {((formik.touched.address && formik.errors.address) ||
              formik.submitCount > 0) && (
              <span className="error-message">{formik.errors.address}</span>
            )}
          </div>

          {/* <div className='form-group col-md-12 col-sm-6 col-xs-12'>
                      <div className='field-label'>Postal Code</div>
                      <input
                        //className="form-control"
                        type='text'
                        name='pincode'
                        className={`form-control ${
                          errors.pincode ? 'error_border' : ''
                        }`}
                        {...register('pincode', { pattern: /\d+/ })}
                        value={address[editIndx]?.pincode}
                      />
                      <span className='error-message'>
                        {errors.pincode && 'Required integer'}
                      </span>
                    </div> */}
          <div className="form-group col-md-12 col-sm-6 col-xs-12">
            <div className="row">
              <div
                className="col-6 col-lg-4"
                onClick={() => formik.setFieldValue("address_type", "Home")}
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
                  {formik?.values?.address_type !== "Office" && (
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
                onClick={() => formik.setFieldValue("address_type", "Office")}
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
                  {formik?.values?.address_type === "Office" && (
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
        <div className="mt-3 text-end">
          <Button color="primary" type="submit">
            Save
          </Button>
          <Button
            color="secondary"
            className="ml-2"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
