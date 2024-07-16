import { PASSWORD_RESET } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Label, Row } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(6, "Password must be at 6 char long"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

type Props = {
  token: any;
};

const PasswordReset = ({ token }: Props) => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const res = await queryRequest(PASSWORD_RESET, {
        email_secrete: token,
        new_password: values?.password,
      });
      if (res?.success && res?.status_code === 200) {
        toast.success("Password updated successfully !");
        router.push("/auth/login");
      } else {
        toast.error(res?.message || "Error Occurred");
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setSubmitting(true);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div style={{ maxWidth: "400px" }}>
      <section className="register-page section-b-space d-flex flex-column align-items-center">
        <Container>
          {formik.isSubmitting && (
            <div className="d-flex align-items-center flex-column">
              <Spinner
                animation="border"
                variant="primary"
                // color="var(--theme-deafult)"
                style={{ width: 50, height: 50 }}
              />
              <Label className="py-2">Please wait ...</Label>
            </div>
          )}
          {!formik.isSubmitting && (
            <>
              <h3>Reset Password</h3>
              <Row>
                <Col lg="12">
                  <div className="theme-card">
                    <Form
                      className="theme-form"
                      noValidate
                      onSubmit={formik.handleSubmit}
                    >
                      <Row>
                        <Col md="12">
                          <Label for="password">New Password</Label>
                          <div className="mb-3 input-group">
                            <input
                              {...formik.getFieldProps("password")}
                              type={showPass ? "text" : "password"}
                              id="password"
                              placeholder="Password"
                              className={`form-control mb-0 ${
                                formik.touched.password &&
                                formik.errors.password
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
                              "Please enter a proper password"}
                          </span>
                        </Col>
                        <Col md="12">
                          <Label for="Confirm Password">Confirm Password</Label>
                          <div className="mb-3 input-group">
                            <input
                              {...formik.getFieldProps("confirm_password")}
                              type={showConfirmPass ? "text" : "password"}
                              id="confirm_pass"
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
                                onClick={() =>
                                  setShowConfirmPass(!showConfirmPass)
                                }
                              ></i>
                            </span>
                          </div>
                          <span className="error-message">
                            {formik.touched.confirm_password &&
                              formik.errors.confirm_password &&
                              "Passwords did not match ."}
                          </span>
                        </Col>
                      </Row>
                      <div className="d-flex flex-column align-items-center">
                        <Button
                          className="btn btn-solid"
                          color="primary"
                          type="submit"
                          style={{ width: "200px" }}
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid ||
                            !formik.touched ||
                            (formik.values["password"]?.length > 0 &&
                              formik.values["confirm_password"]?.length === 0)
                          }
                        >
                          Reset
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </div>
  );
};

export default PasswordReset;
