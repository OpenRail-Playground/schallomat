<script setup lang="ts">
import { computed } from 'vue'

const { numSteps, current } = defineProps<{ numSteps: number; current: number }>()
const emit = defineEmits(['select'])

const steps = computed(() => Array.from({ length: numSteps }, (_, i) => i + 1))

const active = computed(() => (index: number) => (current === index ? 'active' : ''))
</script>

<template>
  <div id="progress">
    <button
      v-for="index in steps"
      :key="index"
      :class="active(index)"
      @click="emit('select', index)"
    >
      {{ index }}
    </button>
  </div>
</template>

<style lang="css" scoped>
button {
  display: inline-flex;
  background: #55b9e6;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin: 0 0.5rem 0.5rem;
  color: white;
  text-align: center;
  line-height: 0;
  font-size: 20px;
  border: 2px solid black;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

button:hover {
  background: #358eb7;
}

button.active {
  background: #115270;
  border-color: #115270;
  cursor: not-allowed;
}

#progress {
  text-align: center;
}

/* Layout für Desktop */
@media (min-width: 768px) {
  #progress {
    text-align: left;
  }

  button {
    width: 64px;
    height: 64px;
    font-size: 40px;
  }
}
</style>
