import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../components/FormInput";
import { AppButton as Button } from "../components/Button";
import { useForm } from "react-hook-form";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShoppingList } from "../api/service";
import { CreateShoppingListsProps } from "../types/types";
import { useSnackbarHook } from "../hooks/useSnackbarHook";
import { NOTIFICATION_MESSAGES } from "../configs/notificationMessages";
import { useNavigate } from "react-router-dom";

const defaultValues: CreateShoppingListsProps = {
  title: "",
  shop: "",
};

const validationSchema = yup
  .object({
    title: yup
      .string()
      .trim()
      .required("Name is Required")
      .max(20, "Name must contain maximum 20 characters"),
    shop: yup.string().trim().required("Shop category is Required"),
  })
  .required();

export const CreateNewShoppingList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleShowSnackbar } = useSnackbarHook();

  const addListMutation = useMutation({
    mutationFn: (newList: CreateShoppingListsProps) =>
      createShoppingList(newList),
    onError: (error) => {
      console.log(error);
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, "error");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListsData"] });
      handleShowSnackbar(NOTIFICATION_MESSAGES.SUCCESS.LIST_CREATED, "success");
      navigate(`/lists/${data.id}`);
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreateShoppingListsProps>({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (dataSubmitted: CreateShoppingListsProps) => {
    addListMutation.mutate({
      title: dataSubmitted.title,
      shop: dataSubmitted.shop,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "500px",
        margin: "0 auto",
        mt: 4,
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <ShoppingCartIcon fontSize="medium" sx={{ mr: 1 }} />
        <Typography variant="h6">Create new Shopping List</Typography>
      </Box>
      <FormInput
        name="title"
        control={control}
        label="Enter shopping list name"
        errorsObj={errors}
      />
      <FormInput
        name="shop"
        control={control}
        label="Enter category of shop"
        errorsObj={errors}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={false}
        size="medium"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disabled={false}
        size="medium"
        onClick={() => reset()}
      >
        Reset
      </Button>
    </Box>
  );
};
