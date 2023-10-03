import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
      dark: "#0d4072",
    },
  },
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
            color: theme.palette.primary.dark,
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderCheckbox": {
            color: theme.palette.primary.dark,
            fontWeight: "bold",
            "& .MuiDataGrid-columnHeaderDraggableContainer": {
              display: "none",
            },
          },
          "& .MuiDataGrid-columnHeaderCheckbox::after": {
            content: '"Is Purchased?"',
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outlineOffset: 0,
          },
          "& MuiCheckbox-root": {
            "&$checked": {
              color: "red",
            },
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
