import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AppButton as Button } from "../components/Button";
import ShoppingListImage from "../assets/shopping-list-icon.png";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "500px",
        margin: "0 auto",
        mt: 4,
      }}
    >
      <Typography variant="h6" align="center">
        Organize your daily shopping lists
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mb: 3,
          mt: 1,
        }}
      >
        <img
          alt=""
          src={ShoppingListImage}
          style={{
            height: "100%",
            maxHeight: "248px",
            maxWidth: "248px",
          }}
        />
      </Box>
      <Box sx={{ width: "70%" }}>
        <Link to="/createlist">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            fullWidth={true}
          >
            Create new Shopping List
          </Button>
        </Link>
      </Box>
      <Box sx={{ width: "70%" }}>
        <Link to="/lists">
          <Button
            variant="contained"
            color="info"
            size="medium"
            fullWidth={true}
          >
            View added shopping lists
          </Button>
        </Link>
      </Box>
      <Box></Box>
    </Box>
  );
};
