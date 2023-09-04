import * as React from "react";
import { Box, Typography } from "@mui/material";
import ErrorPageImage from "../assets/error-page.png"

export const ErrorPage = () => {
    return (

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 2
              }}
            >
              <img
                alt=""
                src={ErrorPageImage}
                style={{
                  height: '100%',
                
                  maxHeight: '248px',
                  maxWidth: '248px',
                }}
              />
              <Typography variant="h6">
              Page not found
            </Typography>
          </Box>
    )
};
