<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConstructionMachineStore } from '../stores/constructionMachineStore'

const { machines } = storeToRefs(useConstructionMachineStore())
</script>

<template>
  <ul>
    <li v-for="(machine, index) in machines" :key="index">{{ machine.name }}</li>
  </ul>
</template>

<style lang="css" scoped></style>
