import { Box, Typography } from "@mui/material";

export const Error = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h6" sx={{ color: "#808080", fontStyle: "italic" }}>
        An unexpected error has occurred
      </Typography>
    </Box>
  );
};
