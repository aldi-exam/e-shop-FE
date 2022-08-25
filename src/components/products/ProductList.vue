<template>
  <div class="product-list">
    <ProductTile
      v-for="product in products"
      :key="product._id"
      :product="product"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductTile from "@/components/products/ProductTile.vue";
import { ProductInterface } from "./types";

export default defineComponent({
  name: "ProductList",
  props: {
    products: Array as PropType<ProductInterface[]>,
    default: [],
  },
  components: {
    ProductTile,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product-list {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>
