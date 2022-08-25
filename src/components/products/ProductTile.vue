<template>
  <div class="product-tile">
    <NBadge
      v-if="amountInCart"
      :value="amountInCart"
      class="product-tile__cart-icon"
      type="success"
    >
      <CartIcon :size="30"
    /></NBadge>
    <h1>{{ product.name }}</h1>
    <h4>{{ `${product.price}$ each` }}</h4>
    <img
      class="product-tile__image"
      :src="product.image"
      :alt="`product_image`"
    />
    <AddToCartButton
      :product-id="product._id"
      :minOrderQuantity="product.minOrderQuantity"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { NBadge } from "naive-ui";
import AddToCartButton from "@/components/cart/AddToCartButton.vue";
import CartIcon from "@/components/icons/CartIcon.vue";
import { ProductInterface } from "./types";
import { useStore } from "@/store";

export default defineComponent({
  name: "ProductTile",
  components: { AddToCartButton, CartIcon, NBadge },
  props: {
    product: {
      type: Object as PropType<ProductInterface>,
      default: () => ({}),
    },
  },
  setup(props) {
    const store = useStore();
    const amountInCart = computed(() =>
      store.getters["cart/amount"](props.product._id)
    );

    return { amountInCart };
  },
});
</script>

<style scoped lang="scss">
h1 {
  margin: 0;
}
.product-tile {
  width: 15rem;
  height: 20rem;
  border: 0.5px solid rgba(0, 0, 0, 0.35);
  border-radius: 0.5rem;
  box-shadow: 0 10px 9px rgba(0, 0, 0, 0.35);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &__image {
    max-width: 13rem;
  }

  &__cart-icon {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}
</style>
