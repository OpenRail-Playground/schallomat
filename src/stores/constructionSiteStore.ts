import { defineStore } from 'pinia'
import type { Machine } from './constructionMachineStore'
import type { Coordinate } from 'ol/coordinate'
import { calculateIsophones } from '../services/Calculator'
import type { Ref } from 'vue'

export const useConstructionSiteStore = defineStore('constructionSiteStore', {
  state: () => ({
    center: undefined as Coordinate | undefined,
    radius: 100,
    machines: [] as Machine[],
    isophonesDay: {} as Record<number, number>, // radius indexed by dB
    isophonesNight: {} as Record<number, number>, // radius indexed by dB
    currentStep: 1,
    isophonesCalculated: false as boolean
  }),

  actions: {
    addMachine(machine: Machine) {
      this.machines.push(machine)
    },

    updateMachine(index: number, machine: Ref<Machine>) {
      this.machines = this.machines.map((m, i) => (i === index ? machine.value : m))
    },

    setConstructionSiteCenter(coordinate?: Coordinate) {
      this.center = coordinate
      this.currentStep = 2
    },

    calculateIsophones() {
      this.isophonesDay = {}
      this.isophonesNight = {}
      this.isophonesCalculated = false

      const isophones = calculateIsophones(this.machines)

      this.isophonesDay = isophones!.day
      this.isophonesNight = isophones!.night

      this.currentStep = 3
      this.isophonesCalculated = true

      console.log({ isophonesDay: this.isophonesDay, isophonesNight: this.isophonesNight })
    },

    setStep(step: number) {
      this.currentStep = step
    }
  }
})
