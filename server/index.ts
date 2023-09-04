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
  name: string;
  createdAt: string;
  numberOfProduts?: number;
};

const lists: ListProp[] = [
  {
    id: 0,
    name: "Weekly shopping",
    createdAt: "Jan 9, 2022",
    numberOfProduts: 9,
  },
  {
    id: 1,
    name: "Birthday shopping",
    createdAt: "Mar 9, 2022",
    numberOfProduts: 19,
  },
  {
    id: 2,
    name: "Pizza",
    createdAt: "Dec 9, 2022",
    numberOfProduts: 29,
  },
  {
    id: 3,
    name: "Grocery",
    createdAt: "Dec 12, 2022",
    numberOfProduts: 29,
  },
];

//all created lists
app.get("/lists", (req: Request, res: Response) => {
  res.json(lists);
});
