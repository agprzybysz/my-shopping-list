import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
};

export const DataGridTable = ({
  initialRows,
  initialColumns,
}: DataGridProps) => {
  return (
    <Box>
      <DataGrid
        rows={initialRows}
        columns={initialColumns}
        rowHeight={35}
        columnHeaderHeight={45}
      />
    </Box>
  );
};
