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
const lists = [
    {
        name: "Weekly shopping",
        createdAt: "Jan 9, 2022",
        numberOfProduts: 9,
    },
    {
        name: "Birthday shopping",
        createdAt: "Mar 9, 2022",
        numberOfProduts: 19,
    },
    {
        name: "Pizza",
        createdAt: "Dec 9, 2022",
        numberOfProduts: 29,
    },
    {
        name: "Grocery",
        createdAt: "Dec 12, 2022",
        numberOfProduts: 29,
    },
];
//all created lists
app.get("/lists", (req, res) => {
    res.json(lists);
});
