import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../components/FormInput";
import { AppButton as Button } from "../components/Button";
import { useForm } from "react-hook-form";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createShoppingList, getShoppingLists } from "../api/service";
import { CreateShoppingListsProps, GetShoppingListsProps } from "../api/service";

export type FormData = {
  name: string;
  shop: string;
};

const defaultValues: FormData = {
  name: "",
  shop: "",
};

const validationSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required("Name is Required")
      .max(20, "Name must contain maximum 20 characters"),
    shop: yup.string().trim().required("Shop category is Required"),
  })
  .required();

export const CreateNewShoppingList = () => {
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const getTotalRecords = () => {
    //const res: GetShoppingListsProps[] = getShoppingLists();
    //console.log(res)
    //setTotalRecords(res.length);
  };

  getTotalRecords();

  const addListMutation = useMutation({
    mutationFn: (newList: CreateShoppingListsProps) =>
      createShoppingList(newList),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const listsCreated = [];

  const onSubmit = (data: FormData) => {
    addListMutation.mutate({
      id: listsCreated.length,
      name: data.name,
      shop: data.shop,
      createdAt: new Date(),
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
