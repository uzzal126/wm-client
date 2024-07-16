import { useCart } from "@/contexts/cart/CartContext";
import { setLocal } from "@/helpers/storage";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Label, Row } from "reactstrap";
import * as Yup from "yup";
import { REGISTER_USER } from "../../helpers/services/api";
import { queryRequest } from "../../helpers/services/request";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3),
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is mendatory")
    .min(6, "Password must be at 6 char long"),
  confirm_password: Yup.string()
    .required("Password is mendatory")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const router = useRouter();
  const { bulkUpdateCart } = useCart();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const res = await queryRequest(REGISTER_USER, values);
      if (res.success && res.status_code === 200) {
        toast.success("Account created successfully", {
          position: "top-right",
        });
        let user = {
          id: res?.user_id,
          name: values.name,
          email: values.email,
        };
        setLocal("user", user);
        router.push("/");
        bulkUpdateCart([]);
        router.push("/");
      } else {
        toast.error(res?.message || "Error Occurred", {
          position: "top-right",
        });
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setSubmitting(true);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <section className="register-page section-b-space">
        <Container>
          <Row>
            <Col lg="12">
              <h3>create account</h3>
              <div className="theme-card">
                <Form
                  className="theme-form"
                  noValidate
                  onSubmit={formik.handleSubmit}
                >
                  <Row>
                    <Col md="6">
                      <Label for="name"> Name</Label>
                      <input
                        {...formik.getFieldProps("name")}
                        type="text"
                        id="name"
                        placeholder="Full Name"
                        required
                        className={`form-control ${
                          formik.touched.name && formik.errors.name
                            ? "error_border"
                            : ""
                        }`}
                        name="name"
                        onChange={formik.handleChange}
                      />
                      <span className="error-message">
                        {formik.touched.name &&
                          formik.errors.name &&
                          "Name is required"}
                      </span>
                    </Col>
                    <Col md="6">
                      <Label for="Email">Email</Label>
                      <input
                        {...formik.getFieldProps("email")}
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        className={`form-control ${
                          formik.touched.email && formik.errors.email
                            ? "error_border"
                            : ""
                        }`}
                        name="email"
                        onChange={formik.handleChange}
                      />
                      <span className="error-message">
                        {formik.touched.email &&
                          formik.errors.email &&
                          "Please enter a proper email address"}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Label for="password">Password</Label>
                      <div className="d-flex">
                        <input
                          {...formik.getFieldProps("password")}
                          type={showPass ? "text" : "password"}
                          id="password"
                          placeholder="Password"
                          className={`form-control mb-0 ${
                            formik.touched.password && formik.errors.password
                              ? "error_border"
                              : ""
                          }`}
                          name="password"
                          onChange={formik.handleChange}
                        />
                        <span
                          className="py-1 input-group-text"
                          id="basic-addon1"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`fa ${
                              showPass ? "fa-eye-slash" : "fa-eye"
                            }`}
                            onClick={() => setShowPass(!showPass)}
                          ></i>
                        </span>
                      </div>
                      <span className="my-2 error-message">
                        {formik.touched.password &&
                          formik.errors.password &&
                          "Please enter proper password"}
                      </span>
                    </Col>
                    <Col md="6">
                      <Label for="review">Confirm Password</Label>
                      <div className="d-flex">
                        <input
                          {...formik.getFieldProps("confirm_password")}
                          type={showConfirmPass ? "text" : "password"}
                          id="review"
                          placeholder="Confirm your password"
                          className={`form-control mb-0 ${
                            formik.touched.confirm_password &&
                            formik.errors.confirm_password
                              ? "error_border"
                              : ""
                          }`}
                          name="confirm_password"
                          onChange={formik.handleChange}
                        />
                        <span
                          className="input-group-text"
                          id="basic-addon1"
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`fa ${
                              showConfirmPass ? "fa-eye-slash" : "fa-eye"
                            }`}
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                          ></i>
                        </span>
                      </div>
                      <span className="error-message">
                        {formik.touched.confirm_password &&
                          formik.errors.confirm_password &&
                          "Passwords did not match ."}
                      </span>
                    </Col>
                    <Button
                      className="my-3 ml-0 btn btn-solid ml-lg-3"
                      color="primary"
                      type="submit"
                      disabled={
                        formik.isSubmitting ||
                        !formik.isValid ||
                        !formik.touched
                      }
                    >
                      create account
                    </Button>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
