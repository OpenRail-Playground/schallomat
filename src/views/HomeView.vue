<script setup lang="ts">
import { ref } from 'vue'
import TheMap from '../components/TheMap.vue'
import AddressList from '../components/AddressList.vue'
import CircleComponent from '../components/CircleComponent.vue'
import MachineWizard from '../components/MachineWizard.vue'
import { storeToRefs } from 'pinia'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'

const home = ref([13.3565907, 52.4815294])
const radius = ref(100)

const { center } = storeToRefs(useConstructionSiteStore())
</script>

<template>
  <div class="base-layout">
    <main>
      <label data-icon-before="day" data-icon-variant-before="20-outline" id="day-label">Tagzeitraum</label>
      <input type="checkbox" role="switch" class="elm-toggle" id="day-night-toggle" />
      <label class="elm-label" for="day-night-toggle" id="night-label" data-icon-before="night" data-icon-variant-before="20-outline">Nachtzeitraum</label>

      <TheMap :center="home">
        <CircleComponent v-if="center" :center="center" :radius="radius" />
      </TheMap>
    </main>
    <aside>
      <MachineWizard />
    </aside>
    <footer>
      <AddressList v-if="center" :coordinate="center" :radius="radius" />
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

#day-label {
  position: relative;
  top: -0.3rem;
  display: inline-block;
  margin-right: 0.5rem;
}

#night-label {
  margin-left: 0.5rem;
}
</style>
