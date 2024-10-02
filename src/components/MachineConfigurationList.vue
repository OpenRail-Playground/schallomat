<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MachineConfigurationRow from '../components/MachineConfigurationRow.vue'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'

const constructionSiteStore = useConstructionSiteStore()
const { machines } = storeToRefs(constructionSiteStore)
const { addMachine, updateMachine } = constructionSiteStore
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col" data-icon-before="build" data-icon-variant-before="24-outline">Maschine</th>
        <th scope="col" data-icon-before="day" data-icon-variant-before="24-outline">
          Durchschn. Betriebs&shy;dauer
        </th>
        <th scope="col" data-icon-before="night" data-icon-variant-before="24-outline">
          Durchschn. Betriebs&shy;dauer
        </th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <MachineConfigurationRow
        v-for="(machine, index) in machines"
        :key="index"
        :machine="machine"
        @update="machine => updateMachine(index, machine)"
      />
      <MachineConfigurationRow
        :machine="{ dayHours: 0, nightHours: 0, name: '' }"
        @add="addMachine"
      />
    </tbody>
  </table>
</template>

<style scoped>
th {
  vertical-align: bottom;
  text-align: left;
  padding: 0.125rem 0.25rem;
  font-size: 0.875rem;
}
</style>
