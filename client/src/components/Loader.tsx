import { CircularProgress, Box } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};
