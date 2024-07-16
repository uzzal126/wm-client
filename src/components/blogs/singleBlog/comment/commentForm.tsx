"use client";
import { getAuth } from "@/helpers/auth/AuthHelper";
import { usePostCommentMutation } from "@/redux-handler/api/slices/blogSlice";
import { useFormik } from "formik";
import { Col, Form, FormControl, FormLabel, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schema = Yup.object().shape({
  post_id: Yup.number().required("Id is required"),
  commenter_name: Yup.string()
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  commenter_email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  comment_text: Yup.string()
    .min(5, "Minimum 5 symbols")
    .required("Please write your comment"),
});

const CommentForm = ({
  postId,
  commentId,
}: {
  postId: number;
  commentId?: number;
}) => {
  const [postComment] = usePostCommentMutation();
  const currentUser = getAuth();
  const initialValues = {
    post_id: 0,
    parent_comment_id: 0,
    customer_id: 0,
    commenter_name: currentUser?.name || "",
    commenter_email: currentUser?.email || "",
    comment_text: "",
    emoji: "",
    image_url: "",
  };
  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      try {
        if (postId) {
          const post = {
            commenter_name:
              currentUser?.name || values?.commenter_name || "Anonymous",
            commenter_email:
              currentUser?.email || values?.commenter_email || "",
            comment_text: values?.comment_text,
            post_id: postId,
            parent_comment_id: commentId || 0,
          };
          const res = await postComment(post).unwrap();
          if (res.success && res?.status_code === 200) {
            toast.success(res.message);
            resetForm();
          }
        }
      } catch (error: any) {
        console.log(
          "🚀 ~ file: commentForm.tsx:44 ~ onSubmit: ~ error:",
          error
        );
      }
    },
  });

  return (
    <Row className="mb-5 blog-contact">
      <Col sm="12">
        <h3 className="my-2">Leave Your Comment</h3>
        <Form className="theme-form" onSubmit={formik.handleSubmit} noValidate>
          <Row>
            {!currentUser?.name && (
              <Col md="12" className="mb-3">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl
                  {...formik.getFieldProps("commenter_name")}
                  type="text"
                  className="mb-0 form-control"
                  id="commenter_name"
                  name="commenter_name"
                  placeholder="Enter Your name"
                  required
                  isValid={
                    formik.touched.commenter_name &&
                    !formik.errors.commenter_name
                  }
                />
                {formik.touched.commenter_name &&
                  formik.errors.commenter_name && (
                    <p className="mb-0 text-danger">
                      {formik.errors.commenter_name}
                    </p>
                  )}
              </Col>
            )}
            {!currentUser?.email && (
              <Col md="12" className="mb-3">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl
                  {...formik.getFieldProps("commenter_email")}
                  type="email"
                  className="mb-0 form-control"
                  id="commenter_email"
                  name="commenter_email"
                  placeholder="Email"
                />
                {formik.touched.commenter_email &&
                  formik.errors.commenter_email && (
                    <p className="mb-0 text-danger">
                      {formik.errors.commenter_email}
                    </p>
                  )}
              </Col>
            )}
            <Col md="12" className="mb-3">
              <FormLabel htmlFor="comment_text">Comment</FormLabel>
              <textarea
                {...formik.getFieldProps("comment_text")}
                className="mb-0 form-control"
                placeholder="Write Your Comment"
                id="comment_text"
                name="comment_text"
              />
              {formik.touched.comment_text && formik.errors.comment_text && (
                <p className="mb-0 text-danger">{formik.errors.comment_text}</p>
              )}
            </Col>
            <Col md="12">
              <button
                className="btn btn-solid"
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? (
                  <>Comment Submitting...</>
                ) : (
                  <>Post Comment</>
                )}
              </button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default CommentForm;
