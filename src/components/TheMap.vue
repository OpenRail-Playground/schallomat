<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 600px"
  >
    <ol-view
      ref="view"
      :center="center"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
  </ol-map>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const center = ref([13.3565907, 52.4815294]);
const projection = ref('EPSG:4326');
const zoom = ref(18);
</script>
