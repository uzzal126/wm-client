import { useCart } from "@/contexts/cart/CartContext";
import { initFirebase } from "@/helpers/firebase/FirebaseApp";
import { setLocal } from "@/helpers/storage";
import {
  GoogleAuthProvider,
  getAuth as getFirebaseAuth,
  signInWithPopup,
} from "firebase/auth";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FormTextField from "../../config/formik/fields/form-field";
import { useCustomer } from "../../contexts/auth/User";
import { getAuth } from "../../helpers/auth/AuthHelper";
import { LOGIN_USER } from "../../helpers/services/api";
import { queryRequest } from "../../helpers/services/request";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is mandatory")
    .min(6, "Password must be at 6 char long"),
});

const initialData = {
  email: "",
  password: "",
};

type Props = {
  fromJob?: boolean;
  setModal?: any;
  setJobModal?: any;
};

const Login = ({
  fromJob = false,
  setModal = () => null,
  setJobModal = () => null,
}: Props) => {
  initFirebase();
  const { clearCart, bulkUpdateCart } = useCart();
  const router = useRouter();
  const firebaseAuth = getFirebaseAuth();
  const firebaseProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    const googleData = await signInWithPopup(firebaseAuth, firebaseProvider);
    console.log("google sign in", googleData);
    if (googleData) {
      try {
        const data = {
          email: googleData?.user?.email,
          loginType: "google",
        };
        const res = await queryRequest(LOGIN_USER, data);
        if (res.success && res.status_code === 200) {
          saveUser(res?.data);
          setLocal("user", res?.data);
          clearCart();
          updateCart(res?.cart_products);
          if (!fromJob) {
            router.push("/account/profile");
          }
          if (fromJob) {
            setModal();
            setTimeout(() => setJobModal(), 500);
          }
        } else {
          toast.error(res?.message);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        router.push("/account/profile");
      }
    } else {
      toast.error("Error Occurred");
    }
  };

  const { saveUser }: any = useCustomer();
  const user: any = getAuth();

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const res = await queryRequest(LOGIN_USER, values);
      if (res.success && res.status_code === 200) {
        saveUser(res?.data);
        setLocal("user", res?.data);
        clearCart();
        updateCart(res?.cart_products);
        if (!fromJob) {
          router.push("/account/profile");
        }
        if (fromJob) {
          setModal();
          setTimeout(() => setJobModal(), 500);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setSubmitting(true);
    }
  };

  const updateCart = async (items: any) => {
    const list: any = [];
    items &&
      Array.isArray(items) &&
      items.forEach(item => {
        let attr_index = 0;
        for (let i = 0; i < item.variants.length; i++) {
          if (item.variants[i].id === item.attribute_id) {
            attr_index = i;
            break;
          }
        }
        list.push({
          ...item,
          variants: {
            ...item?.variants[attr_index],
            price: {
              selling_price: item?.variants[attr_index]?.selling_price || 0,
            },
          },
          total:
            attr_index >= 0
              ? (item?.variants[attr_index]?.selling_price -
                  (item?.discount?.amount || 0)) *
                item?.qty
              : (item?.price?.max - (item?.discount?.amount || 0)) * item?.qty,
        });
      });
    bulkUpdateCart(list);
  };

  return (
    <>
      <section className="login-page section-b-space" data-aos="fade-down">
        <Container>
          <Row>
            <Col lg={!fromJob ? "6" : "12"}>
              <h3>Login</h3>
              <div className="theme-card">
                <Formik
                  validationSchema={formSchema}
                  onSubmit={onSubmit}
                  initialValues={initialData}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    isValid,
                    isSubmitting,
                    setFieldValue,
                    touched,
                  }) => (
                    <Form
                      className="theme-form"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-3">
                        <FormTextField
                          controlId="email"
                          label="Email"
                          type="email"
                          name="email"
                          className={"mb-0"}
                          required
                        />
                        <span className="error-message">
                          {errors?.email?.toString()}
                        </span>
                      </div>
                      <div className="mb-3">
                        <FormTextField
                          controlId="password"
                          label="Password"
                          type="password"
                          className={"mb-0"}
                          name="password"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <Button
                          className="btn btn-solid"
                          color="primary"
                          disabled={isSubmitting || !isValid || !touched}
                          type="submit"
                        >
                          {isSubmitting ? (
                            <span className="indicator-progress d-block">
                              Please wait...
                              <span className="align-middle spinner-border spinner-border-sm ms-2"></span>
                            </span>
                          ) : (
                            <span className="indicator-label">Log in</span>
                          )}
                        </Button>
                        <Link
                          href={"/account/forgot-password"}
                          className="ml-3"
                        >
                          Forgot Password
                        </Link>
                      </div>
                      <div className="footer-social">
                        {/* <ul>
                          <li>
                            <a
                              onClick={handleGoogleSignIn}
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className="fa-brands fa-google"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
            <Col
              lg={!fromJob ? "6" : "12"}
              className={`right-login ${fromJob ? "mt-4" : "mt-0"}`}
            >
              <h3 className="my-2 mb-lg-2">New Customer</h3>
              <div className="theme-card authentication-right">
                <Link href="/auth/register">
                  <h6 className="title-font">Create A Account</h6>
                </Link>
                <p>
                  Sign up for a free account at our store. Registration is quick
                  and easy. It allows you to be able to order from our shop. To
                  start shopping click register.
                </p>
                <Link href="/auth/register">
                  <h6 className="title-font btn btn-solid">Create A Account</h6>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
