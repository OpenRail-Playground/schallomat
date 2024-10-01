import { defineStore } from 'pinia'
import type { Machine } from './constructionMachineStore'
import type { Coordinate } from 'ol/coordinate'

export const useConstructionSiteStore = defineStore('constructionSiteStore', {
  state: () => ({
    center: undefined as Coordinate | undefined,
    radius: 100,
    machines: [] as Machine[],
    isophones: [] as number[] // radius starting from the center
  }),

  actions: {
    addMachine(machine: Machine) {
      this.machines.push(machine)
    },

    setConstructionSiteCenter(coordinate?: Coordinate) {
      this.center = coordinate
    },

    calculateIsophones() {
      // Todo: actually calculate
      this.isophones = [50, 100, 150, 200, 250, 300, 350, 400]
    }
  }
})
