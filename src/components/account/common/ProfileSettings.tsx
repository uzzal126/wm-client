import { setAuth } from "@/helpers/auth/AuthHelper";
import { UPDATE_USER_PROFILE } from "@/helpers/services/api";
import { queryRequest } from "@/helpers/services/request";
import { useFormik } from "formik";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button, Col, Container, Form, Label, Row } from "reactstrap";
import * as Yup from "yup";
import PasswordModal from "./PasswordModal";

const validationSchema = Yup.object().shape({
  name: Yup.string().optional().min(3),
});

type Props = {
  oldData: any;
};

const ProfileSettings = ({ oldData }: Props) => {
  const [modal, setModal] = useState(false);

  const initialValues = {
    name: oldData?.name ? oldData?.name : "",
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const res = await queryRequest(UPDATE_USER_PROFILE, {
        email: oldData?.email,
        name: values?.name ? values?.name : undefined,
      });
      if (res?.success && res?.status_code === 200) {
        toast.success("Account updated successfully !");
        setAuth({ ...oldData, name: values?.name ? values?.name : undefined });
      } else {
        toast.error(res?.message || "Error Occurred");
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <PasswordModal
            handleModal={() => setModal(false)}
            oldData={oldData}
          />
        </Modal.Body>
      </Modal>
      <section className="register-page section-b-space d-flex flex-column flex-lg-row w-100">
        <Container>
          <Row>
            <Col lg="6">
              <h3>Profile Settings</h3>
              <div className="theme-card">
                <Form
                  className="theme-form"
                  noValidate
                  onSubmit={formik.handleSubmit}
                >
                  <Row>
                    <Col md="12">
                      <Label for="name"> Name</Label>
                      <input
                        {...formik.getFieldProps("name")}
                        type="text"
                        id="name"
                        placeholder="Full Name"
                        required
                        className={`form-control rounded ${
                          formik.touched.name && formik.errors.name
                            ? "error_border"
                            : ""
                        }`}
                        defaultValue={oldData?.name}
                        name="name"
                        onChange={formik.handleChange}
                      />
                      <span className="error-message">
                        {formik.touched.name &&
                          formik.errors.name &&
                          "Name is required"}
                      </span>
                      <Label for="name"> Password</Label>
                      <Button
                        className="py-3 my-2 border-0 rounded-lg btn btn-outline account-pass-btn w-100"
                        color="primary"
                        onClick={() => setModal(true)}
                        style={{ textTransform: "none" }}
                      >
                        Update Password
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <div className="d-flex flex-column align-items-center">
                        <Button
                          className="py-3 border-0 rounded-lg btn btn-solid account-btn w-100"
                          variant="primary"
                          type="submit"
                          style={{ textTransform: "none" }}
                          disabled={
                            formik.isSubmitting ||
                            !formik.isValid ||
                            !formik.touched ||
                            oldData?.name === formik?.values?.name
                          }
                        >
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        {/* <Container className="mt-3 mt-lg-5">
          <div className="theme-card theme-form">
            <Label for="name">Password</Label>
          </div>
        </Container> */}
      </section>
    </>
  );
};

export default ProfileSettings;
