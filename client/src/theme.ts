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
        },
      },
    },
  },
});

export default theme;
