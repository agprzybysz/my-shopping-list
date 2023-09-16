import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:8000";

type Product = {
  id: string;
  productName: string;
  quantity: string;
  notes: string;
  done: boolean;
};

export type GetShoppingListsProps = {
  id: string;
  title: string;
  shop: string;
  createdAt: string;
  products: Product[];
};

export type CreateShoppingListsProps = {
  title: string;
  shop: string;
};

export type AddNewProductProps = {
  productName: string;
  quantity: string;
  notes: string;
};

export const getAllShoppingLists = async () => {
  const response: AxiosResponse<GetShoppingListsProps[]> = await axios.get(
    `${BASE_URL}/lists`
  );
  return response.data;
};

export const getShoppingListById = async (listId: string) => {
  const response: AxiosResponse<GetShoppingListsProps | undefined> =
    await axios({
      method: "get",
      url: `${BASE_URL}/lists/${listId}`,
    });
  return response.data;
};

export const createShoppingList = async (newList: CreateShoppingListsProps) => {
  const response: AxiosResponse<GetShoppingListsProps> = await axios.post(
    `${BASE_URL}/lists`,
    newList
  );
  return response.data;
};

export const deleteShoppingList = async (listId: string) => {
  const response: AxiosResponse<void> = await axios.delete(
    `${BASE_URL}/lists`,
    {
      data: { id: listId },
    }
  );
  return response.data;
};
//listId: string, newProduct: AddNewProductProps
export const addProductToShoppingList = async (
  dataSubmitted: AddNewProductProps,
  id: string
) => {
  const response: AxiosResponse<GetShoppingListsProps> = await axios.post(
    `${BASE_URL}/lists/${id}`,
    dataSubmitted
  );
  return response.data;
};
