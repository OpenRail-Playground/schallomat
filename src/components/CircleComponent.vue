<template>
  <div class="debug">
    coordinate: {{ coordinate }}<br />
    coordinateFromLonLat: {{ coordinateFromLonLat }}
  </div>
  <ol-vector-layer>
    <ol-source-vector>
      <ol-feature>
        <ol-geom-circle :coordinates="coordinate" :radius="radius" />
        <ol-style>
          <ol-style-stroke color="red" :width="3"></ol-style-stroke>
          <ol-style-fill color="rgba(255,200,0,0.2)"></ol-style-fill>
        </ol-style>
      </ol-feature>
    </ol-source-vector>
  </ol-vector-layer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { fromLonLat } from 'ol/proj'

const props = defineProps<{
  coordinate: number[]
  radius: number
}>()

const coordinateFromLonLat = computed(() => fromLonLat(props.coordinate))
</script>

<style scoped>
.debug {
  position: absolute;
  z-index: 9999;
  background: white;
  left: 42px;
  top: 10px;
  padding: 3px 0.5rem;
}
</style>
