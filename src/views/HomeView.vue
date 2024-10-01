<script setup lang="ts">
import { ref } from 'vue'
import TheMap from '../components/TheMap.vue'
import AddressList from '../components/AddressList.vue'
import CircleComponent from '../components/CircleComponent.vue'
import MachineWizard from '../components/MachineWizard.vue'

const center = ref([13.3565907, 52.4815294])
const radius = ref(100)
</script>

<template>
  <div class="base-layout">
    <main>
      <TheMap :center="center">
        <CircleComponent :center="center" :radius="radius" />
      </TheMap>
    </main>
    <aside>
      <MachineWizard />
    </aside>
    <footer>
      <AddressList :coordinate="center" :radius="radius" />
    </footer>
  </div>
</template>

<style scoped>
.base-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

footer {
  grid-area: 2 / 1 / 3 / 3;
}

aside {
  grid-area: 1 / 1 / 2 / 2;
}

main {
  grid-area: 1 / 2 / 2 / 3;
}
</style>
