import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FastField, Formik, FastFieldProps } from "formik";
import React from "react";
import { useMemo } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { FormSwitch } from "./FormSwitchField";
import { FormTextareaField } from "./FormTextareaField";
import { FormTextField } from "./FormTextField";

type ValueTypes = string | number | boolean;
type BaseValues = Record<string, string | number | boolean>;

interface Field<Type extends ValueTypes> {
  field: string;
  label: string;
  type: Type extends boolean
    ? "checkbox"
    : Type extends number
    ? "number"
    : "text" | "textarea";
}

interface FormDialogMetadata {
  _closing: boolean;
}
interface FormDialogConfig<T extends BaseValues> {
  title: string;
  initialValues?: Partial<T>;
  fields: { [K in keyof T]: Field<T[K]> };
  onSubmit: (values: T) => void;
}

interface FormDialogConfigWithMetadata
  extends FormDialogConfig<any>,
    FormDialogMetadata {}

export const createFormDialogStore = () => {
  return create(
    combine({ dialog: null as FormDialogConfigWithMetadata | null }, (set) => ({
      open<T extends BaseValues>(config: FormDialogConfig<T>) {
        set(() => {
          return { dialog: { ...config, _closing: false } };
        });
      },
      close() {
        set((state) => {
          return {
            ...state,
            dialog: { ...state.dialog!, _closing: true },
          };
        });
      },
    }))
  );
};

interface FormProps<Values extends BaseValues>
  extends FormDialogConfig<Values> {
  onCancel: () => void;
}
const Form = <Values extends BaseValues>(props: FormProps<Values>) => {
  const fieldArray = React.useMemo(
    () => Object.keys(props.fields),
    [props.fields]
  );
  const initialValues = useMemo(() => {
    return fieldArray.reduce((prev, current, index) => {
      (prev as any)[current] =
        (props.initialValues && props.initialValues[current]) || undefined;
      return prev;
    }, {}) as Values;
  }, [props.initialValues, props.fields]);

  const fieldRenderer = (field: Field<any>, fieldProps: FastFieldProps) => {
    switch (field.type) {
      case "number":
        return (
          <FormTextField
            field={fieldProps.field}
            meta={fieldProps.meta}
            variant="outlined"
            margin="normal"
            fullWidth
            label={field.label}
            type="number"
          />
        );
      case "textarea":
        return (
          <FormTextareaField
            field={fieldProps.field}
            meta={fieldProps.meta}
            variant="outlined"
            margin="normal"
            fullWidth
            label={field.label}
            rows={5}
            multiline
          />
        );
      case "checkbox":
        return (
          <FormSwitch
            field={fieldProps.field}
            meta={fieldProps.meta}
            margin="normal"
            fullWidth
            label={field.label}
          />
        );

      default:
        return (
          <FormTextField
            field={fieldProps.field}
            meta={fieldProps.meta}
            variant="outlined"
            margin="normal"
            fullWidth
            label={field.label}
          />
        );
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={props.onSubmit}>
      {(formikProps) => (
        <React.Fragment>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>
            {fieldArray.map((key) => (
              <FastField key={key} name={key}>
                {(fastFieldProps: FastFieldProps) =>
                  fieldRenderer(props.fields[key], fastFieldProps)
                }
              </FastField>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onCancel}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => formikProps.handleSubmit()}
            >
              Submit
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Formik>
  );
};

export interface FormDialog {
  useStore: ReturnType<typeof createFormDialogStore>;
}
export const FormDialog = (props: FormDialog) => {
  const state = props.useStore();
  const handleClose = () => {};
  if (!state.dialog) {
    return null;
  }

  return (
    <Dialog open={Boolean(state.dialog)} onClose={handleClose} fullWidth>
      <Form {...state.dialog} onCancel={state.close} />
    </Dialog>
  );
};
