<script setup lang="ts">
import MachineConfigurationList from './MachineConfigurationList.vue'
</script>

<template>
  <MachineConfigurationList />

  <button
    class="elm-button calculate"
    data-variant="brand-primary"
    data-width="full"
    title="Berechnen"
    type="button"
  >
    Berechnen
  </button>
</template>

<style lang="css" scoped>
.calculate {
  margin-top: 1rem;
}
</style>
