import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";

const vueApp = createApp(App);
vueApp.use(store, key);
vueApp.use(router);
vueApp.mount("#app");

export default vueApp;
