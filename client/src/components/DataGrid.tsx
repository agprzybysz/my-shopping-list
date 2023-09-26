import React from "react";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { ProductProps } from "../types/types";

type DataGridProps = {
  initialColumns: GridColDef[];
  initialRows: ProductProps[];
  handleDelete: (id: string) => void;
  processRowUpdate: (
    newRow: ProductProps,
    originalRow: ProductProps
  ) => ProductProps;
};

export const DataGridTable = ({
  initialRows,
  initialColumns,
  handleDelete,
  processRowUpdate,
}: DataGridProps) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleEdit = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSave = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancel = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  //update row on single click
  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    setRowModesModel({
      ...rowModesModel,
      [params.id]: { mode: GridRowModes.Edit },
    });
  };

  const columns: GridColDef[] = [
    ...initialColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }: GridRowModel) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSave(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancel(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEdit(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <DataGrid
      autoHeight
      rows={initialRows}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[5, 10, 25]}
      rowHeight={35}
      columnHeaderHeight={45}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowClick={handleRowClick}
      processRowUpdate={processRowUpdate}
      slots={{
        noRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            No rows
          </Stack>
        ),
        noResultsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            No results found
          </Stack>
        ),
      }}
    />
  );
};
