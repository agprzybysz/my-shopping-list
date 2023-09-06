import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

type RouteParams = {
  id: string;
};

export const ShoppingList = () => {
  const { id } = useParams<RouteParams>();
  return (
    <Box>
      <h1>ShoppingList Page</h1>
      <p>ID: {id}</p>
    </Box>
  );
};
