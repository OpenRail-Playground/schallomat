<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <div class="day-night">
    <label data-icon-before="day" data-icon-variant-before="20-outline" id="day-label"
      >Tagzeitraum</label
    >
    <input type="checkbox" role="switch" class="elm-toggle" id="day-night-toggle" v-model="model" />
    <label
      class="elm-label"
      for="day-night-toggle"
      id="night-label"
      data-icon-before="night"
      data-icon-variant-before="20-outline"
      >Nachtzeitraum</label
    >
  </div>
</template>

<style scoped>
.day-night {
  margin: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  background-color: white;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

#day-label {
  position: relative;
  display: inline-block;
  margin-right: 0.5rem;
}

#night-label {
  margin-left: 0.5rem;
}
</style>
