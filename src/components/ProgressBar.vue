<script setup lang="ts">
import { computed } from 'vue'

const { numSteps, current } = defineProps<{ numSteps: number; current: number }>()
const emit = defineEmits(["select"])

const steps = computed(() => Array.from({ length: numSteps }, (_, i) => i + 1))

const active = computed(() => (index: number) => (current === index ? 'active' : ''))
</script>

<template>
  <div id="progress">
    <span v-for="index in steps" :key="index" :class="active(index)" @click="emit('select', index)">{{ index }}</span>
  </div>
</template>

<style lang="css" scoped>
#progress > span {
  display: inline-block;
  background: #55b9e6;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin: 0 0.5rem 0.5rem;
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 48px;
  border: 2px solid black;
}

#progress > span.active {
  background: #309fd1;
  border-color: #309fd1;
}
</style>
