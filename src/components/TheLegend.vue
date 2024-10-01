<script setup lang="ts">
import { isophoneLevels } from '../services/Isophones'
</script>

<template>
  <div class="container">
    <div v-for="(color, level) in isophoneLevels" :key="level">
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
