import { defineStore } from 'pinia'
import type { Machine } from './constructionMachineStore'
import type { Coordinate } from 'ol/coordinate'

export const useConstructionSiteStore = defineStore('constructionSiteStore', {
  state: () => ({
    center: [13.3565907, 52.4815294] as Coordinate,
    radius: 100,
    machines: [] as Machine[],
    draftMachine: undefined as undefined | Machine
  }),

  actions: {
    addMachine(machine: Machine) {
      this.machines.push(machine)
      this.draftMachine = undefined
    },

    setDraftMachine(machine?: Machine) {
      this.draftMachine = machine
    }
  }
})
