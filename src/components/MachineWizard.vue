<script setup lang="ts">
import MachineConfigurationList from './MachineConfigurationList.vue'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import ProgressBar from './ProgressBar.vue'
import { storeToRefs } from 'pinia'
import AddressList from './AddressList.vue'

const constructionSiteStore = useConstructionSiteStore()
const { center, machines, currentStep } = storeToRefs(constructionSiteStore)
const { calculateIsophones, setStep } = constructionSiteStore
</script>

<template>
  <ProgressBar :num-steps="3" :current="currentStep" @select="(index) => setStep(index)" />

  <h2 v-if="currentStep === 1">Bitte die Position der Baustelle auf der Karte auswählen!</h2>

  <MachineConfigurationList v-if="currentStep === 2" />

  <button
    v-if="currentStep === 2"
    :disabled="machines.length === 0"
    class="elm-button calculate"
    data-variant="brand-primary"
    data-width="full"
    title="Berechnen"
    type="button"
    @click="calculateIsophones"
  >
    Berechnen
  </button>

  <AddressList v-if="currentStep === 3 && center" />
</template>

<style lang="css" scoped>
.calculate {
  margin-top: 1rem;
}
</style>
