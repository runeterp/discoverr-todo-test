import React from "react";
import { FieldInputProps, FieldMetaProps } from "formik";

// Components
import TextField, { TextFieldProps } from "@mui/material/TextField";

//
export interface IFormTextareaFieldProps {
  field: FieldInputProps<string | number | null>;
  meta: FieldMetaProps<string | number | null>;
  readOnly?: boolean;
}
export const FormTextareaField: React.FunctionComponent<
  IFormTextareaFieldProps & TextFieldProps
> = ({ field, meta, error, helperText, readOnly, ...rest }) => {
  return (
    <TextField
      autoComplete="off"
      multiline
      {...rest}
      {...field}
      InputLabelProps={{ shrink: rest.type === "date" ? true : undefined }}
      InputProps={{
        readOnly,
        ...rest.InputProps,
      }}
      value={
        field.value === null || field.value === undefined ? "" : field.value
      }
      error={error || meta.touched ? !!meta.error : false}
      helperText={
        (error || meta.touched ? meta.error : undefined) || helperText
      }
    />
  );
};
