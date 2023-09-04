import { Home } from "../pages/Home";
import { ErrorPage } from "../pages/ErrorPage";
import { CreateNewShoppingList } from "../pages/CreateNewShoppingList";
import { ShoppingLists } from "../pages/ShoppingLists";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewListIcon from "@mui/icons-material/ViewList";

type RoutesConfigProps = {
  path: string;
  element: JSX.Element;
  menuIcon?: JSX.Element;
  menuText?: string;
};

export const routesConfig: RoutesConfigProps[] = [
  {
    path: "/",
    element: <Home />,
    menuIcon: <HomeIcon />,
    menuText: "Home",
  },
  {
    path: "/createlist",
    element: <CreateNewShoppingList />,
    menuIcon: <AddIcon />,
    menuText: "Create New List",
  },
  {
    path: "/lists",
    element: <ShoppingLists />,
    menuIcon: <ViewListIcon />,
    menuText: "View Shopping Lists",
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
