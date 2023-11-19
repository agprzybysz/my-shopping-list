export type ProductProps = {
  id: number;
  productName: string;
  quantity: string;
  notes: string;
  isPurchased: boolean;
};

export type GetShoppingListsProps = {
  id: number;
  title: string;
  shop: string;
  createdAt: string;
  products: ProductProps[];
};

export type CreateShoppingListsProps = {
  title: string;
  shop: string;
};

export type AddNewProductProps = {
  productName: string;
  quantity: string;
  notes: string | undefined | null;
};
