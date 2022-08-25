<template>
  <div class="products">
    <NSpin v-if="loading" size="large" class="products__spinner" />
    <ProductList v-else :products="products" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { NSpin } from "naive-ui";
import ProductList from "@/components/products/ProductList.vue";
import { ProductInterface } from "@/components/products/types";
import { getProducts } from "@/api-service/product-client";

export default defineComponent({
  name: "ProductsPage",
  components: { ProductList, NSpin },
  setup() {
    const products = ref<ProductInterface[]>([]);
    const loading = ref<boolean>(false);

    onMounted(async () => {
      try {
        loading.value = true;
        products.value = await getProducts();
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    });

    return { products, loading };
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
