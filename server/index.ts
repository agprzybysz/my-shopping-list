import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import shoppingListRoutes from "./routes/shopinglists-routes";
import sequelize from "./db/config";
import dbInit from "./db/init";

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database: ", err);
  });

dbInit()

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use("/lists", shoppingListRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
