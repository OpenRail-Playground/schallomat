<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'

const { draftMachine } = storeToRefs(useConstructionSiteStore())
</script>

<template>
  <dialog v-if="draftMachine?.position">
    <h2>{{ draftMachine.name }}</h2>
  </dialog>
</template>
