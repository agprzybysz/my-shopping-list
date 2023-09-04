import React from "react";
import { Box, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { routesConfig } from "./routesConfig";
import { drawerWidth } from "../configs/sizeConfigs";

export const Page = () => {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#FFFFFF",
        flexGrow: 1,
        px: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar />
      <Box sx={{ py: 3, flexGrow: 1 }}>
        <Routes>
          {routesConfig.map((config) => (
            <Route
              key={config.path}
              path={config.path}
              element={config.element}
            />
          ))}
          <Route />
        </Routes>
      </Box>
    </Box>
  );
};
