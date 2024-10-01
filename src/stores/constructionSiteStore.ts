import { defineStore } from 'pinia'
import type { Machine } from './constructionMachineStore'
import type { Coordinate } from 'ol/coordinate'

export const useConstructionSiteStore = defineStore('constructionSiteStore', {
  state: () => ({
    center: undefined as Coordinate | undefined,
    radius: 100,
    machines: [] as Machine[],
    draftMachine: undefined as undefined | Machine
  }),

  actions: {
    addMachine(machine: Machine) {
      this.machines.push(machine)
    },

    setConstructionSiteCenter(coordinate?: Coordinate) {
      this.center = coordinate
    }
  }
})
