import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { shoppingLists as lists, ShoppingListProp } from "./db/ShoppingList";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/test", (req: Request, res: Response) => {
  res.json("Hello World From the Typescript Server!");
});

//get all created lists
app.get("/lists", (req: Request, res: Response) => {
  res.json(lists);
});

//create new list
app.post("/lists", (req, res) => {
  const newList: ShoppingListProp = {
    ...req.body,
    createdAt: new Date().getTime(),
    id: uuidv4(),
    numberOfProduts: 0,
  };
  lists.push(newList);
  return res.send(newList);
});

//delete list
app.delete("/lists", (req, res) => {
  const { id }: { id: string } = req.body;
  const listIndex = lists.findIndex((i) => i.id == id);
  lists.splice(listIndex, 1);
  return res.send();
});
