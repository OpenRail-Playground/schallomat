<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConstructionMachineStore } from '../stores/constructionMachineStore'
import { useConstructionSiteStore } from '../stores/constructionSiteStore';

const { machines } = storeToRefs(useConstructionMachineStore())
const { setDraftMachine } = useConstructionSiteStore()

function onChange(event: Event) {
  const element = event.target as HTMLSelectElement
  setDraftMachine(machines.value.find(machine => machine.name === element.value))
}
</script>

<template>
  Machine: 
  <select @change="onChange">
    <option></option>
    <option v-for="(machine, index) in machines" :key="index" :value="machine.name">
      {{ machine.name }}
    </option>
  </select>
</template>

<style lang="css" scoped></style>
