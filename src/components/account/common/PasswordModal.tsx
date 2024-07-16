import { CUSTOMER_PASS_UPDATE } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Label, Row } from "reactstrap";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  old_pass: Yup.string().required().min(6, "Password must be at 6 char long"),
  password: Yup.string().required().min(6, "Password must be at 6 char long"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

type Props = {
  handleModal: any;
  oldData: any;
};

const PasswordModal = ({ handleModal, oldData }: Props) => {
  const initialValues = {
    old_pass: "",
    password: "",
    confirm_password: "",
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const res = await queryRequest(CUSTOMER_PASS_UPDATE, {
        email: oldData?.email,
        old_password: values?.old_pass ? values?.old_pass : undefined,
        new_password: values?.password ? values?.password : undefined,
      });
      if (res?.success && res?.status_code === 200) {
        toast.success("Password updated successfully !");
        handleModal();
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
    <>
      <section className="register-page section-b-space">
        <Container>
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
                      <Label for="password"> Previous Password</Label>
                      <input
                        {...formik.getFieldProps("old_pass")}
                        type="password"
                        id="name"
                        placeholder="Previous Password"
                        required
                        className={`form-control  ${
                          formik.touched.old_pass && formik.errors.old_pass
                            ? "error_border"
                            : ""
                        }`}
                        name="old_pass"
                        onChange={formik.handleChange}
                      />
                      <span className="error-message">
                        {formik.touched.old_pass &&
                          formik.errors.old_pass &&
                          "Previous Password is required"}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Label for="password">New Password</Label>
                      <input
                        {...formik.getFieldProps("password")}
                        type="password"
                        id="password"
                        placeholder="Password"
                        className={`form-control ${
                          formik.touched.password && formik.errors.password
                            ? "error_border"
                            : ""
                        }`}
                        name="password"
                        onChange={formik.handleChange}
                      />
                      <span className="error-message my-2">
                        {formik.touched.password &&
                          formik.errors.password &&
                          "Please enter a proper password"}
                      </span>
                    </Col>
                    <Col md="12">
                      <Label for="review">Confirm Password</Label>
                      <input
                        {...formik.getFieldProps("confirm_password")}
                        type="password"
                        id="review"
                        placeholder="Confirm your password"
                        className={`form-control ${
                          formik.touched.confirm_password &&
                          formik.errors.confirm_password
                            ? "error_border"
                            : ""
                        }`}
                        name="confirm_password"
                        onChange={formik.handleChange}
                      />
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
                      disabled={
                        formik.isSubmitting ||
                        !formik.isValid ||
                        !formik.touched ||
                        (formik.values["password"]?.length > 0 &&
                          formik.values["confirm_password"]?.length === 0)
                      }
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PasswordModal;
