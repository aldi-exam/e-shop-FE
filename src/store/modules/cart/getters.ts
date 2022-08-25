import { CartProduct, CartState } from "./state";

export const cartGetters = {
  totalProducts(state: CartState): number {
    let count = 0;
    Object.values(state.products).forEach((product) => {
      count += product.amount;
    });
    return count;
  },
  products(state: CartState): CartProduct[] {
    return Object.entries(state.products).map(([key, value]) => ({
      ...value,
      id: key,
    }));
  },
  amount:
    (state: CartState) =>
    (productId: string): number | undefined => {
      return state.products[productId]?.amount;
    },
};
