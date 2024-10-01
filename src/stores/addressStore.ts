import { defineStore } from 'pinia'
import { type Address, fetchAddressInRadius } from '../services/OverpassApi'

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
      const addressExists = (
        lat: number,
        lon: number,
        isophoneIndexDay?: number,
        isophoneIndexNight?: number
      ) => {
        return this.addresses.some(
          (entry) =>
            (entry.lat === lat &&
              entry.lon === lon &&
              isophoneIndexDay !== undefined &&
              entry.isophoneIndexDay === isophoneIndexDay) ||
            (isophoneIndexNight !== undefined && entry.isophoneIndexNight === isophoneIndexNight)
        )
      }

      const processIsophones = async (
        lat: number,
        lon: number,
        radii: number[],
        isNight: boolean
      ) => {
        for (let i = 0; i < radii.length; i++) {
          const radius = radii[i]
          const addressData = await fetchAddressInRadius(lat, lon, radius)

          if (!addressExists(lat, lon, isNight ? undefined : i, isNight ? i : undefined)) {
            this.addresses.push(
              ...addressData.map((address) => ({
                ...address,
                ...(isNight ? { isophoneIndexNight: i } : { isophoneIndexDay: i })
              }))
            )
          }
        }
      }

      const { isophonesDay, isophonesNight } = isophones
      const isophonesDaySorted = isophonesDay.sort()
      const isophonesNightSorted = isophonesNight.sort()

      try {
        await processIsophones(lat, lon, isophonesDaySorted, false)
        await processIsophones(lat, lon, isophonesNightSorted, true)
      } catch (error) {
        this.error = (error as Error).message
        console.error('Error fetching addresses:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
