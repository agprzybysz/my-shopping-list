import ShoppingList from "./models/shoppinglist.model";
import Product from "./models/product.model";

const dbInit = async () => {
  Product.belongsTo(ShoppingList);
  ShoppingList.hasMany(Product);

  try {
    await ShoppingList.sync({ force: true });
    console.log("Table Shopping List created");
  } catch (err) {
    console.error(err);
  }
  try {
    await Product.sync({ force: true });
    console.log("Table Product created");
  } catch (err) {
    console.error(err);
  }

  try {
    ShoppingList.bulkCreate(
      [
        {
          title: "Weekly shopping",
          shop: "Lidl",
          createdAt: new Date(2023, 8, 9, 11, 0),
          products: [
            {
              productName: "apple",
              quantity: "1kg",
              notes: "high priority",
              isPurchased: false,
            },
            {
              productName: "honey",
              quantity: "",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "milk",
              quantity: "2l",
              notes: "",
              isPurchased: true,
            },
            {
              productName: "butter",
              quantity: "1",
              notes: "",
              isPurchased: true,
            },
            {
              productName: "rice",
              quantity: "1",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "eggs",
              quantity: "10",
              notes: "size L",
              isPurchased: false,
            },
            {
              productName: "brown sugar",
              quantity: "1kg",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "mustard",
              quantity: "1",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "salmon filet",
              quantity: "1kg",
              notes: "",
              isPurchased: false,
            },
          ],
        },
        {
          title: "Bread",
          shop: "Bakery",
          createdAt: new Date(2023, 8, 10, 11, 0),
          products: [
            {
              productName: "Bread",
              quantity: "1",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "Donuts",
              quantity: "3",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "Croissants",
              quantity: "2",
              notes: "",
              isPurchased: false,
            },
          ],
        },
        {
          title: "Fruits and Vegetables",
          shop: "Greengrocer's",
          createdAt: new Date(2023, 8, 8, 11, 0),
          products: [
            {
              productName: "Tomato",
              quantity: "2kg",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "Strawberry",
              quantity: "1kg",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "Red onion",
              quantity: "0.5kg",
              notes: "",
              isPurchased: false,
            },
            {
              productName: "Lemon",
              quantity: "3",
              notes: "",
              isPurchased: false,
            },
          ],
        },
      ],
      {
        include: [Product],
      }
    );
    console.log("Data inserted to tables");
  } catch (err) {
    console.log(err);
  }
};
export default dbInit;
