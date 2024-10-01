<script setup lang="ts">
import MachineConfigurationList from './MachineConfigurationList.vue'
</script>

<template>
  <MachineConfigurationList />
</template>

<style lang="css" scoped>
dialog {
  display: block;
}

dialog::backdrop {
  color: rgba(0, 0, 0, 0.5);
}
</style>
