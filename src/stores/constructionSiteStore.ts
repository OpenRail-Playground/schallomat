import { defineStore } from 'pinia'
import type { Machine } from './constructionMachineStore'
import type { Coordinate } from 'ol/coordinate'
import { calculateIsophones } from '../services/Calculator'

export const useConstructionSiteStore = defineStore('constructionSiteStore', {
  state: () => ({
    center: undefined as Coordinate | undefined,
    radius: 100,
    machines: [] as Machine[],
    isophonesDay: [] as number[], // radius starting from the center
    isophonesNight: [] as number[], // radius starting from the center
    currentStep: 1,
    isophonesCalculated: false as boolean
  }),

  actions: {
    addMachine(machine: Machine) {
      this.machines.push(machine)
    },

    setConstructionSiteCenter(coordinate?: Coordinate) {
      this.center = coordinate
      this.currentStep = 2
    },

    calculateIsophones() {
      this.isophonesDay = []
      this.isophonesNight = []
      this.isophonesCalculated = false

      const isophones = calculateIsophones(
        this.machines
      )

      this.isophonesDay = isophones.day.reverse()
      this.isophonesNight = isophones.night.reverse()

      this.currentStep = 3
      this.isophonesCalculated = true

      console.log('DBG', { isophonesDay: this.isophonesDay, isophonesNight: this.isophonesNight })
    },

    setStep(step: number) {
      this.currentStep = step
    }
  }
})
