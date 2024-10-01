<script setup lang="ts">
import MachineConfigurationList from './MachineConfigurationList.vue'
import { useConstructionSiteStore } from '@/stores/constructionSiteStore'

const { calculateIsophones } = useConstructionSiteStore()
</script>

<template>
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
