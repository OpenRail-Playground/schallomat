import { defineStore } from 'pinia'

export interface Machine {
  name: string
  height: number
  volume: number
  radius: number
}

export const useMachineStore = defineStore('addressStore', {
  state: () => ({
    selectedMachines: [] as Machine[]
  }),

  actions: {}
})
