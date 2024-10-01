<script setup lang="ts">
import { computed } from 'vue'
import { isophoneLevels, type TimeOfDay } from '../services/Isophones'

const props = defineProps<{ time: TimeOfDay }>()

const levels = computed(() => isophoneLevels[props.time])
</script>

<template>
  <div class="container">
    <div v-for="(color, level) in levels" :key="level">
      <span :style="{ background: color }">&nbsp;</span>
      <span>&gt; {{ level }} dB</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 0.5rem;
}

span {
  display: inline-block;
  min-width: 20px;
  padding: 3px 6px;
  line-height: 0.5rem;
}
</style>
