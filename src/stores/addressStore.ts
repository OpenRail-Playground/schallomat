import { defineStore } from 'pinia'

export interface OSMAddress {
  lat: number
  lon: number
  postcode: string
  city: string
  street: string
  housenumber: string
}

export const useAddressStore = defineStore('addressStore', {
  state: () => ({
    addresses: [] as OSMAddress[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchAddresses(lat: number, lon: number, radius: number) {
      this.loading = true
      this.error = null

      const overpassUrl = 'https://overpass-api.de/api/interpreter'
      const query = `
        [out:json];
        (
          node["addr:housenumber"](around:${radius}, ${lat}, ${lon});
          way["addr:housenumber"](around:${radius}, ${lat}, ${lon});
          relation["addr:housenumber"](around:${radius}, ${lat}, ${lon});
        );
        out center;
      `

      try {
        const response = await fetch(overpassUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: query
        })

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        this.addresses = data.elements.map((element: any) => {
          const { lat, lon, tags } = element
          return {
            lat: lat || element.center.lat,
            lon: lon || element.center.lon,
            postcode: tags['addr:postcode'] || '',
            city: tags['addr:city'] || '',
            street: tags['addr:street'] || '',
            housenumber: tags['addr:housenumber'] || ''
          }
        })
      } catch (error) {
        this.error = (error as Error).message
        console.error('Error fetching addresses:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
