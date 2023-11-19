import { Model, DataTypes } from "sequelize";
import ShoppingList from "./shoppinglist.model";
import sequelize from "../config";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    isPurchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "product",
    tableName: "products",
    timestamps: false,
  }
);

export default Product;
