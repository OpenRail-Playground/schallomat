<script setup lang="ts">
import { computed, ref } from 'vue'
import TheMap from '../components/TheMap.vue'
import MachineWizard from '../components/MachineWizard.vue'
import TheLegend from '../components/TheLegend.vue'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import { storeToRefs } from 'pinia'
import type { TimeOfDay } from '../services/Isophones'
import DayNightSwitch from '../components/DayNightSwitch.vue'

const constructionSiteStore = useConstructionSiteStore()
const { currentStep } = storeToRefs(constructionSiteStore)

const home = ref([13.3565907, 52.4815294])
const time = ref(false)

const timeOfDay = computed<TimeOfDay>(() => (time.value ? 'night' : 'day'))
</script>

<template>
  <div class="base-layout" :class="'step-' + currentStep">
    <main>
      <DayNightSwitch v-if="currentStep === 3" v-model="time" />
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
  grid-template-rows: 3fr 2fr;
  grid-template-areas:
    'aside'
    'main';
  height: calc(100% - 70px);
}

.base-layout.step-1 {
  grid-template-rows: auto 1fr;
}

aside {
  grid-area: aside;
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

main {
  grid-area: main;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Layout für Desktop */
@media (min-width: 768px) {
  .base-layout {
    grid-template-columns: minmax(min-content, 50vw) 1fr;
    grid-template-areas: 'aside main';
    grid-template-rows: 1fr;
  }

  .base-layout.step-1 {
    grid-template-rows: 1fr;
  }
}
</style>
