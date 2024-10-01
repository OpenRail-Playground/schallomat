<script setup lang="ts">
import { ref } from 'vue'
import TheMap from '../components/TheMap.vue'
import MachineWizard from '../components/MachineWizard.vue'
import TheLegend from '../components/TheLegend.vue';
import { useConstructionSiteStore } from '../stores/constructionSiteStore';
import { storeToRefs } from 'pinia';

const constructionSiteStore = useConstructionSiteStore()
const { currentStep } = storeToRefs(constructionSiteStore)

const home = ref([13.3565907, 52.4815294])
const isNight = ref(false)
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
        v-model="isNight"
      />
      <label
        class="elm-label"
        for="day-night-toggle"
        id="night-label"
        data-icon-before="night"
        data-icon-variant-before="20-outline"
        >Nachtzeitraum</label
      >

      <TheMap :center="home" :night="isNight"></TheMap>
      <TheLegend v-if="currentStep === 3" />
    </main>
    <aside>
      <MachineWizard />
    </aside>
  </div>
</template>

<style scoped>
.base-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  gap: 1rem;
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
