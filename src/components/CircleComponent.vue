<template>
  <ol-vector-layer v-if="centerFromLonLat">
    <ol-source-vector>
      <ol-feature>
        <ol-geom-circle :center="centerFromLonLat" :radius="radius" />
        <ol-style>
          <ol-style-stroke :color="color" :width="3"></ol-style-stroke>
          <ol-style-fill color="rgba(255,255,0,0.0)"></ol-style-fill>
        </ol-style>
      </ol-feature>
    </ol-source-vector>
  </ol-vector-layer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { fromLonLat } from 'ol/proj'
import type { Coordinate } from 'ol/coordinate'

const props = defineProps<{
  center: Coordinate
  radius: number
  color: string
}>()

const centerFromLonLat = computed(() => fromLonLat(props.center))
</script>

<style scoped></style>
