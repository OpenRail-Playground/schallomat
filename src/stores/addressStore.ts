import { defineStore } from 'pinia'
import { type Address, fetchAddressInRadius } from '../services/OverpassApi'
import { filterAddressesWithinCircle } from '../utils/map'

function getIsophonesWithAddresses(
  addresses: Address[],
  isophone: Record<number, number>,
  lon: number,
  lat: number,
  key: 'isophoneLevelDay' | 'isophoneLevelNight'
) {
  const addressMap = new Map<number, Address[]>()
  let restData = [...addresses]
  const levels = Object.keys(isophone)
    .map(Number)
    .sort((a, b) => b - a)
  levels.forEach((level) => {
    const radius = isophone[Number(level)]
    const { matches, rest } = filterAddressesWithinCircle(restData, [lon, lat], radius)
    matches.forEach((match) => {
      match[key] = Number(level)
    })
    addressMap.set(Number(level), matches)
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
        isophonesDay: Record<number, number>
        isophonesNight: Record<number, number>
      }
    ) {
      const dayRadii = Object.values(isophones.isophonesDay)
        .map(Number)
        .sort((a, b) => a - b)
      const nightRadii = Object.values(isophones.isophonesNight)
        .map(Number)
        .sort((a, b) => a - b)
      const maxRadius = Math.max(...dayRadii, ...nightRadii)

      try {
        const addressesInMaxRadius = await fetchAddressInRadius(lat, lon, maxRadius)

        const dayMapArray = getIsophonesWithAddresses(
          addressesInMaxRadius,
          isophones.isophonesDay,
          lon,
          lat,
          'isophoneLevelDay'
        )

        const nightMapArray = getIsophonesWithAddresses(
          addressesInMaxRadius,
          isophones.isophonesNight,
          lon,
          lat,
          'isophoneLevelNight'
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
