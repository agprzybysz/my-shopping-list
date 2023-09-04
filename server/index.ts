import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

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

type ListProp = {
  id: number;
  title: string;
  shop: string;
  createdAt: number;
  numberOfProduts?: number;
};

// initial data
const lists: ListProp[] = [
  {
    id: 0,
    title: "Weekly shopping",
    shop: "Lidl",
    createdAt: new Date(2023, 0, 1, 11, 0).valueOf(),
    numberOfProduts: 9,
  },
  {
    id: 1,
    title: "Birthday shopping",
    shop: "Lidl",
    createdAt: new Date(2023, 0, 3, 11, 0).valueOf(),
    numberOfProduts: 19,
  },
  {
    id: 2,
    title: "Pizza",
    shop: "Lidl",
    createdAt: new Date(2023, 0, 7, 11, 0).valueOf(),
    numberOfProduts: 29,
  },
  {
    id: 3,
    title: "Grocery",
    shop: "market",
    createdAt: new Date(2023, 0, 10, 11, 0).valueOf(),
    numberOfProduts: 29,
  },
];

//get all created lists
app.get("/lists", (req: Request, res: Response) => {
  res.json(lists);
});

//create new list
app.post("/lists", (req, res) => {
  const newList: ListProp = {
    ...req.body,
    createdAt: new Date().getTime(),
    id: lists.length,
    numberOfProduts: 0,
  };
  lists.push(newList);
  res.status(201).json("New List created");
});
