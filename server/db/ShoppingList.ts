export type ShoppingListProp = {
  id: string;
  title: string;
  shop: string;
  createdAt: number;
  numberOfProduts?: number;
};

//initaial data sample
export const shoppingLists: ShoppingListProp[] = [
  {
      id: "0",
      title: "Weekly shopping",
      shop: "Lidl",
      createdAt: new Date(2023, 0, 1, 11, 0).valueOf(),
      numberOfProduts: 9,
  },
  {
      id: "1",
      title: "Birthday shopping",
      shop: "Lidl",
      createdAt: new Date(2023, 0, 3, 11, 0).valueOf(),
      numberOfProduts: 19,
  },
  {
      id: "2",
      title: "Pizza",
      shop: "Lidl",
      createdAt: new Date(2023, 0, 7, 11, 0).valueOf(),
      numberOfProduts: 29,
  },
  {
      id: "3",
      title: "Grocery",
      shop: "market",
      createdAt: new Date(2023, 0, 10, 11, 0).valueOf(),
      numberOfProduts: 29,
  },
];