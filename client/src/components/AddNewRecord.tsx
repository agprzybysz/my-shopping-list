import React, { useEffect } from "react";
import { AppModal } from "./Modal";
import { addProductToShoppingList } from "../api/service";
import { AddNewProductProps } from "../types/types";
import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormInput } from "./FormInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbarHook } from "../hooks/useSnackbarHook";
import { NOTIFICATION_MESSAGES } from "../configs/notificationMessages";
import * as yup from "yup";

type AddNewRecordComponentProps = {
  isOpen: boolean;
  handleClose: () => void;
  listId: number;
};

const defaultValues: AddNewProductProps = {
  productName: "",
  quantity: "",
  notes: "",
};

export const AddNewRecord = ({
  isOpen,
  handleClose,
  listId,
}: AddNewRecordComponentProps) => {
  const { handleShowSnackbar } = useSnackbarHook();

  const validationSchema = yup.object().shape({
    productName: yup.string().trim().required("Product Name is required"),
    quantity: yup.string().trim().required("Quantity is required"),
    notes: yup.string().notRequired(),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddNewProductProps>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const addProductMutation = useMutation({
    mutationFn: (dataSubmitted: AddNewProductProps) =>
      addProductToShoppingList(dataSubmitted, listId),
    onError: (error) => {
      console.log(error);
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, "error");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListData"] });
      handleShowSnackbar(
        NOTIFICATION_MESSAGES.SUCCESS.PRODUCT_ADDED,
        "success"
      );
    },
  });

  const addData: SubmitHandler<AddNewProductProps> = (
    dataSubmitted: AddNewProductProps
  ) => {
    addProductMutation.mutate({
      productName: dataSubmitted.productName,
      quantity: dataSubmitted.quantity,
      notes: dataSubmitted.notes || "",
    });
    reset();
    handleClose();
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const getContent = (
    <Box component="form" noValidate autoComplete="off">
      <FormInput
        name="productName"
        control={control}
        label="Enter product name"
        errorsObj={errors}
      />
      <FormInput
        name="quantity"
        control={control}
        label="Enter quantity"
        errorsObj={errors}
      />
      <FormInput
        name="notes"
        control={control}
        label="Enter additional notes"
        errorsObj={errors}
      />
    </Box>
  );

  return (
    <AppModal
      isOpen={isOpen}
      handleClose={handleClose}
      description="Add new product to list"
      children={getContent}
      onSubmit={handleSubmit(addData)}
    />
  );
};
