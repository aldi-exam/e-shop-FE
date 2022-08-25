<template>
  <div class="home">
    <h1>{{ data }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "HomePage",
  setup() {
    const data = ref("Hello There");

    return {
      data,
    };
  },
});
</script>
