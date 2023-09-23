"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const ShoppingList_1 = require("./db/ShoppingList");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
//get all created lists
app.get("/lists", (req, res) => {
    res.json(ShoppingList_1.shoppingLists);
});
// get list by id
app.get("/lists/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const searchedList = ShoppingList_1.shoppingLists.find((item) => item.id === id);
    return res.json(searchedList);
}));
//create new list
app.post("/lists", (req, res) => {
    const newList = Object.assign(Object.assign({}, req.body), { createdAt: new Date().getTime(), id: (0, uuid_1.v4)(), products: [] });
    ShoppingList_1.shoppingLists.push(newList);
    return res.send(newList);
});
//add new product to list
app.post("/lists/:id", (req, res) => {
    const { id } = req.params;
    const newProduct = Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)(), isPurchased: false });
    const listIndex = ShoppingList_1.shoppingLists.findIndex((i) => i.id === id);
    ShoppingList_1.shoppingLists[listIndex].products.push(newProduct);
    return res.send(ShoppingList_1.shoppingLists[listIndex]);
});
//delete list
app.delete("/lists", (req, res) => {
    const { id } = req.body;
    const newProduct = Object.assign(Object.assign({}, req.body), { createdAt: new Date().getTime(), id: (0, uuid_1.v4)(), products: [] });
    const listIndex = ShoppingList_1.shoppingLists.findIndex((i) => i.id === id);
    ShoppingList_1.shoppingLists.splice(listIndex, 1);
    return res.send();
});
//delete product from list
app.delete("/lists/:id", (req, res) => {
    const { id } = req.params;
    const { productId } = req.body;
    const listIndex = ShoppingList_1.shoppingLists.findIndex((i) => i.id === id);
    const productIndex = ShoppingList_1.shoppingLists[listIndex].products.findIndex((i) => i.id === productId);
    ShoppingList_1.shoppingLists[listIndex].products.splice(productIndex, 1);
    return res.send();
});
//update product data in list
app.patch("/lists/:id", (req, res) => {
    const { id } = req.params;
    const updatedProduct = Object.assign({}, req.body);
    const listIndex = ShoppingList_1.shoppingLists.findIndex((i) => i.id === id);
    const productIndex = ShoppingList_1.shoppingLists[listIndex].products.findIndex((i) => i.id === updatedProduct.id);
    ShoppingList_1.shoppingLists[listIndex].products[productIndex] = updatedProduct;
    return res.send();
});
