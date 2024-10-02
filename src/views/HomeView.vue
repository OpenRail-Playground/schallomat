<script setup lang="ts">
import { computed, ref } from 'vue'
import TheMap from '../components/TheMap.vue'
import MachineWizard from '../components/MachineWizard.vue'
import TheLegend from '../components/TheLegend.vue'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import { storeToRefs } from 'pinia'
import type { TimeOfDay } from '../services/Isophones'

const constructionSiteStore = useConstructionSiteStore()
const { currentStep } = storeToRefs(constructionSiteStore)

const home = ref([13.3565907, 52.4815294])
const time = ref(false)

const timeOfDay = computed<TimeOfDay>(() => (time.value ? 'night' : 'day'))
</script>

<template>
  <div class="base-layout">
    <main>
      <label data-icon-before="day" data-icon-variant-before="20-outline" id="day-label"
        >Tagzeitraum</label
      >
      <input
        type="checkbox"
        role="switch"
        class="elm-toggle"
        id="day-night-toggle"
        v-model="time"
      />
      <label
        class="elm-label"
        for="day-night-toggle"
        id="night-label"
        data-icon-before="night"
        data-icon-variant-before="20-outline"
        >Nachtzeitraum</label
      >

      <TheMap :center="home" :time="timeOfDay"></TheMap>
      <TheLegend v-if="currentStep === 3" :time="timeOfDay" />
    </main>
    <aside>
      <MachineWizard />
    </aside>
  </div>
</template>

<style scoped>
.base-layout {
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  gap: 1rem;
  grid-template-areas:
    'aside'
    'main';
}

aside {
  grid-area: aside;
}

main {
  grid-area: main;
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

/* Layout für Desktop */
@media (min-width: 768px) {
  .base-layout {
    grid-template-columns: minmax(min-content, 50vw) 1fr;
    grid-template-areas: 'aside main';
  }
}
</style>
