<script setup lang="ts">
import { type Machine, useConstructionMachineStore } from '../stores/constructionMachineStore'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const props = defineProps<{ machine: Machine }>()
const emit = defineEmits(['add', 'update'])

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

if (props.machine.name !== '') {
  watch(machineConfig, () => emit('update', machineConfig), { deep: true })
}

function validateAndFix(model: 'dayHours' | 'nightHours', max = 24) {
  const currentValue = machineConfig.value[model] as string | number | undefined
  if (currentValue === undefined || currentValue === '' || Number(currentValue) < 0) {
    machineConfig.value[model] = 0
    return
  }

  if (Number(currentValue) > max) {
    machineConfig.value[model] = max
  }
}
</script>

<template>
  <tr class="machine-config">
    <td>
      <select
        class="elm-select"
        name="machine"
        id="machine"
        v-model="machineConfig.name"
        data-variant="outline"
      >
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
        data-variant="outline"
        v-model.number="machineConfig.dayHours"
        @input="validateAndFix('dayHours', 16)"
      />
      <label
        class="elm-label"
        aria-hidden="true"
        id="avg-operating-time-day-label"
        for="avg-operating-time-day"
      >
        Std.
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
        data-variant="outline"
        v-model.number="machineConfig.nightHours"
        @input="validateAndFix('nightHours', 8)"
      />
      <label
        class="elm-label"
        aria-hidden="true"
        id="avg-operating-time-night-label"
        for="avg-operating-time-night"
      >
        Std.
      </label>
    </td>

    <td>
      <button
        v-if="props.machine.name === ''"
        :disabled="isDisabled"
        class="elm-button is-icon-text-replace"
        data-variant="secondary-outline"
        data-icon="add"
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
