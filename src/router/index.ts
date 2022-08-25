import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ProductsPage from "../views/ProductsPage.vue";
import CartPage from "../views/CartPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/products",
    name: "Products",
    component: ProductsPage,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
