import * as React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

type FormInputProps = {
  name: string;
  control: any;
  label: string;
  errorsObj: any;
};

export const FormInput = ({
  name,
  control,
  label,
  errorsObj,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          helperText={errorsObj[name] ? errorsObj[name].message : null}
          size="small"
          error={!!errorsObj[name]}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          sx={{ mb: 2 }}
        />
      )}
    />
  );
};
