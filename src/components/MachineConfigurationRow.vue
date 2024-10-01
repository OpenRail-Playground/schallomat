<script setup lang="ts">
import { type Machine, useConstructionMachineStore } from '../stores/constructionMachineStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const props = defineProps<{ machine: Machine }>()
const emit = defineEmits(['add'])

const { machines } = storeToRefs(useConstructionMachineStore())

const machineConfig = ref({ ...props.machine })

const isDisabled = computed(() => {
  const dayAsNumber = Number(machineConfig.value.dayHours)
  const nightAsNumber = Number(machineConfig.value.nightHours)
  return machineConfig.value.name === '' || (dayAsNumber === 0 && nightAsNumber === 0)
})

function addMachine() {
  const machine = {
    ...(machines.value.find((m) => m.name === machineConfig.value.name) || {}),
    ...machineConfig.value
  }

  emit('add', machine)
  machineConfig.value = { dayHours: 0, nightHours: 0, name: '' }
}
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
      <label class="elm-label" for="machine"> Maschine </label>
    </td>

    <td>
      <input
        type="number"
        step="0.5"
        min="0"
        max="16"
        class="elm-input"
        placeholder="Dauer (h) / Tag"
        name="avg-operating-time-day"
        id="avg-operating-time-day"
        value=""
        aria-labelledby="avg-operating-time-day-label"
        v-model="machineConfig.dayHours"
      />
      <label
        class="elm-label"
        aria-hidden="true"
        id="avg-operating-time-day-label"
        for="avg-operating-time-day"
      >
        Dauer (h) / Tag
      </label>
    </td>

    <td>
      <input
        type="number"
        step="0.5"
        min="0"
        max="8"
        class="elm-input"
        placeholder="Dauer (h) / Nacht"
        name="avg-operating-time-night"
        id="avg-operating-time-night"
        value=""
        aria-labelledby="avg-operating-time-night-label"
        v-model="machineConfig.nightHours"
      />
      <label
        class="elm-label"
        aria-hidden="true"
        id="avg-operating-time-night-label"
        for="avg-operating-time-night"
      >
        Dauer (h) / Nacht
      </label>
    </td>

    <td>
      <button
        v-if="props.machine.name === ''"
        :disabled="isDisabled"
        class="elm-button"
        data-variant="secondary-outline"
        title="Hinzufügen"
        type="button"
        @click="addMachine"
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
