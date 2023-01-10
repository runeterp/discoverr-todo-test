import React from "react";
import clsx from "clsx";
import { FieldInputProps, FieldMetaProps } from "formik";

// Components
import FormControl, { FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NotchedOutline from "@mui/material/OutlinedInput/NotchedOutline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Swicth from "@mui/material/Switch";

// Styles
import { styled } from "@mui/material";

const StyledDiv = styled("div")(({ theme }) => ({
  position: "relative",
  "&:hover .notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
  "&.focused .notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
  "&.error .notchedOutline": {
    borderColor: theme.palette.error.main,
  },
  "&.disabled .notchedOutline": {
    borderColor: theme.palette.action.disabled,
  },
}));

const StyledNotchedOutline = styled(NotchedOutline)(({ theme }) => ({
  borderColor: "rgba(0, 0, 0, 0.23)",
  borderRadius: theme.shape.borderRadius,
}));

//
export interface IFormSwitchProps {
  field: FieldInputProps<boolean | null>;
  meta: FieldMetaProps<boolean | null>;

  label?: string;
  description?: string;
  readOnly?: boolean;
}
export const FormSwitch: React.FunctionComponent<
  IFormSwitchProps &
    Pick<FormControlProps, "margin" | "fullWidth" | "disabled" | "required">
> = (props) => {
  const [focus, setFocus] = React.useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    setFocus(true);
  };
  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    setFocus(false);
    props.field.onBlur(event);
  };
  const handleChange = (_: any, value: boolean) => {
    props.field.onChange({
      target: {
        value: value,
        type: "text",
        name: props.field.name,
      },
    });
  };

  const meta = props.meta;
  return (
    <FormControl
      variant="outlined"
      margin={props.margin}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      error={meta.touched ? !!meta.error : false}
    >
      <StyledDiv
        className={clsx({
          error: !!meta.error,
          focused: focus,
        })}
      >
        <InputLabel shrink={true} error={meta.touched ? !!meta.error : false}>
          {props.label}
        </InputLabel>
        <StyledNotchedOutline
          label={props.label}
          notched={true}
          className={"notchedOutline"}
        />
        <FormControlLabel
          style={{ padding: "9px 14px" }}
          control={
            <Swicth
              {...props.field}
              onChange={handleChange}
              checked={props.field.value || false}
              onFocus={handleFocus}
              onBlur={handleBlur}
              readOnly={props.readOnly}
            />
          }
          label={props.description || ""}
        />
      </StyledDiv>
      {meta.touched && !!meta.error ? (
        <FormHelperText>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};
