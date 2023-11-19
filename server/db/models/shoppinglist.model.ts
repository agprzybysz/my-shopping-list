import { Model, DataTypes } from "sequelize";
import sequelize from "../config";
import Product from "./product.model";

class ShoppingList extends Model {}

ShoppingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "shoppingList",
    tableName: "lists",
    timestamps: true,
    createdAt: false,
  }
);

export default ShoppingList;
