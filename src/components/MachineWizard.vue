<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import MachineList from './MachineList.vue';

const { draftMachine } = storeToRefs(useConstructionSiteStore())
</script>

<template>
  <dialog v-if="draftMachine?.position">
    <h2>{{ draftMachine.name }}</h2>
    <div>{{ draftMachine.position }}</div>

    <MachineList />
  </dialog>
</template>

<style lang="css" scoped>
dialog {
  display: block;
}

dialog::backdrop {
  color: rgba(0, 0, 0, 0.5);
}
</style>
