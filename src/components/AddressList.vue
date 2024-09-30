<template>
  <div>
    <h2>Addresses within Radius</h2>
    <div v-if="addressStore.loading">Loading...</div>
    <div v-if="addressStore.error">Error: {{ addressStore.error }}</div>
    <ul v-if="!addressStore.loading && addressStore.addresses.length">
      <li v-for="(address, index) in addressStore.addresses" :key="index">
        {{ address.display_name }}
      </li>
    </ul>
    <p v-if="!addressStore.loading && addressStore.addresses.length === 0">No addresses found.</p>
  </div>
</template>

<script setup lang="ts">
import { useAddressStore } from '../stores/addressStore';
import {computed, onMounted, watch} from 'vue';

const props = defineProps<{
  coordinate: number[];
  radius: number;
}>();
const addressStore = useAddressStore();

const lon = computed(() => props.coordinate[0])
const lat = computed(() => props.coordinate[1])

// Fetch addresses when the component is mounted
onMounted(() => {
  addressStore.fetchAddresses(lat.value, lon.value, props.radius);
});

// Watch for changes in the input props and refetch data if they change
watch(
  () => [lat.value, lon.value, props.radius],
  ([newLat, newLon, newRadius]) => {
    addressStore.fetchAddresses(newLat, newLon, newRadius);
  }
);
</script>
