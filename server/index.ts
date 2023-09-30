import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import {
  shoppingLists as lists,
  ShoppingListProp,
  Product,
} from "./db/ShoppingList";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//get all created lists
app.get("/lists", (req: Request, res: Response) => {
  res.json(lists);
});

// get list by id
app.get("/lists/:id", async (req, res) => {
  const { id }: { id: string } = req.params;
  const searchedList = lists.find((item) => item.id === id);
  return res.json(searchedList);
});

//create new list
app.post("/lists", (req, res) => {
  const newList: ShoppingListProp = {
    ...req.body,
    createdAt: new Date().getTime(),
    id: uuidv4(),
    products: [],
  };
  lists.unshift(newList);
  return res.send(newList);
});

//add new product to list
app.post("/lists/:id", (req, res) => {
  const { id }: { id: string } = req.params;
  const newProduct: Product = {
    ...req.body,
    id: uuidv4(),
    isPurchased: false,
  };
  const listIndex: number = lists.findIndex((i) => i.id === id);
  lists[listIndex].products.push(newProduct);
  return res.send(lists[listIndex]);
});

//delete list
app.delete("/lists", (req, res) => {
  const { id }: { id: string } = req.body;
  const newProduct: ShoppingListProp = {
    ...req.body,
    createdAt: new Date().getTime(),
    id: uuidv4(),
    products: [],
  };
  const listIndex = lists.findIndex((i) => i.id === id);
  lists.splice(listIndex, 1);
  return res.send();
});

//delete product from list
app.delete("/lists/:id", (req, res) => {
  const { id }: { id: string } = req.params;
  const { productId }: { productId: string } = req.body;
  const listIndex: number = lists.findIndex((i) => i.id === id);
  const productIndex: number = lists[listIndex].products.findIndex(
    (i) => i.id === productId
  );
  lists[listIndex].products.splice(productIndex, 1);
  return res.send();
});

//update product data in list
app.patch("/lists/:id", (req, res) => {
  const { id }: { id: string } = req.params;
  const updatedProduct = { ...req.body };
  const listIndex: number = lists.findIndex((i) => i.id === id);
  const productIndex: number = lists[listIndex].products.findIndex(
    (i) => i.id === updatedProduct.id
  );
  lists[listIndex].products[productIndex] = updatedProduct;
  return res.send(updatedProduct);
});

//update product is purchased in list
app.patch("/lists/:id/selection", (req, res) => {
  const { id }: { id: string } = req.params;
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
});
