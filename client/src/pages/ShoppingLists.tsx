import * as React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getShoppingLists, GetShoppingListsProps } from "../api/service";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";

export const ShoppingLists = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["shoppingListsData"],
    queryFn: () => getShoppingLists(),
  });

  const listMenu: JSX.Element[] | undefined = data?.map(
    (item: GetShoppingListsProps) => (
      <ListItem
        key={item.id}
        disablePadding
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <ListItemButton sx={{ px: 0 }}>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "orange" }}>
              {item.title.slice(0, 1)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body1" component="div">
                {item.title}
              </Typography>
            }
            secondary={
              <Box sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                <Typography variant="body2" component="p" sx={{ mt: 0.5 }}>
                  Created at: {new Date(item.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" component="p">
                  Items: {item.numberOfProduts}
                </Typography>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>
    )
  );

  return (
    <Box>
      <Typography variant="h6">Your shopping lists</Typography>
      {isLoading && <Loader />}
      {isError && <Error />}
      {isSuccess && data.length === 0 && <div>No lists</div>}
      {isSuccess && data.length > 0 && (
        <List sx={{ width: "100%", maxWidth: "600px" }}>{listMenu}</List>
      )}
    </Box>
  );
};
