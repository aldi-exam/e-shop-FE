import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { CartState } from "./modules/cart/state";
import cart from "./modules/cart/state";
import user, { UserState } from "./modules/user/state";
export interface RootState {
  isLoading: boolean;
  cart: CartState;
  user: UserState;
}

export enum RootActions {
  AUTHORIZE = "AUTHORIZE",
}

export const key: InjectionKey<Store<RootState>> = Symbol("RootStore");

export default createStore<RootState>({
  state: {
    isLoading: false,
  } as RootState,
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
