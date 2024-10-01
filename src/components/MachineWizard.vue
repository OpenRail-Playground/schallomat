<script setup lang="ts">
import { ref } from 'vue'
import MachineConfigurationList from './MachineConfigurationList.vue'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import ProgressBar from './ProgressBar.vue'

const { calculateIsophones } = useConstructionSiteStore()

const currentStep = ref(1)
</script>

<template>
  <ProgressBar :num-steps="3" :current="currentStep" @select="(index) => (currentStep = index)" />

  <h2 v-if="currentStep === 1">Bitte die Position der Baustelle auf der Karte auswählen!</h2>

  <MachineConfigurationList v-if="currentStep === 2" />

  <button
    v-if="currentStep === 2"
    class="elm-button calculate"
    data-variant="brand-primary"
    data-width="full"
    title="Berechnen"
    type="button"
    @click="calculateIsophones"
  >
    Berechnen
  </button>
</template>

<style lang="css" scoped>
.calculate {
  margin-top: 1rem;
}
</style>
