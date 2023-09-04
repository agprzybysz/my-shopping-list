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
  },
});

export default theme;
