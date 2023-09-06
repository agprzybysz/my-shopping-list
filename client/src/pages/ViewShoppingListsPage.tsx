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
import EditIcon from "@mui/icons-material/Edit";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getShoppingLists,
  GetShoppingListsProps,
  deleteShoppingList,
} from "../api/service";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { useSnackbar, VariantType } from "notistack";
import { NOTIFICATION_MESSAGES } from "../configs/notificationMessages";
import { NavLink } from "react-router-dom";

export const ShoppingListsView = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["shoppingListsData"],
    queryFn: () => getShoppingLists(),
  });

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const handleShowSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

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
      ? data.map((item: GetShoppingListsProps) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            secondaryAction={
              <Box>
                <IconButton aria-label="edit" size="large">
                  <EditIcon />
                </IconButton>
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
                      Items: {item.numberOfProduts}
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
      {isSuccess && data.length === 0 && <div>No lists</div>}
      {isSuccess && data.length > 0 && (
        <List sx={{ width: "100%", maxWidth: "600px" }}>{listMenu}</List>
      )}
    </Box>
  );
};
