<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 600px"
  >
    <ol-view
      ref="view"
      :center="viewCenter"
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
import {fromLonLat} from "ol/proj";

const props = defineProps<{
  center: number[];
}>();

const viewCenter = ref(fromLonLat(props.center));
const projection = ref('EPSG:3857');
const zoom = ref(18);
</script>
