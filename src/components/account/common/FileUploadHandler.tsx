import { useUploadFileMutation } from "@/redux-handler/api/slices/fileSlice";
import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

registerPlugin(FilePondPluginFileValidateType);

type Props = {
  title?: string;
  setAttachmentUrl: any;
  setSelectedFile: any;
  acceptedFileTypes: "image" | "docs" | "all";
  field: string;
  toastMessage?: string;
  placeHolder?: string;
  ref?: any;
  postFunc?: any;
  hideToast?: boolean;
  uploaderStyle?:
    | "integrated circle"
    | "integrated"
    | "circle"
    | "compact"
    | "compact circle";
};

function FileUploadHandler({
  title = "",
  setAttachmentUrl,
  ref = null,
  setSelectedFile,
  acceptedFileTypes = "image",
  field = "profile",
  toastMessage = "File uploaded !",
  placeHolder = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
  postFunc = () => null,
  hideToast = false,
  uploaderStyle = "integrated circle",
}: Props) {
  const acceptedObjArr = {
    image: ["image/*"],
    docs: [
      "application/pdf",
      ".docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-excel",
      "text/plain",
    ],
    all: [
      "image/*",
      "audio/*",
      "video/*",
      "text/*",
      "application/*",
      ".docx",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-excel",
    ],
  };
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const handleAttachmentUpload = async (file: any) => {
    let formData = new FormData();
    formData.append("image", file);
    formData.append("field_name", field);

    uploadFile(formData)?.then((res: any) => {
      if (res?.data?.status_code === 200) {
        // console.log("res", res);
        if (!hideToast) {
          toast.success(toastMessage, {
            position: "top-right",
          });
        }
        setAttachmentUrl(
          res?.data?.uploaded_files && res?.data?.uploaded_files?.length > 0
            ? res?.data?.uploaded_files[0]
            : ""
        );
        postFunc(
          res?.data?.uploaded_files && res?.data?.uploaded_files?.length > 0
            ? res?.data?.uploaded_files[0]
            : ""
        );
        setSelectedFile(file);
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
  return (
    <div style={{ cursor: "pointer" }} ref={ref}>
      <Form.Label>{title}</Form.Label>
      <FilePond
        files={[]}
        onupdatefiles={e => {
          // console.log(e);
          // setAttachmentUrl(e);
        }}
        ref={ref}
        allowMultiple={false}
        maxFiles={1}
        acceptedFileTypes={acceptedObjArr[acceptedFileTypes]}
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
        labelIdle={placeHolder}
        className={"file-upload"}
        stylePanelLayout={uploaderStyle}
      />
    </div>
  );
}

export default FileUploadHandler;
