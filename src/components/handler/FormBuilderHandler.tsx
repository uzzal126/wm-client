import FormBuilder from "../form-builder/FormBuilder";

const FormBuilderHandler = ({ data }: any) => {
  return data && data?.setting ? (
    data?.setting?.template === "form_template_1" ? (
      <FormBuilder data={data} />
    ) : (
      <FormBuilder data={data} />
    )
  ) : (
    <p className="py-5 text-center text-danger">Please configure again</p>
  );
};

export default FormBuilderHandler;
