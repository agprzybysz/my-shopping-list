import axios, { AxiosResponse } from "axios";
import { ProductProps } from "../types/types";
import {
  GetShoppingListsProps,
  CreateShoppingListsProps,
  AddNewProductProps,
} from "../types/types";
const BASE_URL = "http://localhost:8000";

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

export const deleteProductFromShoppingList = async (
  productId: string,
  id: string
) => {
  const response: AxiosResponse<void> = await axios.delete(
    `${BASE_URL}/lists/${id}`,
    {
      data: { productId },
    }
  );
  return response.data;
};

export const updateProductInShoppingList = async (
  updatedProduct: ProductProps,
  id: string
) => {
  const response: AxiosResponse<ProductProps> = await axios.patch(
    `${BASE_URL}/lists/${id}`,
    updatedProduct
  );
  return response.data;
};
