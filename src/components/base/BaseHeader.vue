<template>
  <div class="header__container">
    <router-link to="/">Home</router-link>
    <router-link to="/products">Products</router-link>
    <CartLink />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CartLink from "@/components/cart/CartLink.vue";

export default defineComponent({
  name: "BaseHeader",
  components: { CartLink },
});
</script>

<style>
.header__container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100vw;
}
</style>
