import {
  clearCart,
  getCart,
  removeProduct,
  updateCart,
} from "@/api-service/cart-client";
import { RootState } from "@/store";
import { ActionContext } from "vuex";
import { cartGetters } from "./getters";

export interface CartProduct {
  amount: number;
  price: number;
  name: string;
  img: string;
  id?: string;
}

export interface CartState {
  products: {
    [key: string]: CartProduct;
  };
}

export enum CartActions {
  ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART",
  GET_CART = "GET_CART",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  CLEAR_CART = "CLEAR_CART",
}

export enum CartMutations {
  SET_CART = "SET_CART",
}

type Context = ActionContext<CartState, RootState>;

export default {
  namespaced: true,
  state: (): CartState => ({
    products: {},
  }),
  mutations: {
    [CartMutations.SET_CART]: function (
      state: CartState,
      newCart: CartState
    ): void {
      state.products = newCart.products;
    },
  },
  actions: {
    [CartActions.ADD_PRODUCT_TO_CART]: async function (
      { commit }: Context,
      { amount, id }: { id: string; amount: number }
    ): Promise<void> {
      try {
        const cart = await updateCart({ amount, id });
        if (cart) commit(CartMutations.SET_CART, cart);
        else throw new Error("Requested amount is not available");
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    [CartActions.GET_CART]: async function ({
      commit,
    }: Context): Promise<void> {
      try {
        const cart = await getCart();
        commit(CartMutations.SET_CART, cart);
      } catch (error) {
        console.log(error);
      }
    },
    [CartActions.REMOVE_PRODUCT]: async function (
      { commit }: Context,
      id: string
    ): Promise<void> {
      try {
        const cart = await removeProduct(id);
        commit(CartMutations.SET_CART, cart);
      } catch (error) {
        console.log(error);
      }
    },
    [CartActions.CLEAR_CART]: async function ({
      commit,
    }: Context): Promise<void> {
      try {
        const cart = await clearCart();
        commit(CartMutations.SET_CART, cart);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: cartGetters,
};
