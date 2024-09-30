<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 600px">
    <ol-view ref="view" :center="viewCenter" :zoom="zoom" projection="EPSG:3857" />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-tile-layer class-name="feature-layer">
      <ol-source-vector-tile
        url="https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf"
        :format="mvtFormat"
      />
      <ol-style>
        <ol-style-stroke color="#2255ee" :width="1" />
      </ol-style>
    </ol-vector-tile-layer>
    <slot />
  </ol-map>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'

const props = defineProps<{
  center: number[]
}>()

const viewCenter = ref(fromLonLat(props.center))
const zoom = ref(18)
const format = inject('ol-format')
const mvtFormat = new format.MVT({ featureClass: Feature })
</script>
