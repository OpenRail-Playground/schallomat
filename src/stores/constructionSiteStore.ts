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
    isophonesNight: [] as number[] // radius starting from the center
  }),

  actions: {
    addMachine(machine: Machine) {
      this.machines.push(machine)
    },

    setConstructionSiteCenter(coordinate?: Coordinate) {
      this.center = coordinate
    },

    calculateIsophones() {
      this.isophonesDay = []
      this.isophonesNight = []

      const isophones = calculateIsophones(
        this.machines.map((m) => [
          m.name as string,
          m.volume as number,
          m.dayHours as number,
          m.nightHours as number
        ])
      )

      this.isophonesDay = isophones.day.reverse()
      this.isophonesNight = isophones.night.reverse()

      console.log('DBG', { isophonesDay: this.isophonesDay, isophonesNight: this.isophonesNight })
    }
  }
})
