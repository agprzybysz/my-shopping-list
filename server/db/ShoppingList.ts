export type Product = {
  id: string;
  productName: string;
  quantity: string;
  notes: string;
  isPurchased: boolean;
};

export type ShoppingListProps = {
  id: string;
  title: string;
  shop: string;
  createdAt: number;
  products: Product[];
};

//initaial data sample
export const shoppingLists: ShoppingListProps[] = [
  {
    id: "0",
    title: "Weekly shopping",
    shop: "Lidl",
    createdAt: new Date(2023, 8, 9, 11, 0).valueOf(),
    products: [
      {
        id: "0",
        productName: "apple",
        quantity: "1kg",
        notes: "high priority",
        isPurchased: false,
      },
      {
        id: "1",
        productName: "honey",
        quantity: "",
        notes: "",
        isPurchased: false,
      },
      {
        id: "2",
        productName: "milk",
        quantity: "2l",
        notes: "",
        isPurchased: true,
      },
      {
        id: "3",
        productName: "butter",
        quantity: "1",
        notes: "",
        isPurchased: true,
      },
      {
        id: "4",
        productName: "rice",
        quantity: "1",
        notes: "",
        isPurchased: false,
      },
      {
        id: "5",
        productName: "eggs",
        quantity: "10",
        notes: "size L",
        isPurchased: false,
      },
      {
        id: "6",
        productName: "brown sugar",
        quantity: "1kg",
        notes: "",
        isPurchased: false,
      },
      {
        id: "7",
        productName: "mustard",
        quantity: "1",
        notes: "",
        isPurchased: false,
      },
      {
        id: "8",
        productName: "salmon filet",
        quantity: "1kg",
        notes: "",
        isPurchased: false,
      },
    ],
  },
  {
    id: "1",
    title: "Bread",
    shop: "Bakery",
    createdAt: new Date(2023, 8, 10, 11, 0).valueOf(),
    products: [
      {
        id: "0",
        productName: "Bread",
        quantity: "1",
        notes: "",
        isPurchased: false,
      },
      {
        id: "1",
        productName: "Donuts",
        quantity: "3",
        notes: "",
        isPurchased: false,
      },
      {
        id: "2",
        productName: "Croissants",
        quantity: "2",
        notes: "",
        isPurchased: false,
      },
    ],
  },
  {
    id: "2",
    title: "Fruits and Vegetables",
    shop: "Greengrocer's",
    createdAt: new Date(2023, 8, 8, 11, 0).valueOf(),
    products: [
      {
        id: "1",
        productName: "Tomato",
        quantity: "2kg",
        notes: "",
        isPurchased: false,
      },
      {
        id: "2",
        productName: "Strawberry",
        quantity: "1kg",
        notes: "",
        isPurchased: false,
      },
      {
        id: "3",
        productName: "Red onion",
        quantity: "0.5kg",
        notes: "",
        isPurchased: false,
      },
      {
        id: "4",
        productName: "Lemon",
        quantity: "3",
        notes: "",
        isPurchased: false,
      },
    ],
  },
];
