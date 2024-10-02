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
            <th
              @click="sortBy('isophoneIndexDay')"
              :class="getSortClass('isophoneIndexDay')"
              data-icon-before="day"
              data-icon-variant-before="24-outline"
            ></th>
            <th
              @click="sortBy('isophoneIndexNight')"
              :class="getSortClass('isophoneIndexNight')"
              data-icon-before="night"
              data-icon-variant-before="24-outline"
            ></th>
            <th @click="sortBy('city')" :class="getSortClass('city')">Ort</th>
            <th @click="sortBy('postcode')" :class="getSortClass('postcode')">PLZ</th>
            <th @click="sortBy('street')" :class="getSortClass('street')">Straße</th>
            <th class="unsortable small">Nr.</th>
            <th class="unsortable small">Etagen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(address, index) in filteredAndSortedAddresses" :key="address.id">
            <td
              :style="{
                background:
                  address.isophoneIndexDay === undefined
                    ? 'transparent'
                    : getIsophoneColor(address.isophoneIndexDay, 'day')
              }"
              class="isophone"
            >
              <span v-if="address.isophoneIndexDay !== undefined"
                >> {{ getImmissionThresholds().day[address.isophoneIndexDay] }}</span
              >
            </td>
            <td
              :style="{
                background:
                  address.isophoneIndexNight === undefined
                    ? 'transparent'
                    : getIsophoneColor(address.isophoneIndexNight, 'night')
              }"
              class="isophone"
            >
              <span v-if="address.isophoneIndexNight !== undefined"
                >> {{ getImmissionThresholds().day[address.isophoneIndexNight] }}</span
              >
            </td>
            <td>{{ address.city }}</td>
            <td>{{ address.postcode }}</td>
            <td>{{ address.street }}</td>
            <td class="small">{{ address.housenumber }}</td>
            <td class="small">{{ address.levels }}</td>
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
import { getImmissionThresholds, getIsophoneColor } from '../services/Isophones'

type SortKey = 'postcode' | 'street' | 'city' | 'isophoneIndexDay' | 'isophoneIndexNight'
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
      addressStore.fetchAddresses(lat.value, lon.value, {
        isophonesDay: isophonesDay.value,
        isophonesNight: isophonesNight.value
      })
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
function sortBy(key: SortKey) {
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

thead tr {
  vertical-align: bottom;
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

td.isophone {
  text-wrap: nowrap;
  font-size: 0.75rem;
  color: white;
}

th.small,
td.small {
  max-width: 70px;
}

.numeric {
  text-align: right;
}
</style>
