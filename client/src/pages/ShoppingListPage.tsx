import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getShoppingListById } from "../api/service";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { NoResult } from "../components/NoResult";

export const ShoppingList = () => {
  type ListParams = {
    id: string;
  };

  const { id } = useParams<keyof ListParams>() as ListParams;
  console.log(id);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["shoppingListData", id],
    queryFn: () => getShoppingListById(id),
  });

  return (
    <Box>
      {isLoading && <Loader />}
      {isError && <Error />}
      {isSuccess && !data && <NoResult children="Shopping List not found" />}
      {isSuccess && !!data && (
        <Box>
          <p>ID: {id}</p>
          <p>{data?.id}</p>
          <p>{data?.title}</p>
          <p>{data?.shop}</p>
        </Box>
      )}
    </Box>
  );
};
