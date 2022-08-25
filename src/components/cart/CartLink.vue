<template>
  <div class="product-link">
    <NBadge :value="totalItems">
      <router-link to="/cart">Cart</router-link>
    </NBadge>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { NBadge } from "naive-ui";
import { useStore } from "@/store/index";

export default defineComponent({
  name: "ProductList",
  components: {
    NBadge,
  },
  setup() {
    const store = useStore();

    return { totalItems: computed(() => store.getters["cart/totalProducts"]) };
  },
});
</script>

<style scoped lang="scss"></style>
