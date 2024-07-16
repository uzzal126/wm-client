import { FORGOT_PASS_EMAIL } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useFormik } from "formik";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Label, Row } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
});

type Props = {
  oldData?: any;
};

const ForgotPassword = ({ oldData }: Props) => {
  const initialValues = {
    email: "",
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const res = await queryRequest(FORGOT_PASS_EMAIL, {
        email: values?.email,
      });
      if (res?.success && res?.status_code === 200) {
        toast.success("Password Reset Link Sent To Your Email");
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
    <div style={{ minWidth: "400px" }}>
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
                          <Label for="email">Email</Label>
                          <input
                            {...formik.getFieldProps("password")}
                            type="email"
                            id="email"
                            placeholder="user@webmanza.com"
                            className={`form-control ${
                              formik.touched.email && formik.errors.email
                                ? "error_border"
                                : ""
                            }`}
                            name="email"
                            onChange={formik.handleChange}
                          />
                          <span className="error-message my-2">
                            {formik.touched.email &&
                              formik.errors.email &&
                              "Please enter a proper email"}
                          </span>
                        </Col>
                      </Row>
                      <div className="d-flex flex-column align-items-center">
                        <Button
                          className="btn btn-solid"
                          color="primary"
                          type="submit"
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid ||
                            !formik.touched
                          }
                        >
                          Send Reset Link
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

export default ForgotPassword;
