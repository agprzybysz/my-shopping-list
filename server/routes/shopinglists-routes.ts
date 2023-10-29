import express from "express";
import * as shoppingListRoutes from "../controllers/shoppinglists-controller";

const router = express.Router();

router.get("/", shoppingListRoutes.getAllLists);
router.post("/", shoppingListRoutes.createList);
router.delete("/", shoppingListRoutes.deleteList);
router.get("/:id", shoppingListRoutes.getListById);
router.post("/:id", shoppingListRoutes.addProductToList);
router.delete("/:id", shoppingListRoutes.deleteProductFromList);
router.patch("/:id", shoppingListRoutes.updateProductInList);
router.patch("/:id/selection", shoppingListRoutes.updateProductIsPurchasedParam
);

export default router;
