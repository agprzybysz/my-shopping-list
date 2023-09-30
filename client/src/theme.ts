import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {},
});

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 0,
          [theme.breakpoints.up("sm")]: {
            padding: 0,
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#0d4072",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderCheckbox": {
            color: "#0d4072",
            fontWeight: "bold",
            "& .MuiDataGrid-columnHeaderDraggableContainer": {
              display: "none",
            },
          },
          "& .MuiDataGrid-columnHeaderCheckbox::after": {
            content: '"Is Purchased?"',
          },
        },
        row: {
          "&.Mui-selected": {
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
    },
  },
});

export default theme;
