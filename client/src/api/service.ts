import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:8000";

export type GetShoppingListsProps = {
  id: string;
  title: string;
  shop: string;
  createdAt: string;
  numberOfProduts?: number | null;
};

export type CreateShoppingListsProps = {
  title: string;
  shop: string;
};

export const getShoppingLists = async (): Promise<GetShoppingListsProps[]> => {
  const response: AxiosResponse<GetShoppingListsProps[]> = await axios({
    method: "get",
    url: `${BASE_URL}/lists`,
  });
  return response.data;
};

export const createShoppingList = async (newList: CreateShoppingListsProps) => {
  const response: AxiosResponse<GetShoppingListsProps> = await axios({
    method: "post",
    url: `${BASE_URL}/lists`,
    data: newList,
  });
  return response.data;
};

export const deleteShoppingList = async (
  listId: string
) => {
  const response: AxiosResponse<GetShoppingListsProps> = await axios({
    method: "delete",
    url: `${BASE_URL}/lists`,
    data: { id: listId },
  });
  return response.data;
};
