<template>
  <NNotificationProvider placement="bottom-right">
    <div id="nav">
      <BaseHeader />
    </div>
    <NSpin v-if="loading" size="large" />
    <router-view v-else />
  </NNotificationProvider>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import BaseHeader from "@/components/base/BaseHeader.vue";
import { useStore } from "@/store";
import { NSpin, NNotificationProvider } from "naive-ui";
import { CartActions } from "./store/modules/cart/state";
import { UserActions } from "./store/modules/user/state";

export default defineComponent({
  name: "App",
  components: { BaseHeader, NSpin, NNotificationProvider },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const globalSetup = async () => {
      try {
        loading.value = true;
        await store.dispatch("user/" + UserActions.AUTHORIZE);
        await store.dispatch("cart/" + CartActions.GET_CART);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => await globalSetup());

    return { loading };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
