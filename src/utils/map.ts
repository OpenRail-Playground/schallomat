import type { Address } from '../services/OverpassApi'
import { fromLonLat } from 'ol/proj'
import { Circle as CircleGeom } from 'ol/geom'
import type { Coordinate } from 'ol/coordinate'

export function filterAddressesWithinCircle(
  addresses: Address[],
  coordinate: Coordinate,
  radiusInMeters: number
) {
  // Convert center point to OpenLayers coordinates
  const center = fromLonLat(coordinate)

  // Create a circle geometry with OpenLayers
  const circle = new CircleGeom(center, radiusInMeters)

  const matches: Address[] = []
  const rest: Address[] = []

  addresses.forEach((address) => {
    // Convert each address's lat/lon to OpenLayers coordinates
    const coord = fromLonLat([address.lon, address.lat])

    // Check if the point is within the circle
    if (circle.intersectsCoordinate(coord)) {
      matches.push(address)
    } else {
      rest.push(address)
    }
  })

  return { matches, rest }
}
