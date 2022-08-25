<template>
  <NGrid :cols="3" v-if="id">
    <NGi class="cart-product-tile__container">
      <img
        :src="product.img"
        alt="cart-product-image"
        class="cart-product-tile__image"
      />
      <h2>{{ product.name }}</h2>
    </NGi>
    <NGi class="cart-product-tile__container">
      <h3>Amount: {{ product.amount }}</h3>
      <h3>Price: {{ product.price }}</h3>
    </NGi>
    <NGi class="cart-product-tile__container">
      <NButton
        strong
        secondary
        :loading="loading"
        :disabled="loading"
        size="medium"
        @click="removeProduct"
        >Remove Item</NButton
      >
    </NGi>
  </NGrid>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { NButton, NGrid, NGi } from "naive-ui";
import { CartActions, CartProduct } from "@/store/modules/cart/state";
import { useStore } from "@/store";

export default defineComponent({
  name: "CartProductTile",
  props: {
    product: { type: Object as PropType<CartProduct>, default: () => ({}) },
    id: { type: String, default: null },
  },
  components: { NButton, NGrid, NGi },
  setup(props) {
    const store = useStore();
    const loading = ref(false);
    const removeProduct = async () => {
      try {
        loading.value = true;
        await store.dispatch("cart/" + CartActions.REMOVE_PRODUCT, props.id);
      } catch (error) {
        console.log("error");
      } finally {
        loading.value = false;
      }
    };
    return { removeProduct, loading };
  },
});
</script>

<style scoped lang="scss">
.cart-product-tile {
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
