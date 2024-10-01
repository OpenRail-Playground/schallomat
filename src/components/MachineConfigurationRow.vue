<script setup lang="ts">
import { useConstructionMachineStore } from '../stores/constructionMachineStore'
import { storeToRefs } from 'pinia'
import { computed, reactive } from 'vue'

const { machines } = storeToRefs(useConstructionMachineStore())

const machineConfig = reactive({
  name: '',
  day: 0,
  night: 0
})

const isDisabled = computed(() => {
  const dayAsNumber = Number(machineConfig.day)
  const nightAsNumber = Number(machineConfig.day)
  return machineConfig.name && !(dayAsNumber >= 0 || nightAsNumber >= 0)
})
</script>

<template>
  <tr class="machine-config">
    <td>
      <select class="elm-select" name="machine" id="machine" v-model="machineConfig.name">
        <option></option>
        <option v-for="(machine, index) in machines" :key="index" :value="machine.name">
          {{ machine.name }}
        </option>
      </select>
      <label class="elm-label" for="machine">Maschine</label>
    </td>

    <td>
      <input
        type="number"
        step="0.1"
        min="0"
        max="16"
        class="elm-input"
        placeholder="Dauer (h) / Tag"
        name="avg-operating-time-day"
        id="avg-operating-time-day"
        value=""
        aria-labelledby="avg-operating-time-day-label"
        v-model="machineConfig.day"
      />
      <label
        class="elm-label"
        for="avg-operating-time-day"
        aria-hidden="true"
        id="avg-operating-time-day-label"
        >Dauer (h) / Tag</label
      >
    </td>

    <td>
      <input
        type="number"
        step="0.1"
        min="0"
        max="8"
        class="elm-input"
        placeholder="Dauer (h) / Nacht"
        name="avg-operating-time-night"
        id="avg-operating-time-night"
        value=""
        aria-labelledby="avg-operating-time-night-label"
        v-model="machineConfig.night"
      />
      <label
        class="elm-label"
        for="avg-operating-time-night"
        aria-hidden="true"
        id="avg-operating-time-night-label"
        >Dauer (h) / Nacht</label
      >
    </td>

    <td>
      <button
        :disabled="isDisabled"
        class="elm-button"
        data-variant="secondary-outline"
        title="Hinzufügen"
        type="button"
      >
        Hinzufügen
      </button>
    </td>
  </tr>
</template>

<style lang="css" scoped>
td {
  text-align: left;
  padding: 0.125rem 0.25rem;
}
</style>
