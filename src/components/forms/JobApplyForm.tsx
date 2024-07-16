import { getFileExtension } from "@/helpers/misc";
import { getLocal } from "@/helpers/storage";
import {
  useApplyForJobMutation,
  useUploadAttachmentMutation,
} from "@/redux-handler/api/slices/jobsSlice";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FilePond, registerPlugin } from "react-filepond";
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";
import * as Yup from "yup";
// // Import the plugin code
import { useDeleteFileMutation } from "@/redux-handler/api/slices/fileSlice";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// Register the plugin
registerPlugin(FilePondPluginFileValidateType);

const phoneRegExp = /(^(01){1}[3456789]{1}(\d){8})$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone no. is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  address: Yup.string().required("Address is required"),
  expectedSalary: Yup.string().optional(),
  experience: Yup.number().required("Experience is required"),
  extraNote: Yup.string().optional(),
  attachment: Yup.string().required("Attachment is required"),
});

type Props = {
  data: any;
  setModal: () => any;
};

function JobApplyForm({ data, setModal = () => null }: Props) {
  const initialValues = {
    name: "",
    email: "",
    dateOfBirth: "",
    address: "",
    expectedSalary: "",
    phone: "",
    experience: "",
    extraNote: "",
    attachment: "",
  };
  const [deleteFile, { isLoading: isDelLoading }] = useDeleteFileMutation();
  const [postJobApplication, { isLoading: isJobApplicationLoading }] =
    useApplyForJobMutation();
  const [uploadAttachment, { isLoading: isUploadAttachmentLoading }] =
    useUploadAttachmentMutation();
  const user = getLocal("user");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    const body: any = {
      post_id: data?.id,
      customer_id: user?.id || 0,
      applicant_name: values?.name,
      applicant_email: values?.email,
      applicant_dob: values?.dateOfBirth,
      experience: values?.experience,
      applicant_address: values?.address,
      expected_salary: values?.expectedSalary,
      extra_note: values?.extraNote,
      msisdn: `+88${values?.phone}`,
      country_code: "BD",
      attachment: [
        {
          type: getFileExtension(selectedFile?.name) || "pdf",
          src: attachmentUrl || "https://webmanza.com/sample.pdf",
        },
      ],
    };
    postJobApplication(body)?.then((res: any) => {
      if (res?.data?.status_code === 200) {
        return toast.success("Job application posted", {
          position: "top-right",
        });
      }
      if (res?.error?.data?.status_code === 409) {
        return toast.error(res?.error?.data?.message, {
          position: "top-right",
        });
      }
      if (res?.error?.data?.status_code === 400) {
        return toast.error(res?.error?.data?.errors[0], {
          position: "top-right",
        });
      } else {
        toast.error(res?.error?.data?.message, {
          position: "top-right",
        });
      }
    });
  };

  const handleAttachmentUpload = async (file: any) => {
    let formData = new FormData();
    formData.append("image", file);
    formData.append("field_name", `career`);

    console.log("formData", formData);

    uploadAttachment(formData)?.then((res: any) => {
      if (res?.data?.status_code === 200) {
        console.log("res", res);
        toast.success("Attachment uploaded !", {
          position: "top-right",
        });
        setAttachmentUrl(
          res?.data?.uploaded_files && res?.data?.uploaded_files?.length > 0
            ? res?.data?.uploaded_files[0]
            : ""
        );
        setSelectedFile(file);
        formik?.setFieldValue(
          "attachment",
          res?.data?.uploaded_files && res?.data?.uploaded_files?.length > 0
            ? res?.data?.uploaded_files[0]
            : ""
        );
        return;
      } else {
        toast.error(
          res?.error?.data?.message ||
            res?.data?.data?.message ||
            "Upload failure",
          {
            position: "top-right",
          }
        );
        setSelectedFile(null);
        setAttachmentUrl("");
      }
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <div className="px-5 py-5 d-flex flex-column align-items-center">
      <Form
        className="theme-form row"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className={`mb-3 col-12 col-lg-6`}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...formik.getFieldProps("name")}
            type={"text"}
            placeholder={"Mr. Jhon"}
            className={`form-control mb-0 ${
              formik.touched.name && formik.errors.name ? "error_border" : ""
            }`}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="error-message">{formik.errors.name}</span>
          )}
        </Form.Group>
        <Form.Group className={`mb-3 col-12 col-lg-6`}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...formik.getFieldProps("email")}
            type={"text"}
            placeholder={"jhon@gmail.com"}
            className={`form-control mb-0 ${
              formik.touched.email && formik.errors.email ? "error_border" : ""
            }`}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="error-message">{formik.errors.email}</span>
          )}
        </Form.Group>

        <Form.Group className={`mb-3 col-12 col-lg-6`}>
          <Form.Label>Phone</Form.Label>
          <div className="d-flex">
            <span className="rounded-0 input-group-text">+88</span>
            <Form.Control
              {...formik.getFieldProps("phone")}
              type={"text"}
              placeholder={"01XXXXXXXX"}
              className={`form-control mb-0 ${
                formik.touched.phone && formik.errors.phone
                  ? "error_border"
                  : ""
              }`}
              onChange={formik.handleChange}
            ></Form.Control>
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <span className="error-message">{formik.errors.phone}</span>
          )}
        </Form.Group>
        <Form.Group className={`mb-3 col-12 col-lg-6`}>
          <Form.Label>Experience (years)</Form.Label>
          <Form.Control
            {...formik.getFieldProps("experience")}
            type={"number"}
            placeholder={"5"}
            className={`form-control mb-0 ${
              formik.touched.experience && formik.errors.experience
                ? "error_border"
                : ""
            }`}
            onChange={formik.handleChange}
          />
          {formik.touched.experience && formik.errors.experience && (
            <span className="error-message">{formik.errors.experience}</span>
          )}
        </Form.Group>
        <Form.Group className={`mb-3 col-12 col-lg-6`}>
          <Form.Label>Date of Birth</Form.Label>
          <Flatpickr
            {...formik.getFieldProps("dateOfBirth")}
            placeholder="Select Date of Birth"
            options={{
              maxDate: new Date(),
              monthSelectorType: "dropdown",
              static: true,
            }}
            style={{ background: "#ffffff" }}
            className={`form-control mb-0 ${
              formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? "error_border"
                : ""
            }`}
            onChange={e =>
              formik.setFieldValue(
                "dateOfBirth",
                moment(e[0])?.format("YYYY-MM-DD")
              )
            }
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <span className="error-message">{formik.errors.dateOfBirth}</span>
          )}
        </Form.Group>
        <Form.Group className={`mb-3 col-12 col-lg-6`}>
          <Form.Label>Expected Salary(BDT)</Form.Label>
          <Form.Control
            {...formik.getFieldProps("expectedSalary")}
            type={"text"}
            placeholder={"50,000"}
            className={`form-control mb-0 ${
              formik.touched.expectedSalary && formik.errors.expectedSalary
                ? "error_border"
                : ""
            }`}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className={`mb-3 col-12 col-lg-12`}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            {...formik.getFieldProps("address")}
            as="textarea"
            placeholder={"123 Hopkins Street"}
            onChange={formik.handleChange}
            className={`form-control ${
              formik?.touched?.address && formik.errors?.address
                ? "error_border"
                : ""
            }`}
          />
          {formik.touched.address && formik.errors.address && (
            <span className="error-message">{formik.errors.address}</span>
          )}
        </Form.Group>
        <Form.Group className={`mb-3 col-12 col-lg-12`}>
          <Form.Label>Message to the hiring manager</Form.Label>
          <Form.Control
            {...formik.getFieldProps("extraNote")}
            as="textarea"
            placeholder={""}
            onChange={formik.handleChange}
            className={`form-control ${
              formik?.touched?.extraNote && formik.errors?.extraNote
                ? "error_border"
                : ""
            }`}
          />
        </Form.Group>

        <div
          className={`d-${
            attachmentUrl ? "flex" : "none"
          } align-items-center flex-row justify-content-center col-12 my-2 py-3 rounded-sm`}
          style={{ background: "#e9ecef" }}
        >
          <span>Attachment: </span>
          <span
            style={{
              cursor: "pointer",
              color: "#007ded",
              textDecoration: "underline",
            }}
          >
            <i className="mx-2 fa fa-file" style={{ fontSize: 20 }}></i>
            {selectedFile?.name?.length > 6 ? (
              <span>{`${selectedFile?.name?.slice(0, 6)}... .${getFileExtension(
                selectedFile?.name || ""
              )}`}</span>
            ) : (
              <span>{`${selectedFile?.name}`}</span>
            )}
          </span>
          <Button
            variant="danger"
            size="sm"
            className="ml-auto rounded"
            onClick={() => {
              deleteFile({
                file_url: attachmentUrl,
              }).then((res: any) => {
                if (res?.data?.status_code === 200) {
                  return toast.warning("Attachment deleted", {
                    position: "top-right",
                  });
                }
              });
              setSelectedFile(null);
              setAttachmentUrl("");
            }}
          >
            <i className="fa fa-trash" />
          </Button>
        </div>
        <Form.Group
          className={`mb-3 col-12 col-lg-12 d-${
            attachmentUrl ? "none" : "block"
          }`}
        >
          <Form.Label>Upload CV</Form.Label>
          <FilePond
            files={[]}
            onupdatefiles={e => {
              console.log(e);
              // setAttachmentUrl(e);
            }}
            allowMultiple={false}
            maxFiles={1}
            acceptedFileTypes={[
              "image/png",
              "image/jpeg",
              "image/tiff",
              "image/jpg",
              "application/pdf",
              ".docx",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
            credits={false}
            server={{
              process: (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort,
                transfer,
                options
              ) => {
                const formData = new FormData();
                formData.append(fieldName, file, file.name);
                handleAttachmentUpload(file);
              },
            }}
            name="files" /* sets the file input name, it's filepond by default */
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
          {formik.touched.attachment && formik.errors.attachment && (
            <span className="error-message">{formik.errors.attachment}</span>
          )}
        </Form.Group>
        <div className="flex-row d-flex w-100">
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={
              isJobApplicationLoading ||
              formik?.isSubmitting ||
              isUploadAttachmentLoading ||
              isDelLoading
            }
            style={{ background: "#39b54a", border: "none" }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default JobApplyForm;
