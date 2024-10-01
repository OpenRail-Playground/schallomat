<script setup lang="ts">
import MachineConfigurationRow from '@/components/MachineConfigurationRow.vue'
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col" data-icon-before="build" data-icon-variant-before="24-outline">Maschine</th>
        <th scope="col" data-icon-before="day" data-icon-variant-before="24-outline">
          Durchschn. Betriebsdauer
        </th>
        <th scope="col" data-icon-before="night" data-icon-variant-before="24-outline">
          Durchschn. Betriebsdauer
        </th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <MachineConfigurationRow />
    </tbody>
  </table>
</template>

<style scoped>
th {
  text-align: left;
  padding: 0.125rem 0.25rem;
  font-size: 0.875rem;
}
</style>
