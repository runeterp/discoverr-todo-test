import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

// Components
import TextField, { TextFieldProps } from "@mui/material/TextField";

//
export interface IFormTextFieldProps {
  field: FieldInputProps<string | number | null>;
  meta: FieldMetaProps<string | number | null>;
  readOnly?: boolean;
}
export const FormTextField: React.FunctionComponent<
  IFormTextFieldProps & TextFieldProps
> = ({
  field,
  meta,
  error,
  readOnly,
  helperText,
  inputProps,
  InputProps,
  InputLabelProps,
  ...rest
}) => {
  return (
    <TextField
      autoComplete="off"
      {...rest}
      {...field}
      InputLabelProps={{
        shrink: rest.type === "date" ? true : undefined,
        ...InputLabelProps,
      }}
      value={
        field.value === null || field.value === undefined ? "" : field.value
      }
      InputProps={{
        readOnly,
        ...InputProps,
      }}
      inputProps={{
        step: "any",
        ...inputProps,
      }}
      error={error || meta.touched ? !!meta.error : false}
      helperText={
        (error || meta.touched ? meta.error : undefined) || helperText
      }
    />
  );
};
