import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

export type RowsTypes = {
  id: string;
  productName: string;
  quantity: string;
  notes: string;
  done: boolean;
};

type DataGridProps = {
  initialColumns: GridColDef[];
  initialRows: RowsTypes[];
  onDeleteProduct: (productId: string) => void;
};

export const DataGridTable = ({
  initialRows,
  initialColumns,
  onDeleteProduct,
}: DataGridProps) => {
  const columns: GridColDef[] = [
    ...initialColumns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }: GridRowModel) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            //onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDeleteProduct(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <DataGrid
        rows={initialRows}
        columns={columns}
        rowHeight={35}
        columnHeaderHeight={45}
      />
    </Box>
  );
};
