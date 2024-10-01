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

  <MachineConfigurationList />

  <button
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
