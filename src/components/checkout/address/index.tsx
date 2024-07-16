import { useAddress } from "@/contexts/address/AddressProvider";
import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import { TypeAddress } from "./Type";
import AddressFinder from "./location";

const phoneRegExp = /^(?:\+88|88)?(01[3-9]\d{8})$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
    mobile: Yup.string()
    .matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, 'Invalid phone number')
    .when('email', {
      is: (email: any) => !email,
      then: Yup.string().required('Phone is required when email is not provided'),
      otherwise: Yup.string(),
    }),

  email: Yup.string()
    .email('Invalid email format')
    .when('mobile', {
      is: (mobile: any) => !mobile,
      then: Yup.string().required('Email is required when phone is not provided'),
      otherwise: Yup.string()
    }),
  mobile2: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  address: Yup.string()
    .min(15, "Address must contain at least 15 characters!")
    .max(500)
    .required("Address is required"),
  address_type: Yup.string().required(),

  region_id: Yup.number().required(),
  city_id: Yup.number().required(),
  area_id: Yup.number().required(),
  zone_id: Yup.number().required(),
  region_name: Yup.string(),
  city_name: Yup.string(),
  zone_name: Yup.string(),
  area_name: Yup.string(),
  region: Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
    title: Yup.string(),
  }),
  city: Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
    title: Yup.string(),
  }),
  zone: Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
    title: Yup.string(),
  }),
  area: Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
    title: Yup.string(),
  }),
}, [['mobile', 'email']]);

const AddressComponent = ({
  onCancel,
  formValues,
  onChange,
  edit,
  index,
}: TypeAddress) => {
  const [initValues] = useState(formValues || {});
  const { store } = useAddress();

  const formik: any = useFormik({
    initialValues: initValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      if (onChange) onChange(values);
      if ((edit || !isNaN(Number(index)))) {
        store(values, index, formValues.id);
      } else {
        store(values);
      }
      onCancel(true);
    },
  });

  return (
    <div>
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
          <div className="form-group col-md-6 col-sm-6 col-xs-12">
            <div className="field-label">Email Address</div>
            <input
              placeholder={`Email`}
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
                {formik.errors.email && formik.errors.email}
              </span>
            )}
          </div>
          {/*<RegionCityArea formik={formik}/>*/}
          <div className="form-group col-sm-12 col-md-12 col-xs-12">
            <div className="field-label">Delivery Details</div>
            <AddressFinder
              label=""
              onChange={e => {
                formik.setFieldValue("area_id", e.area_id);
                formik.setFieldValue("city_id", e.city_id);
                formik.setFieldValue("zone_id", e.zone_id);
                formik.setFieldValue("region_id", e.region_id);
                formik.setFieldValue("area_name", e.area_name);
                formik.setFieldValue("city_name", e.city_name);
                formik.setFieldValue("zone_name", e.zone_name);
                formik.setFieldValue("region_name", e.region_name);

                formik.setFieldValue("region", {
                  id: e.region_id,
                  name: e.region_name,
                  title: e.region_name,
                });
                formik.setFieldValue("city", {
                  id: e.city_id,
                  name: e.city_name,
                  title: e.city_name,
                });
                formik.setFieldValue("zone", {
                  id: e.zone_id,
                  name: e.zone_name,
                  title: e.zone_name,
                });
                formik.setFieldValue("area", {
                  id: e.area_id,
                  name: e.area_name,
                  title: e.area_name,
                });
              }}
              setData={formik.values}
            />
            {(formik.errors.area_id && formik.touched.area_id) ||
            (formik.errors.area_id && formik.submitCount > 0) ? (
              <span className="error-message">
                {`Please add a valid delivery address`}
              </span>
            ) : (
              <></>
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
              placeholder="Street address (minimum 15 characters)"
            />
            {((formik.touched.address && formik.errors.address) ||
              formik.submitCount > 0) && (
              <span className="error-message">{formik.errors.address}</span>
            )}
          </div>

          <div className="form-group col-md-12 col-sm-6 col-xs-12">
            <div className="row">
              <div
                className="col-6 col-lg-4"
                onClick={() => formik.setFieldValue("address_type", "Home")}
              >
                <div
                  className="p-3 shadow d-flex flex-column position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa fa-home text-primary"
                    style={{
                      fontSize: 30,
                    }}
                  />
                  <h4 className="my-1">Home</h4>
                  {formik?.values?.address_type === "Home" && (
                    <div
                      className="top-0 p-1 mt-2 mr-2 text-center position-absolute end-0 bg-success rounded-circle"
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    >
                      <i className="text-white fa fa-check" />
                    </div>
                  )}
                </div>
              </div>
              <div
                className="col-6 col-lg-4"
                onClick={() => formik.setFieldValue("address_type", "Office")}
              >
                <div
                  className="p-3 shadow d-flex flex-column position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa fa-industry text-primary"
                    style={{
                      fontSize: 30,
                    }}
                  />
                  <h4 className="my-1">Office</h4>
                  {formik?.values?.address_type === "Office" && (
                    <div
                      className="top-0 p-1 mt-2 mr-2 text-center position-absolute end-0 bg-success rounded-circle"
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    >
                      <i className="text-white fa fa-check" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 text-end">
          <Button
            variant="success"
            disabled={formik.isSubmitting || !formik.touched}
            type="submit"
            className="rounded-sm"
          >
            {formik.isSubmitting ? (
              <span className="indicator-progress d-block">
                Please wait...
                <span className="align-middle spinner-border spinner-border-sm ms-2"></span>
              </span>
            ) : (
              <span
                className="rounded-sm indicator-label"
                style={{ textTransform: "none" }}
              >
                Save{" "}
              </span>
            )}
          </Button>
          {/* <Button
            variant="secondary"
            type="button"
            className="ml-2 rounded-sm"
            onClick={() => onCancel(false)}
          >
            Cancel
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default AddressComponent;
