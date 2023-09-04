import * as React from "react";
import { routesConfig } from "../layouts/routesConfig";
import {
  Box,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {routesConfig
        .filter((item) => !!item.menuText)
        .map((route) => (
          <ListItem key={route.path} disablePadding>
            <ListItemButton component={NavLink} to={route.path}>
              <ListItemIcon>{route.menuIcon}</ListItemIcon>
              <ListItemText primary={route.menuText} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  </div>
);

type DrawerMenuProps = {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

export const DrawerMenu = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}: DrawerMenuProps) => {
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="menu"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
