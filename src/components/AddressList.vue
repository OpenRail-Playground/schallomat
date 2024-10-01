<template>
  <div>
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
        <caption>
          Betroffene Adressen im gewählten Bereich. Sortierung:
          {{
            sortDirection === 'desc' ? 'absteigend' : 'aufsteigend'
          }}
          nach
          {{
            sortKey
          }}.
        </caption>
        <thead>
          <tr>
            <th @click="sortBy('city')" :class="getSortClass('city')">City</th>
            <th @click="sortBy('postcode')" :class="getSortClass('postcode')">Postcode</th>
            <th @click="sortBy('street')" :class="getSortClass('street')">Street</th>
            <th class="unsortable">Housenumber</th>
            <th class="unsortable">Etagen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(address, index) in filteredAndSortedAddresses" :key="index">
            <td>{{ address.city }}</td>
            <td>{{ address.postcode }}</td>
            <td>{{ address.street }}</td>
            <td>{{ address.housenumber }}</td>
            <td>{{ address.levels }}</td>
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
import { useConstructionSiteStore } from '../stores/constructionSiteStore'
import { storeToRefs } from 'pinia'

type SortKey = 'postcode' | 'street' | 'city'
type SortDirection = 'asc' | 'desc'

const addressStore = useAddressStore()
const constructionSiteStore = useConstructionSiteStore()

const { center, isophonesCalculated, isophonesDay, isophonesNight } =
  storeToRefs(constructionSiteStore)

const lon = computed(() => center.value && center.value[0])
const lat = computed(() => center.value && center.value[1])

// Fetch addresses when the component is mounted
onMounted(() => {
  // addressStore.fetchAddresses(lat.value, lon.value, props.radius)
})

// Watch for changes in the input props and refetch data if they change
watch(
  isophonesCalculated,
  (newValue) => {
    if (newValue && lon.value && lat.value) {
      addressStore.fetchAddresses(
        lat.value,
        lon.value,
        Math.max(...isophonesDay.value, ...isophonesNight.value)
      )
    }
  },
  { immediate: true }
)

// Search query for filtering addresses
const searchQuery = ref('')

// State for sorting
const sortKey = ref<SortKey>('postcode')
const sortDirection = ref<SortDirection>('asc')

function getSortClass(key: SortKey) {
  return sortKey.value === key ? sortDirection.value : undefined
}

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

h2 {
  margin: 0.3rem 0.6rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 0.5rem;
  text-align: left;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
  position: relative;
}

th:not(.unsortable) {
  cursor: pointer;
}

td {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
}

th:hover {
  background-color: #eaeaea;
}

th:after {
  right: 0;
  position: absolute;
  margin-right: 0.5rem;
}

th.asc:after {
  content: '↑';
}

th.desc:after {
  content: '↓';
}
</style>
