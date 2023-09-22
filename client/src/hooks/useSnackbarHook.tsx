import { VariantType, useSnackbar } from "notistack";

export const useSnackbarHook = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleShowSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  return { handleShowSnackbar };
};
