import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getShoppingListById } from "../api/service";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { NoResult } from "../components/NoResult";
import { DataGridTable } from "../components/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "done",
    headerName: "Done",
    width: 100,
    description: "Mark as checked product which you bought",
    editable: true,
    renderCell: (params: GridRenderCellParams) => (
      <Checkbox checked={params.value} size="small" />
    ),
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 150,
    editable: true,
  },
  { field: "quantity", headerName: "Quantity", width: 100, editable: true },
  { field: "notes", headerName: "Notes", width: 200, editable: true },
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
                {data.products.filter((item) => item.done === false).length}/
                {data.products.length}
              </span>
            </Typography>
          </Box>
          <DataGridTable initialRows={data.products} initialColumns={columns} />
        </Box>
      )}
    </Box>
  );
};
