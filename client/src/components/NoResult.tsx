import { Box, Typography } from "@mui/material";

type NoResultProps = {
  children: string;
};

export const NoResult = ({ children }: NoResultProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ color: "#808080", fontStyle: "italic" }}>
        {children}
      </Typography>
    </Box>
  );
};
