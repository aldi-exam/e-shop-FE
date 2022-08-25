<template>
  <div class="cart-product-list">
    <CartProductTile
      v-for="product in sortedProductList"
      :key="product.productId"
      :product="product"
      :id="product.id"
    />

    <NButton
      :loading="loading"
      v-if="!!totalItems"
      strong
      secondary
      type="primary"
      size="large"
      @click="clearCart"
      >Clear Cart</NButton
    >
    <h1 v-else>Cart is empty :(</h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { NButton } from "naive-ui";
import { CartActions, CartProduct } from "@/store/modules/cart/state";
import { useStore } from "@/store";
import CartProductTile from "@/components/cart/CartProductTile.vue";

export default defineComponent({
  name: "CartProductList",
  props: {
    products: {
      type: Object as PropType<CartProduct[]>,
      default: () => ({}),
    },
  },
  components: { NButton, CartProductTile },
  setup(props) {
    const store = useStore();
    const loading = ref(false);
    const clearCart = async () => {
      try {
        loading.value = true;
        await store.dispatch("cart/" + CartActions.CLEAR_CART);
      } catch (error) {
        console.log("error");
      } finally {
        loading.value = false;
      }
    };

    const sortedProductList = computed(() => {
      const sortedList = [...props.products];

      // TODO implement Sort cart products by price (asc), if price is equal sort by amount (dsc)

      return sortedList;
    });

    return {
      clearCart,
      loading,
      totalItems: computed(() => store.getters["cart/totalProducts"]),
      sortedProductList,
    };
  },
});
</script>

<style scoped lang="scss">
.cart-product-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;

  &__container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    flex-wrap: wrap;
  }

  &__image {
    max-height: 3rem;
  }
}
</style>
