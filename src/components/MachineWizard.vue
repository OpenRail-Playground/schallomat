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
  <div class="wrapper">
    <ProgressBar :num-steps="3" :current="currentStep" @select="(index) => setStep(index)" />

    <div v-if="currentStep === 1">
      <h2>Position wählen</h2>
      <p>Bitte wähle die Position der Baustelle auf der Karte aus!</p>
    </div>
    <div v-if="currentStep === 2">
      <h2>Maschinen wählen</h2>
      <p v-if="currentStep === 2">
        Bitte wähle die auf der Baustelle verwendeten Maschinen aus und gib jeweils die
        durchschnittliche Betriebsdauer für Tag bzw. Nacht (22:00 Uhr - 06:00 Uhr) an.
      </p>
    </div>

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
  </div>

  <AddressList v-if="currentStep === 3 && center" />
</template>

<style lang="css" scoped>
.calculate {
  margin-top: 2rem;
}

.wrapper {
  padding: 0 1rem;
}

h2 {
  margin-bottom: 0;
}
</style>
