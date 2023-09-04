import React from "react";
import { Container } from "@mui/material";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {children}
    </Container>
  );
};
