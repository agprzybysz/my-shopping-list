import { Request, Response } from "express";
import {
  shoppingLists as lists,
  ShoppingListProps,
  Product,
} from "../db/ShoppingList";
import { v4 as uuidv4 } from "uuid";

//get all created lists
export const getAllLists = async (req: Request, res: Response) => {
  res.json(lists);
};

//create new list
export const createList = async (req: Request, res: Response) => {
  const newList: ShoppingListProps = {
    ...req.body,
    createdAt: new Date().getTime(),
    id: uuidv4(),
    products: [],
  };
  lists.unshift(newList);
  return res.send(newList);
};

//delete list
export const deleteList = async (req: Request, res: Response) => {
  const { id } = req.body;
  const newProduct: ShoppingListProps = {
    ...req.body,
    createdAt: new Date().getTime(),
    id: uuidv4(),
    products: [],
  };
  const listIndex = lists.findIndex((i) => i.id === id);
  lists.splice(listIndex, 1);
  return res.send();
};

// get list by id
export const getListById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const searchedList = lists.find((item) => item.id === id);
  return res.json(searchedList);
};

//add new product to list
export const addProductToList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newProduct: Product = {
    ...req.body,
    id: uuidv4(),
    isPurchased: false,
  };
  const listIndex: number = lists.findIndex((i) => i.id === id);
  lists[listIndex].products.push(newProduct);
  return res.send(lists[listIndex]);
};

//delete product from list
export const deleteProductFromList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productId }: { productId: string } = req.body;
  const listIndex: number = lists.findIndex((i) => i.id === id);
  const productIndex: number = lists[listIndex].products.findIndex(
    (i) => i.id === productId
  );
  lists[listIndex].products.splice(productIndex, 1);
  return res.send();
};

//update product data in list
export const updateProductInList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProduct = { ...req.body };
  const listIndex: number = lists.findIndex((i) => i.id === id);
  const productIndex: number = lists[listIndex].products.findIndex(
    (i) => i.id === updatedProduct.id
  );
  lists[listIndex].products[productIndex] = updatedProduct;
  return res.send(updatedProduct);
};

//update product is purchased in list
export const updateProductIsPurchasedParam = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const selectionArr = [...req.body];
  const listIndex: number = lists.findIndex((i) => i.id === id);

  lists[listIndex].products.forEach((element, index) => {
    if (selectionArr.includes(element.id)) {
      lists[listIndex].products[index].isPurchased = true;
    } else {
      lists[listIndex].products[index].isPurchased = false;
    }
  });
  return res.send();
};
