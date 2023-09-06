import { Home } from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";
import { CreateNewShoppingList } from "../pages/CreateNewShoppingListPage";
import { ShoppingListsView } from "../pages/ViewShoppingListsPage";
import { ShoppingList } from "../pages/ShoppingListPage";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
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
    element: <ShoppingListsView />,
    menuIcon: <ViewListIcon />,
    menuText: "View Shopping Lists",
  },
  {
    path: "/lists/:id",
    element: <ShoppingList />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
