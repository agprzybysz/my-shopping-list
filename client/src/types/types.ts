export type ProductProps = {
  id: string;
  productName: string;
  quantity: string;
  notes: string;
  isPurchased: boolean;
};

export type GetShoppingListsProps = {
  id: string;
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

