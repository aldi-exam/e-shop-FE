import { CartState } from "@/store/modules/cart/state";
import db, { CartInterface } from "./db";
import { sleep } from "./helper";

const cartId = "62863b1f9c1bcb9946a0c8a8";

const getDbCart = () => {
  return db.carts.find((cart) => cart._id === cartId);
};

const updateDbCart = (cart: CartInterface) => {
  const index = db.carts.findIndex((cart) => cart._id === cartId);
  if (index >= 0) db.carts[index] = cart;
  else throw new Error("Cart not found");
};

export const getCart = async (): Promise<CartState> => {
  try {
    await sleep();
    const cart = db.carts.find((cart) => cart._id === cartId);

    if (!cart) {
      throw new Error("cart not found");
    }

    return cart;
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

export const updateCart = async (payload: {
  amount: number;
  id: string;
}): Promise<CartState | void> => {
  try {
    await sleep();
    const { amount, id } = payload;

    if (!amount || !id) throw new Error("Bad request");

    if (!cartId) throw new Error("User has no cart");

    const cart = db.carts.find((cart) => cart._id === cartId);
    const product = db.products.find((product) => product._id === id);
    if (!cart) throw new Error("User has no cart");
    if (!product) throw new Error("Desired product was not found");

    let newAmount = amount;
    if (cart.products[id]?.amount) newAmount += cart.products[id]?.amount;
    if (newAmount < product.minOrderQuantity && newAmount > 0)
      newAmount = product.minOrderQuantity;
    if (newAmount <= 0) newAmount = 0;

    if (newAmount <= product.quantity) {
      cart.products[id] = {
        amount: newAmount,
        price: product.price * newAmount,
        img: product.img,
        name: product.name,
      };
    } else {
      throw new Error(
        JSON.stringify({
          type: "Cannot add to cart",
          reason: "Too many items requested",
          requested: newAmount,
          available: product.quantity,
        })
      );
    }
    updateDbCart(cart);

    return cart;
  } catch (error) {
    console.log(error);
    throw new Error("Couldnt update cart");
  }
};

export const removeProduct = async (id: string): Promise<CartState | void> => {
  try {
    await sleep();

    const cart = db.carts.find((cart) => cart._id === cartId);
    if (!cart) throw new Error("User has no cart");

    delete cart.products[id];

    updateDbCart(cart);
    return cart;
  } catch (error) {
    console.log(error);
    Promise.reject();
  }
};

export const clearCart = async (): Promise<CartState | void> => {
  try {
    await sleep();
    const cart = getDbCart();
    if (!cart) throw new Error("User has no cart");

    cart.products = {};

    await updateDbCart(cart);

    return cart;
  } catch (error) {
    console.log(error);
    Promise.reject();
  }
};
