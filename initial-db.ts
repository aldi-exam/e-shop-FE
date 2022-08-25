interface DataBaseDocument {
  _id: string;
}

interface CartProductInterface {
  name: string;
  img: string;
  amount: number;
  price: number;
}

export interface CartInterface extends DataBaseDocument {
  products: { [key: string]: CartProductInterface };
}

export interface ProductInterface extends DataBaseDocument {
  name: string;
  img: string;
  quantity: number;
  minOrderQuantity: number;
  price: number;
}

export interface UserInterface extends DataBaseDocument {
  email: string;
  cartId: string;
}

interface DataBaseInterface {
  carts: Array<CartInterface>;
  products: Array<ProductInterface>;
  users: Array<UserInterface>;
}

const db: DataBaseInterface = {
  carts: [
    {
      _id: "62863b1f9c1bcb9946a0c8a8",
      products: {
        "62863b689c1bcb9946a0c8ac": {
          amount: 20,

          price: 4,

          img: "https://media.gettyimages.com/photos/bolts-and-nuts-picture-id175425827?s=2048x2048",
          name: "Bolts",
        },
        "62863b689c1bcb9946a0c8ae": {
          amount: 40,

          price: 4,

          img: "https://media.gettyimages.com/photos/self-tapping-screw-isolated-on-white-background-picture-id1216049122?s=2048x2048",
          name: "Screws",
        },
        "62863b689c1bcb9946a0c8af": {
          amount: 3,

          price: 90,

          img: "https://media.gettyimages.com/photos/ladder-isolated-on-white-background-picture-id1012045306?s=2048x2048",
          name: "Ladder",
        },
        "62863b689c1bcb9946a0c8ad": {
          amount: 1,

          price: 3,

          img: "https://media.gettyimages.com/photos/yellow-and-black-handled-philips-and-slot-screwdriver-picture-id155150739?s=2048x2048",
          name: "Screwdrivers",
        },
      },
    },
  ],
  products: [
    {
      _id: "62863b689c1bcb9946a0c8ac",
      name: "Bolts",
      img: "https://media.gettyimages.com/photos/bolts-and-nuts-picture-id175425827?s=2048x2048",
      quantity: 1000,
      minOrderQuantity: 20,
      price: 0.2,
    },
    {
      _id: "62863b689c1bcb9946a0c8ae",
      name: "Screws",
      img: "https://media.gettyimages.com/photos/self-tapping-screw-isolated-on-white-background-picture-id1216049122?s=2048x2048",
      quantity: 1000,
      minOrderQuantity: 40,
      price: 0.1,
    },
    {
      _id: "62863b689c1bcb9946a0c8ad",
      name: "Screwdrivers",
      img: "https://media.gettyimages.com/photos/yellow-and-black-handled-philips-and-slot-screwdriver-picture-id155150739?s=2048x2048",
      quantity: 500,
      minOrderQuantity: 1,
      price: 3.0,
    },
    {
      _id: "62863b689c1bcb9946a0c8af",
      name: "Ladder",
      img: "https://media.gettyimages.com/photos/ladder-isolated-on-white-background-picture-id1012045306?s=2048x2048",
      quantity: 100,
      minOrderQuantity: 1,
      price: 30,
    },
  ],
  users: [
    {
      _id: "62863b1f9c1bcb9946a0c8a5",
      email: "anonymous_user",
      cartId: "62863b1f9c1bcb9946a0c8a8",
    },
  ],
};

export default db;
