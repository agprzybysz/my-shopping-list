import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getShoppingListById } from "../api/service";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { NoResult } from "../components/NoResult";
import { DataGridTable } from "../components/DataGrid";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50, editable: true },
  {
    field: "productName",
    headerName: "Product Name",
    width: 150,
    editable: true,
  },
  { field: "quantity", headerName: "Quantity", width: 100, editable: true },
  { field: "notes", headerName: "Notes", width: 200, editable: true },
  { field: "done", headerName: "Done", width: 100, editable: true },
];

export const ShoppingList = () => {
  type ListParams = {
    id: string;
  };

  const { id } = useParams<keyof ListParams>() as ListParams;
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["shoppingListData", id],
    queryFn: () => getShoppingListById(id),
  });

  return (
    <Box>
      {isLoading && <Loader />}
      {isError && <Error />}
      {isSuccess && !data && <NoResult children="Shopping List not found" />}
      {isSuccess && !!data && (
        <Box>
          <p>{data.title}</p>
          <DataGridTable initialRows={data.products} initialColumns={columns} />
        </Box>
      )}
    </Box>
  );
};
