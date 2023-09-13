type Product = {
  id: string;
  productName: string;
  quantity: string;
  notes: string;
  done: boolean;
};

export type ShoppingListProp = {
  id: string;
  title: string;
  shop: string;
  createdAt: number;
  products: Product[];
};

//initaial data sample
export const shoppingLists: ShoppingListProp[] = [
  {
    id: "0",
    title: "Weekly shopping",
    shop: "Lidl",
    createdAt: new Date(2023, 0, 1, 11, 0).valueOf(),
    products: [
      {
        id: "1",
        productName: "apple",
        quantity: "1kg",
        notes: "high priority",
        done: false,
      },
      { id: "2", productName: "milk", quantity: "2l", notes: "", done: false },
      { id: "3", productName: "butter", quantity: "1", notes: "", done: false },
    ],
  },
  {
    id: "1",
    title: "Birthday shopping",
    shop: "Lidl",
    createdAt: new Date(2023, 0, 3, 11, 0).valueOf(),
    products: [
      {
        id: "1",
        productName: "Salmon filet",
        quantity: "1kg",
        notes: "",
        done: false,
      },
      {
        id: "2",
        productName: "Potato",
        quantity: "3kg",
        notes: "",
        done: false,
      },
    ],
  },
  {
    id: "2",
    title: "Pizza",
    shop: "Lidl",
    createdAt: new Date(2023, 0, 7, 11, 0).valueOf(),
    products: [],
  },
  {
    id: "3",
    title: "Grocery",
    shop: "market",
    createdAt: new Date(2023, 0, 10, 11, 0).valueOf(),
    products: [
      {
        id: "1",
        productName: "Tomato",
        quantity: "2kg",
        notes: "",
        done: false,
      },
      {
        id: "2",
        productName: "Strawberry",
        quantity: "1kg",
        notes: "",
        done: false,
      },
      {
        id: "3",
        productName: " Red onion",
        quantity: "0.5kg",
        notes: "",
        done: false,
      },
      { id: "4", productName: "Lemon", quantity: "3", notes: "", done: false },
    ],
  },
];
