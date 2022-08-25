<template>
  <div class="cart">
    <NSpin v-if="loading" size="large" />
    <CartProductList v-else :products="products" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { NSpin } from "naive-ui";

import { ref, computed } from "vue";
import { useStore } from "@/store";
import { CartActions } from "@/store/modules/cart/state";
import CartProductList from "@/components/cart/CartProductList.vue";

export default defineComponent({
  name: "CartPage",
  components: { NSpin, CartProductList },
  setup() {
    const store = useStore();

    const loading = ref<boolean>(false);

    onMounted(async () => {
      try {
        await store.dispatch("cart/" + CartActions.GET_CART);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    });

    return {
      products: computed(() => store.getters["cart/products"]),
      loading,
    };
  },
});
</script>

<style scoped lang="scss">
.products {
  padding: 2rem;
  display: flex;
  justify-content: center;

  &__spinner {
    padding-top: 10rem;
  }

  &__cotaniner {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
  }
}
</style>
