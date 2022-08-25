import { RootState } from "@/store";
import { ActionContext } from "vuex";

export type UserState = Record<string, unknown>;

export enum UserActions {
  AUTHORIZE = "AUTHORIZE",
}

export type Context = ActionContext<UserState, RootState>;

export default {
  namespaced: true,
  state: (): UserState => ({}),
  actions: {
    [UserActions.AUTHORIZE]: async function (): Promise<void> {
      try {
        // TODO implement user authorization
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};
