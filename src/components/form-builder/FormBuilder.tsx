import {
  genLabelValuePair,
  generateInitialValues,
  generateSchema,
} from "@/helpers/misc";
import {
  usePostFormDataMutation,
  useUploadFormAttachmentMutation,
} from "@/redux-handler/api/slices/formSlice";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FilePond } from "react-filepond";
import { toast } from "react-toastify";

function FormBuilder({ data }: any) {
  const emailData: any = data?.setting?.header || data?.body?.header;
  const [initialValues, setInitialValues] = useState<any>({});
  const [schema, setSchema] = useState<any>({});
  const [attachmentUrl, setAttachmentUrl] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const router = useRouter();
  const { prod_id, name, dynamicPage } = router.query;
  const [uploadAttachment, { isLoading: isUploadAttachmentLoading }] =
    useUploadFormAttachmentMutation();
  const [postFormData, { isLoading: isFormSubmissionLoading }] =
    usePostFormDataMutation();
  useEffect(() => {
    if (dynamicPage && dynamicPage === "request-for-quotation") {
      if (!prod_id || !name) {
        router.push("/not-found");
      }
    }
  }, [dynamicPage, prod_id, name]);
  type fieldType = {
    label?: string;
    type: "text" | "textarea" | "select" | "checkbox" | "upload";
    inputType:
      | "name"
      | "text"
      | "phone"
      | "email"
      | "password"
      | "input"
      | "number";
    selectOptions?: string[];
    defaultValue?: any;
    placeHolder?: string;
    required?: boolean;
    col?: "12" | "6" | "4";
  };

  useEffect(() => {
    setSchema(generateSchema(data?.list));
    setInitialValues(generateInitialValues(data?.list));
  }, [data]);

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    const labelValuePair = genLabelValuePair(values, data?.list);
    const fieldArr = name
      ? [
          {
            label: "Product Name",
            value: name,
          },
          ...labelValuePair,
        ]
      : [...labelValuePair];
    const body: any = {
      data: {
        prod_id: prod_id || undefined,
        name: name || undefined,
        fields: fieldArr,
      },
      header: {
        subject: prod_id ? "Request for quotation" : "New form submission",
        to: emailData?.to,
        cc: emailData?.cc,
        bcc: emailData?.bcc,
      },
    };
    postFormData(body)?.then((res: any) => {
      if (res?.data?.status_code === 200) {
        resetForm();
        return toast.success("Your request has been submitted", {
          position: "top-right",
        });
      }
      if (res?.error?.data?.status_code === 409) {
        return toast.error(res?.error?.data?.message, {
          position: "top-right",
        });
      }
      if (res?.error?.data?.status_code === 400) {
        return toast.error(res?.error?.data?.errors[0] || "Error Occurred", {
          position: "top-right",
        });
      } else {
        return toast.error(res?.error?.data?.message || "Error Occurred", {
          position: "top-right",
        });
      }
    });
  };

  const handleAttachmentUpload = async (file: any) => {
    let formData = new FormData();
    formData.append("image", file);
    formData.append("field_name", `career`);

    uploadAttachment(formData)?.then((res: any) => {
      if (res?.data?.status_code === 200) {
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
    enableReinitialize: true,
    initialValues,
    validationSchema: schema,
    onSubmit,
  });
  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      {dynamicPage === "request-for-quotation" && prod_id && name && (
        <>
          <h3>Quotation for : {name}</h3>
        </>
      )}
      {schema && initialValues && (
        <Form
          className="theme-form row"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          {data?.list &&
            data?.list?.map((item: fieldType, index: number) => {
              if (item?.type === "text") {
                return (
                  <Form.Group
                    className={`mb-3 col-12 col-lg-${item?.col || 12}`}
                    key={item?.label || index}
                  >
                    {item?.label && (
                      <Form.Label>{item?.label || ""}</Form.Label>
                    )}
                    <Form.Control
                      {...formik.getFieldProps(`${index}_${item?.type}`)}
                      type={item?.inputType || "text"}
                      placeholder={item?.placeHolder || ""}
                      defaultValue={item?.defaultValue || ""}
                      className={`form-control ${
                        formik?.touched?.[`${index}_${item?.type}`] &&
                        formik.errors?.[`${index}_${item?.type}`]
                          ? "error_border"
                          : ""
                      }`}
                      onChange={formik.handleChange}
                    />
                    {formik?.touched?.[`${index}_${item?.type}`] &&
                      formik.errors?.[`${index}_${item?.type}`] && (
                        <span className="error-message">{"Invalid Input"}</span>
                      )}
                  </Form.Group>
                );
              } else if (item?.type === "textarea") {
                return (
                  <Form.Group
                    className={`mb-3 col-12 col-lg-${item?.col || 12}`}
                    key={item?.label || index}
                  >
                    {item?.label && (
                      <Form.Label>{item?.label || ""}</Form.Label>
                    )}
                    <Form.Control
                      {...formik.getFieldProps(`${index}_${item?.type}`)}
                      as="textarea"
                      placeholder={item?.placeHolder || ""}
                      defaultValue={item?.defaultValue || ""}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik?.touched?.[`${index}_${item?.type}`] &&
                        formik.errors?.[`${index}_${item?.type}`]
                          ? "error_border"
                          : ""
                      }`}
                    />
                    {formik?.touched?.[`${index}_${item?.type}`] &&
                      formik.errors?.[`${index}_${item?.type}`] && (
                        <span className="error-message">{"Invalid Input"}</span>
                      )}
                  </Form.Group>
                );
              } else if (item?.type === "select") {
                return (
                  <Form.Group
                    className={`mb-3 col-12 col-lg-${item?.col || 12}`}
                    key={item?.label || index}
                  >
                    {item?.label && (
                      <Form.Label>{item?.label || ""}</Form.Label>
                    )}
                    <br />
                    <Form.Select
                      size="lg"
                      {...formik.getFieldProps(`${index}_${item?.type}`)}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik?.touched?.[`${index}_${item?.type}`] &&
                        formik.errors?.[`${index}_${item?.type}`]
                          ? "error_border"
                          : ""
                      }`}
                    >
                      <option value={item?.label || "select"}>
                        {item?.label || "select"}
                      </option>
                      {item?.selectOptions &&
                        item?.selectOptions?.length > 0 &&
                        item?.selectOptions?.map((opt: string, i: number) => (
                          <option value={opt} key={i}>
                            {opt}
                          </option>
                        ))}
                    </Form.Select>
                    {formik?.touched?.[`${index}_${item?.type}`] &&
                      formik.errors?.[`${index}_${item?.type}`] && (
                        <span className="error-message">{"Invalid Input"}</span>
                      )}
                  </Form.Group>
                );
              } else if (item?.type === "checkbox") {
                return (
                  <Form.Group
                    className={`mb-3 col-12 col-lg-${item?.col || 12}`}
                    key={item?.label || index}
                  >
                    {/* {item?.label && <Form.Label>{item?.label || ""}</Form.Label>} */}
                    <div className="ml-2 form-check">
                      <input
                        {...formik.getFieldProps(`${index}_${item?.type}`)}
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        style={{ cursor: "pointer" }}
                        onChange={formik.handleChange}
                        className={` form-check-input ${
                          formik?.touched?.[`${index}_${item?.type}`] &&
                          formik.errors?.[`${index}_${item?.type}`]
                            ? "error_border"
                            : ""
                        }`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ cursor: "pointer" }}
                      >
                        {item?.label || ""}
                      </label>
                    </div>
                    {formik?.touched?.[`${index}_${item?.type}`] &&
                      formik.errors?.[`${index}_${item?.type}`] && (
                        <span className="error-message">{"Invalid Input"}</span>
                      )}
                  </Form.Group>
                );
              } else if (item?.type === "upload") {
                return (
                  <Form.Group
                    className={`mb-3 col-12 col-lg-${item?.col || 12}`}
                    key={item?.label || index}
                  >
                    {item?.label && (
                      <Form.Label>{item?.label || ""}</Form.Label>
                    )}
                    <FilePond
                      files={[]}
                      onupdatefiles={e => {
                        console.log(e);
                        setAttachmentUrl(e);
                      }}
                      allowMultiple={false}
                      maxFiles={1}
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
                    {formik?.touched?.[`${index}_${item?.type}`] &&
                      formik.errors?.[`${index}_${item?.type}`] && (
                        <span className="error-message">
                          {"Invalid Attachment"}
                        </span>
                      )}
                  </Form.Group>
                );
              } else {
                return (
                  <Form.Label className="text-danger" key={index}>
                    Invalid Field
                  </Form.Label>
                );
              }
            })}
          {data?.list && data?.list?.length > 0 && (
            <Button
              variant="primary"
              type="submit"
              className="ml-auto mr-3"
              disabled={
                formik?.isSubmitting ||
                isUploadAttachmentLoading ||
                isFormSubmissionLoading ||
                !formik?.dirty
              }
            >
              Submit
            </Button>
          )}
        </Form>
      )}
    </div>
  );
}

export default FormBuilder;
