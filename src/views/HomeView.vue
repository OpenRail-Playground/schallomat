<script setup lang="ts">
import { ref } from 'vue'
import TheMap from '../components/TheMap.vue'
import AddressList from '../components/AddressList.vue'
import CircleComponent from '../components/CircleComponent.vue'

const center = ref([13.3565907, 52.4815294])
const radius = ref(100)
</script>

<template>
  <section>
    <TheMap :center="center">
      <CircleComponent :coordinate="center" :radius="radius" />
    </TheMap>
    <AddressList :coordinate="center" :radius="radius" />
  </section>
</template>

<style scoped>
section {
  width: 100%;
  height: 400px;
}
</style>
