import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { CartState } from "./modules/cart/state";
import cart from "./modules/cart/state";
import user from "./modules/user/state";

interface CartProductInterface {
  count: number;
  price: number;
}

export interface CartInterface {
  products: {
    [key: string]: CartProductInterface;
  };
}

export interface RootState {
  isLoading: boolean;
  cart?: CartState;
}

export enum RootActions {
  AUTHORIZE = "AUTHORIZE",
}

export const key: InjectionKey<Store<RootState>> = Symbol("RootStore");

export default createStore<RootState>({
  state: {
    isLoading: false,
  },
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
  },
});

export function useStore(): Store<RootState> {
  return baseUseStore(key);
}
