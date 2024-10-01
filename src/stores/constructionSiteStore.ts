import { defineStore } from 'pinia'
import type { Machine } from './constructionMachineStore'
import type { Coordinate } from 'ol/coordinate'

export interface ConstructionSite {
  center: Coordinate
  radius: number
  machines: Machine[]
}

export const useConstructionSiteStore = defineStore('addressStore', {
  state: () => ({
    constructionSite: {
      center: [13.3565907, 52.4815294],
      radius: 100,
      machines: []
    } as ConstructionSite | undefined
  }),

  actions: {}
})
