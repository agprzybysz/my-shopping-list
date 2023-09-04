import axios, { AxiosResponse } from "axios";
const BASE_URL = "http://localhost:8000";

export type GetShoppingListsProps = {
  id: number;
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
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createShoppingList = async (
  newList: CreateShoppingListsProps
): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.post(
      `${BASE_URL}/lists`,
      newList
    );
    //   console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
