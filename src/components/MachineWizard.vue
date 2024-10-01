<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import MachineConfigurationList from '@/components/MachineConfigurationList.vue'

const { draftMachine } = storeToRefs(useConstructionSiteStore())
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
