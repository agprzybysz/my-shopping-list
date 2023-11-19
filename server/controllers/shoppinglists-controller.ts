import { Request, Response } from "express";
import ShoppingList from "../db/models/shoppinglist.model";
import Product from "../db/models/product.model";
import { Op } from "sequelize";

//get all created lists
export const getAllLists = async (req: Request, res: Response) => {
  try {
    const listsWithProducts = await ShoppingList.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [
        { model: Product, attributes: { exclude: ["shoppingListId"] } },
      ],
    });
    return res.json(listsWithProducts);
  } catch (err) {
    console.error(err);
  }
};

// get list by id
export const getListById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const searchedList = await ShoppingList.findByPk(id, {
      include: [
        { model: Product, attributes: { exclude: ["shoppingListId"] } },
      ],
    });
    return res.json(searchedList);
  } catch (err) {
    console.error(err);
  }
};

//create new list
export const createList = async (req: Request, res: Response) => {
  try {
    const newList = await ShoppingList.create({
      ...req.body,
      createdAt: new Date().getTime(),
    });
    return res.send(newList);
  } catch (err) {
    console.error(err);
  }
};

//delete list
export const deleteList = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const list = await ShoppingList.findByPk(id); //change type
    if (list) {
      await list.destroy();
      return res.send();
    } else {
      return res.status(404).send("List not found");
    }
  } catch (err) {
    console.error(err);
  }
};

//add new product to list
export const addProductToList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newProduct = await Product.create({
      ...req.body,
      isPurchased: false,
      shoppingListId: id,
    });
    return res.send(newProduct);
  } catch (err) {
    console.error(err);
  }
};

//delete product from list
export const deleteProductFromList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { productId }: { productId: number } = req.body;
    const product = await Product.findByPk(productId);
    if (product) {
      await product.destroy();
      return res.send();
    } else {
      return res.status(404).send("Product not found");
    }
  } catch (err) {
    console.error(err);
  }
};

//update product data in list
export const updateProductInList = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({ ...req.body });
      return res.send(product);
    } else {
      return res.status(404).send("Product not found");
    }
  } catch (err) {
    console.error(err);
  }
};

//update product is purchased in list
export const updateProductIsPurchasedParam = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const selectionArr: number[] = [...req.body];
    await Product.update(
      { isPurchased: true },
      {
        where: {
          id: {
            [Op.in]: selectionArr,
          },
          shoppingListId: id,
        },
      }
    );
    await Product.update(
      { isPurchased: false },
      {
        where: {
          id: {
            [Op.notIn]: selectionArr,
          },
          shoppingListId: id,
        },
      }
    );
    return res.send();
  } catch (err) {
    console.error(err);
  }
};
