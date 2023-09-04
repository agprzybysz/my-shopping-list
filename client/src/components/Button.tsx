import * as React from "react";
import { Button } from "@mui/material";

type AppButtonProps = {
  children: string;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  fullWidth?: boolean;
};

export const AppButton = ({
  children,
  variant,
  color,
  disabled,
  size,
  onClick,
  fullWidth
}: AppButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled}
      size={size}
      onClick={onClick}
      sx={{ mb: 2 }}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};
