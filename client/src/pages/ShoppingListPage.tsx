import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getShoppingListById,
  deleteProductFromShoppingList,
  updateProductInShoppingList,
  updateProductsSelection,
} from "../api/service";
import { ProductProps } from "../types/types";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { NoResult } from "../components/NoResult";
import { DataGridTable } from "../components/DataGrid";
import { AddNewRecord } from "../components/AddNewRecord";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useSnackbarHook } from "../hooks/useSnackbarHook";
import { NOTIFICATION_MESSAGES } from "../configs/notificationMessages";

export const ShoppingList = () => {
  type ListParams = {
    id: string;
  };

  const { handleShowSnackbar } = useSnackbarHook();

  const columns: GridColDef[] = [
    /*{
      field: "isPurchased",
      headerName: "Is Purchased?",
      width: 130,
      description: "Mark as checked product which you bought",
      type: "boolean",
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox checked={params.value} size="small" />
      ),
    },*/
    /*   {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 100,
    },*/
    {
      field: "productName",
      headerName: "Product Name",
      width: 250,
      editable: true,
    },
    { field: "quantity", headerName: "Quantity", width: 100, editable: true },
    {
      field: "notes",
      headerName: "Notes",
      minWidth: 200,
      flex: 1,
      editable: true,
    },
  ];

  const { id } = useParams<keyof ListParams>() as ListParams;
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["shoppingListData", id],
    queryFn: () => getShoppingListById(id),
  });

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) =>
      deleteProductFromShoppingList(productId, id),
    onError: (error) => {
      console.log(error);
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, "error");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListData"] });
      handleShowSnackbar(
        NOTIFICATION_MESSAGES.SUCCESS.PRODUCT_DELETED,
        "success"
      );
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (updatedProduct: ProductProps) =>
      updateProductInShoppingList(updatedProduct, id),
    onError: (error) => {
      console.log(error);
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, "error");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListData"] });
      handleShowSnackbar(
        NOTIFICATION_MESSAGES.SUCCESS.PRODUCT_EDITTED(data.productName),
        "success"
      );
    },
  });

  const changeSelectionOfRowMutation = useMutation({
    mutationFn: (ids: string[]) => updateProductsSelection(ids, id),
    onError: (error) => {
      console.log(error);
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, "error");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListData"] });
    },
  });

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
  };

  const handleProcessRowUpdate = (
    updatedProduct: ProductProps,
    originalProduct: ProductProps
  ) => {
    if (JSON.stringify(updatedProduct) !== JSON.stringify(originalProduct)) {
      updateProductMutation.mutate(updatedProduct);
    }
    return updatedProduct;
  };

  const handleIsPurchasedChange = (productIds: string[]) => {
    changeSelectionOfRowMutation.mutate(productIds);
  };

  return (
    <Box>
      {isLoading && <Loader />}
      {isError && <Error />}
      {isSuccess && !data && <NoResult children="Shopping List not found" />}
      {isSuccess && !!data && (
        <Box>
          <Typography variant="h6" mb={1}>
            Shopping List Checklist:{" "}
            <span style={{ color: "#1976d2" }}>{data.title}</span>
          </Typography>
          <Box mb={3}>
            <Typography>
              Shop:{" "}
              <span style={{ color: "#0d4072", fontWeight: 500 }}>
                {data.shop}
              </span>
            </Typography>
            <Typography>
              Pruducts to buy:{" "}
              <span style={{ color: "#0d4072", fontWeight: 500 }}>
                {
                  data.products.filter((item) => item.isPurchased === false)
                    .length
                }
                /{data.products.length}
              </span>
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Product
          </Button>
          <AddNewRecord
            isOpen={isModalOpen}
            handleClose={handleCloseModal}
            listId={id}
          />
          <DataGridTable
            initialRows={data.products}
            initialColumns={columns}
            handleDelete={handleDeleteProduct}
            processRowUpdate={handleProcessRowUpdate}
            handleSelectionChange={handleIsPurchasedChange}
          />
        </Box>
      )}
    </Box>
  );
};
