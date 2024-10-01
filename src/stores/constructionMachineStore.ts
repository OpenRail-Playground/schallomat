import { defineStore } from 'pinia'
import machines from "../../machines.json"
import type { Coordinate } from 'ol/coordinate'
export interface Machine {
  name: string
  height: number
  volume: number
  position?: Coordinate
}

export const useConstructionMachineStore = defineStore('constructionMachineStore', {
  state: () => ({
    machines: machines as Machine[],
    selectedMachines: [] as Machine[]
  }),

  actions: {
  }
})
