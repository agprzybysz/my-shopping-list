import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import shoppingListRoutes from "./routes/shopinglists-routes";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/lists", shoppingListRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
