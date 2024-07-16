import React, { ElementType } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { ErrorMessage, Field } from "formik";

interface InputType {
  as?: ElementType;
  md?: string;
  controlId: string;
  label?: string;
  name: string;
  type: string;
  inputGroupPrepend?: boolean;
  groupEnd?: boolean;
  onChange?: (e: any) => void;
  inputType?: string;
  size?: string;
  placeholder?: string;
  className?: string;
  onBlur?: (e: any) => void;
  min?: string;
  required?: boolean;
}

const FormTextField = ({
  as,
  md,
  controlId,
  label,
  name,
  type,
  inputGroupPrepend,
  groupEnd,
  onChange,
  inputType,
  size,
  placeholder,
  className,
  onBlur,
  min,
  required,
}: InputType) => {
  return (
    <Field
      name={name}
      render={({ field, form: { errors, touched } }: any) => {
        let isValid = !errors[field.name];
        let isInvalid = touched[field.name] && !isValid;
        return (
          <Form.Group as={as ? as : "div"} md={md} controlId={controlId}>
            {label && <Form.Label>{label}</Form.Label>}
            {inputGroupPrepend ? (
              <InputGroup>
                {(groupEnd === undefined || groupEnd === false) &&
                  inputGroupPrepend}
                <Form.Control
                  {...field}
                  className={className}
                  size={size}
                  onChange={onChange || field.onChange}
                  onBlur={(e) => onBlur && onBlur(e)}
                  type={type}
                  min={min}
                  placeholder={placeholder}
                  isValid={touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={errors[field.name]}
                  as={inputType}
                  required={required}
                />
                {groupEnd && inputGroupPrepend}
              </InputGroup>
            ) : (
              <>
                <Form.Control
                  {...field}
                  size={size}
                  className={className}
                  onChange={onChange || field.onChange}
                  onBlur={(e) => onBlur && onBlur(e)}
                  type={type}
                  min={min}
                  placeholder={placeholder}
                  isValid={touched[field.name] && isValid}
                  isInvalid={isInvalid}
                  feedback={errors[field.name]}
                  as={inputType}
                />
              </>
            )}
            <ErrorMessage
              name={field.name}
              render={(msg) => <div className="text-danger mb-2">{msg}</div>}
            />
          </Form.Group>
        );
      }}
    />
  );
};

FormTextField.defaultProps = {
  type: "text",
  inputGroupPrepend: null,
};

export default FormTextField;
