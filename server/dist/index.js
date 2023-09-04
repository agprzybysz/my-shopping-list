"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
app.get("/test", (req, res) => {
    res.json("Hello World From the Typescript Server!");
});
// initial data
const lists = [
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
app.get("/lists", (req, res) => {
    res.json(lists);
});
//create new list
app.post("/lists", (req, res) => {
    const newList = Object.assign(Object.assign({}, req.body), { createdAt: new Date().getTime(), id: lists.length, numberOfProduts: 0 });
    lists.push(newList);
    res.status(201).json("New List created");
});
