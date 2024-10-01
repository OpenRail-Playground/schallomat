import { defineStore } from 'pinia'
import machines from "../../machines.json"
export interface Machine {
  name: string
  height: number
  volume: number
}

export const useConstructionMachineStore = defineStore('constructionMachineStore', {
  state: () => ({
    machines: machines as Machine[],
    selectedMachines: [] as Machine[]
  }),

  actions: {
  }
})
