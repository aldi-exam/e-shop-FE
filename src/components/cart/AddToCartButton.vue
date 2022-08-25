<template>
  <div class="add-to-cart-button">
    <div class="add-to-cart-button__control-container">
      <NButton
        class="add-to-cart-button__control-button"
        text
        @click="incrementAmount()"
      >
        <PlusIcon :size="20" />
      </NButton>
      <NButton
        class="add-to-cart-button__control-button"
        text
        @click="decrementAmount()"
      >
        <MinusIcon :size="20" />
      </NButton>
    </div>
    <input
      type="number"
      id="quantity"
      v-model="amount"
      @change="onInputChange"
      class="add-to-cart-button__input"
    />
    <NButton
      :disabled="disabled"
      :loading="loading"
      text
      @click="onAddToCart()"
    >
      <CartPlusIcon v-if="amount >= 0" />
      <CartMinusIcon v-else />
    </NButton>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { NButton, useNotification } from "naive-ui";
import CartPlusIcon from "@/components/icons/CartPlusIcon.vue";
import { useStore } from "@/store";
import { CartActions } from "@/store/modules/cart/state";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MinusIcon from "@/components/icons/MinusIcon.vue";
import CartMinusIcon from "../icons/CartMinusIcon.vue";

export default defineComponent({
  name: "AddToCartButton",
  components: {
    NButton,
    CartPlusIcon,
    PlusIcon,
    MinusIcon,
    CartMinusIcon,
  },
  props: {
    productId: {
      type: String,
      default: null,
    },
    minOrderQuantity: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const notification = useNotification();
    const store = useStore();
    const amount = ref<number>(0);
    const disabled = computed(() => {
      return !props.productId || !amount.value || loading.value;
    });
    const loading = ref(false);

    const incrementAmount = () => {
      amount.value++;
    };
    const decrementAmount = () => {
      amount.value--;
    };

    const onInputChange = (event: any) => {
      amount.value = Number(event.target.value);
    };

    const onAddToCart = async () => {
      try {
        loading.value = true;
        await store.dispatch("cart/" + CartActions.ADD_PRODUCT_TO_CART, {
          amount: amount.value,
          id: props.productId,
        });
      } catch (error) {
        console.error(error);
        notification.error({
          meta: "Requested amount is not availbale",
          content: "Couldnt add product to cart",
          duration: 3000,
        });
      } finally {
        loading.value = false;
        amount.value = 0;
      }
    };

    return {
      amount,
      onAddToCart,
      loading,
      disabled,
      incrementAmount,
      decrementAmount,
      onInputChange,
    };
  },
});
</script>

<style scoped lang="scss">
.add-to-cart-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;

  &__input {
    text-align: center;
    border: none;
    font-size: 20px;
    width: 6rem;
    font-weight: 600;
  }

  &__control-container {
    display: flex;
    flex-direction: column;
  }

  &__control-button {
    height: 20px;
    font-size: 28px;
    font-weight: 800 !important;

    &:hover {
      color: rgb(133, 133, 108) !important;
    }
  }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
