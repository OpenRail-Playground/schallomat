<script setup lang="ts">
import TheMap from "../components/TheMap.vue";
import AddressList from "../components/AddressList.vue";
import {ref} from "vue";

const center = ref([13.3565907, 52.4815294])
</script>

<template>
  <main>
    <TheMap :center="center" />
    <AddressList :coordinate="center" :radius="1000" />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 400px;
}
</style>
