import { defineStore } from 'pinia'
import { type Address, fetchAddressInRadius } from '../services/OverpassApi'
import { filterAddressesWithinCircle } from '../utils/map'

function getIsophonesWithAddresses(
  addresses: Address[],
  indexes: number[],
  lon: number,
  lat: number,
  key: 'isophoneIndexDay' | 'isophoneIndexNight'
) {
  const addressMap = new Map<number, Address[]>()
  let restData = [...addresses]
  indexes.forEach((radius, index) => {
    const { matches, rest } = filterAddressesWithinCircle(restData, [lon, lat], radius)
    matches.forEach((match) => {
      match[key] = index
    })
    addressMap.set(index, matches)
    restData = rest
  })
  return Array.from(addressMap.values()).flat()
}

export const useAddressStore = defineStore('addressStore', {
  state: () => ({
    addresses: [] as Address[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchAddresses(
      lat: number,
      lon: number,
      isophones: {
        isophonesDay: number[]
        isophonesNight: number[]
      }
    ) {
      const maxRadius = Math.max(...isophones.isophonesDay, ...isophones.isophonesNight)
      const { isophonesDay, isophonesNight } = isophones
      const isophonesDaySorted = isophonesDay.sort((a, b) => a - b)
      const isophonesNightSorted = isophonesNight.sort((a, b) => a - b)

      try {
        const addressesInMaxRadius = await fetchAddressInRadius(lat, lon, maxRadius)

        const dayMapArray = getIsophonesWithAddresses(
          addressesInMaxRadius,
          isophonesDaySorted,
          lon,
          lat,
          'isophoneIndexDay'
        )

        const nightMapArray = getIsophonesWithAddresses(
          addressesInMaxRadius,
          isophonesNightSorted,
          lon,
          lat,
          'isophoneIndexNight'
        )
        console.log({ dayMap: dayMapArray, nightMap: nightMapArray })

        this.addresses = [...dayMapArray, ...nightMapArray].filter(
          (addr) => addr.city && addr.postcode && addr.street
        )
      } catch (error) {
        this.error = (error as Error).message
        console.error('Error fetching addresses:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
