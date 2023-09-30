import React from "react";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModel,
  GridRowParams,
  GridRowSelectionModel,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid";
import { ClickAwayListener } from "@mui/base";
import { ProductProps } from "../types/types";

type DataGridProps = {
  initialColumns: GridColDef[];
  initialRows: ProductProps[];
  handleDelete: (id: string) => void;
  processRowUpdate: (
    newRow: ProductProps,
    originalRow: ProductProps
  ) => ProductProps;
  handleSelectionChange: (ids: any[]) => void;
};

export const DataGridTable = ({
  initialRows,
  initialColumns,
  handleDelete,
  processRowUpdate,
  handleSelectionChange,
}: DataGridProps) => {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  console.log(rowModesModel);
  const initialSelection = initialRows
    .filter((row) => row.isPurchased === true)
    .map((row) => row.id);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>(initialSelection);

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
    const newRowModesModel = { ...rowModesModel };

    for (const rowId in newRowModesModel) {
      newRowModesModel[rowId] = { mode: GridRowModes.View };
    }
    newRowModesModel[params.id] = { mode: GridRowModes.Edit };

    setRowModesModel(newRowModesModel);
  };
  const handleClickAway = () => {
    const newRowModesModel = { ...rowModesModel };

    for (const rowId in newRowModesModel) {
      newRowModesModel[rowId] = { mode: GridRowModes.View };
    }

    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      width: 150,
    },
    ...initialColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }: GridRowModel) => {
        return [
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
    <ClickAwayListener onClickAway={handleClickAway}>
      <DataGrid
        autoHeight
        checkboxSelection
        rows={initialRows}
        onRowSelectionModelChange={(
          newRowSelectionModel: GridRowSelectionModel
        ) => {
          setRowSelectionModel(newRowSelectionModel);
          handleSelectionChange(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        disableRowSelectionOnClick
        keepNonExistentRowsSelected
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
        localeText={{
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} products purchased`
              : `${count.toLocaleString()} product purchased`,
          checkboxSelectionHeaderName: "Is Purchased?",
        }}
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
    </ClickAwayListener>
  );
};
