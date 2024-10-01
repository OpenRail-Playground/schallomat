<template>
  <ol-map
    ref="mapRef"
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 600px"
    @pointermove="hoverFeature"
  >
    <ol-view ref="view" :center="viewCenter" :zoom="zoom" projection="EPSG:3857" />
    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-tile-layer class-name="feature-layer">
      <ol-source-vector-tile
        url="https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf"
        :format="mvtFormat"
      />
      <ol-style :overrideStyleFunction="styleFunction" />
    </ol-vector-tile-layer>

    <!--    <ol-tile-layer>
          <ol-source-tile-debug />
        </ol-tile-layer>-->

    <ol-vector-layer>
      <ol-source-vector :features="highlightedFeatures" />
      <ol-style>
        <ol-style-stroke color="#bb2233" :width="2" />
      </ol-style>
    </ol-vector-layer>

    <ol-vector-layer v-if="draftMachine && !draftMachine.position">
      <ol-interaction-draw type="Point" @draw-end="setPosition" />
    </ol-vector-layer>

    <slot />
  </ol-map>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { fromLonLat } from 'ol/proj'
import { type FeatureLike } from 'ol/Feature'
import { MapBrowserEvent } from 'ol'
import type MapRef from 'ol/Map'
import { Layer } from 'ol/layer'
import RenderFeature from 'ol/render/Feature'
import type { Coordinate } from 'ol/coordinate'
import { Fill, Stroke, Style } from 'ol/style'
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import { storeToRefs } from 'pinia'
import type { DrawEvent } from 'ol/interaction/Draw'

const props = defineProps<{
  center: Coordinate
}>()
const mapRef = ref<{ map: MapRef } | null>(null)
const viewCenter = ref(fromLonLat(props.center))
const zoom = ref(18)
const format = inject('ol-format')
const mvtFormat = new format.MVT({ featureClass: RenderFeature })
const highlightedFeatures = ref<FeatureLike[]>([])

const { draftMachine } = storeToRefs(useConstructionSiteStore())

/**
 * Only handle click / hover for the layer with class name "feature-layer"
 */
function layerFilter(layerCandidate: Layer) {
  return layerCandidate.getClassName().includes('feature-layer')
}

/**
 * Style for buildings
 */
function buildingStyle(style: Style) {
  const newStyle = style.clone()
  newStyle.setFill(
    new Fill({
      color: 'rgba(255, 165, 0, 0.6)' // Orange fill with some transparency
    })
  )
  newStyle.setStroke(
    new Stroke({
      color: '#ff7800', // Orange border
      width: 1
    })
  )
  return newStyle
}

/**
 * Style for buildings
 */
function inCircleStyle(style: Style) {
  const newStyle = style.clone()
  newStyle.setFill(
    new Fill({
      color: 'rgba(0, 0, 255, 0.6)' // Orange fill with some transparency
    })
  )
  newStyle.setStroke(
    new Stroke({
      color: '#0000FF', // Orange border
      width: 1
    })
  )
  return newStyle
}

/**
 * show hovered feature in separate layer
 */
function hoverFeature(event: MapBrowserEvent<PointerEvent>) {
  const map = mapRef.value?.map
  if (!map) {
    return
  }
  const features = map.getFeaturesAtPixel(event.pixel, {
    hitTolerance: 10,
    layerFilter
  })
  const filteredFeatures = features.filter((feature) => {
    console.log('layer', feature.getProperties().layer)
    return feature.getProperties().layer === 'Building'
  })
  highlightedFeatures.value = filteredFeatures[0] ? [filteredFeatures[0]] : []
  console.log(highlightedFeatures.value)
}

const styleFunction = (feature: RenderFeature, style: Style) => {
  // Check the layer name or other properties
  const layer = feature.get('layer') // Assuming the layer name is stored in the 'layer' property

  // Show only buildings
  if (layer === 'Building') {
    // TODO: check if building intersects with circle geom and use from other layer
    const featureGeometry = feature.getGeometry()
    /*const circleGeometry = new Circle(props.center, 100)

    if (circleGeometry.intersectsExtent(featureGeometry.getExtent())) {
      return inCircleStyle
    }*/

    return buildingStyle(style)
  }
  return style // Return null for all other features
}

function setPosition(event: DrawEvent) {
}
</script>
