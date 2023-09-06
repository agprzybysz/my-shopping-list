import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:8000";

export type GetShoppingListsProps = {
  id: string;
  title: string;
  shop: string;
  createdAt: string;
  numberOfProduts?: number;
};

export type CreateShoppingListsProps = {
  title: string;
  shop: string;
};

export const getShoppingLists = async (): Promise<GetShoppingListsProps[]> => {
  try {
    const response: AxiosResponse<GetShoppingListsProps[]> = await axios.get(
      `${BASE_URL}/lists`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createShoppingList = async (
  newList: CreateShoppingListsProps
): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.post(
      `${BASE_URL}/lists`,
      newList
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteShoppingList = async (listId: string): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.delete(
      `${BASE_URL}/lists`,
      {
        data: { id: listId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
