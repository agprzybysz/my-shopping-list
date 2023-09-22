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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllShoppingLists, deleteShoppingList } from "../api/service";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { NoResult } from "../components/NoResult";
import { useSnackbarHook } from '../hooks/useSnackbarHook';
import { NOTIFICATION_MESSAGES } from "../configs/notificationMessages";
import { NavLink } from "react-router-dom";

export const ShoppingListsView = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["shoppingListsData"],
    queryFn: () => getAllShoppingLists(),
  });

  const queryClient = useQueryClient();
  const { handleShowSnackbar } = useSnackbarHook();


  const deleteListMutation = useMutation({
    mutationFn: (id: string) => deleteShoppingList(id),
    onError: (error) => {
      console.log(error);
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListsData"] });
      handleShowSnackbar(NOTIFICATION_MESSAGES.SUCCESS.LIST_DELETED, "success");
    },
  });

  const listMenu: JSX.Element[] =
    isSuccess && data.length > 0
      ? data.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            secondaryAction={
              <Box>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteListMutation.mutate(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemButton
              sx={{ px: 0 }}
              component={NavLink}
              to={`/lists/${item.id}`}
            >
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
                      Created at:{" "}
                      {
                        new Date(item.createdAt)
                          .toLocaleString("en-GB")
                          .split(",")[0]
                      }
                    </Typography>
                    <Typography variant="body2" component="p">
                      Items: {item.products?.length}
                    </Typography>
                  </Box>
                }
              />
            </ListItemButton>
          </ListItem>
        ))
      : [];

  return (
    <Box>
      <Typography variant="h6">Your shopping lists</Typography>
      {isLoading && <Loader />}
      {isError && <Error />}
      {isSuccess && data.length === 0 && <NoResult children="No lists" />}
      {isSuccess && data.length > 0 && (
        <List sx={{ width: "100%", maxWidth: "600px" }}>{listMenu}</List>
      )}
    </Box>
  );
};
