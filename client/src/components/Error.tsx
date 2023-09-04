import { Box, Typography } from "@mui/material";

export const Error = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Wystąpił nieoczekiwany błąd</Typography>
    </Box>
  );
};
