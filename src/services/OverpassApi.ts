export interface Address {
  id: number
  lat: number
  lon: number
  postcode: string
  city: string
  street: string
  housenumber: string
  levels: number
  isophoneIndexDay?: number
  isophoneIndexNight?: number
}

export async function fetchAddressInRadius(
  lat: number,
  lon: number,
  radius: number
): Promise<Address[]> {
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
    return data.elements.map((element: any) => {
      const { lat, lon, tags, id } = element
      return {
        id,
        lat: lat || element.center.lat,
        lon: lon || element.center.lon,
        postcode: tags['addr:postcode'] || '',
        city: tags['addr:city'] || '',
        street: tags['addr:street'] || tags['addr:place'] || '',
        housenumber: tags['addr:housenumber'] || '',
        levels: Number(tags['building:levels']) || ''
      }
    })
  } catch (e) {
    throw e
  }
}
