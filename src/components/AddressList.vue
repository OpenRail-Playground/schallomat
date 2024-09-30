<template>
  <div>
    <h2>Addresses within Radius</h2>

    <div v-if="addressStore.loading">Loading...</div>
    <div v-if="addressStore.error">Error: {{ addressStore.error }}</div>

    <div v-if="!addressStore.loading && addressStore.addresses.length">
      <!-- Search input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search addresses..."
        class="search-input"
      />

      <!-- Address table -->
      <table>
        <thead>
          <tr>
            <th @click="sortBy('postcode')">Postcode</th>
            <th @click="sortBy('street')">Street</th>
            <th>Housenumber</th>
            <th @click="sortBy('city')">City</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(address, index) in filteredAndSortedAddresses" :key="index">
            <td>{{ address.postcode }}</td>
            <td>{{ address.street }}</td>
            <td>{{ address.housenumber }}</td>
            <td>{{ address.city }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!addressStore.loading && filteredAndSortedAddresses.length === 0">
      No addresses found.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAddressStore } from '../stores/addressStore'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  coordinate: number[]
  radius: number
}>()
const addressStore = useAddressStore()

const lon = computed(() => props.coordinate[0])
const lat = computed(() => props.coordinate[1])

// Fetch addresses when the component is mounted
onMounted(() => {
  addressStore.fetchAddresses(lat.value, lon.value, props.radius)
})

// Watch for changes in the input props and refetch data if they change
watch(
  () => [lat.value, lon.value, props.radius],
  ([newLat, newLon, newRadius]) => {
    addressStore.fetchAddresses(newLat, newLon, newRadius)
  }
)

// Search query for filtering addresses
const searchQuery = ref('')

// State for sorting
const sortKey = ref<'postcode' | 'street' | 'city'>('postcode')
const sortDirection = ref<'asc' | 'desc'>('asc')

// Method to sort the table by a given column
// Method to sort the table by a given column
function sortBy(key: 'postcode' | 'street' | 'city') {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

// Filter and sort addresses based on the search query and selected sort column
const filteredAndSortedAddresses = computed(() => {
  return addressStore.addresses
    .filter((address) => {
      const searchLower = searchQuery.value.toLowerCase()
      return (
        [address.street, address.housenumber, address.postcode, address.city]
          .join(' ')
          .toLowerCase()
          .includes(searchLower) ||
        address.postcode?.toString().includes(searchLower) ||
        address.street?.toLowerCase().includes(searchLower) ||
        address.city?.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      const aValue = a[sortKey.value] || ''
      const bValue = b[sortKey.value] || ''

      if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
})
</script>

<style scoped>
.search-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  cursor: pointer;
  padding: 0.5rem;
  text-align: left;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
}

td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

th:hover {
  background-color: #eaeaea;
}
</style>
