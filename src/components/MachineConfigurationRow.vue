<script setup lang="ts">
import { useConstructionMachineStore } from '../stores/constructionMachineStore'
import { storeToRefs } from 'pinia'

const { machines } = storeToRefs(useConstructionMachineStore())

function selectMachine(event: Event) {
  // todo
}

function selectAvgOperatingTimeDay(event: Event) {
  // todo
}

function selectAvgOperatingTimeNight(event: Event) {
  // todo
}
</script>

<template>
  <tr class="machine-config">
    <td>
      <select class="elm-select" name="machine" id="machine" @change="selectMachine">
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
        class="elm-input"
        placeholder="Dauer (h) / Tag"
        name="avg-operating-time-day"
        id="avg-operating-time-day"
        value=""
        aria-labelledby="avg-operating-time-day-label"
        @change="selectAvgOperatingTimeDay"
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
        class="elm-input"
        placeholder="Dauer (h) / Nacht"
        name="avg-operating-time-night"
        id="avg-operating-time-night"
        value=""
        aria-labelledby="avg-operating-time-night-label"
        @change="selectAvgOperatingTimeDay"
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
      <button class="elm-button" data-variant="secondary-outline" title="Hinzufügen" type="button">
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
