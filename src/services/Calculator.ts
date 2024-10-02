import type { Machine } from '../stores/constructionMachineStore'
import { getImmissionThresholds } from './Isophones'

export const IMMISSION_THRESHOLDS = getImmissionThresholds()

// Funktion zur Berechnung der Isophonen
export function calculateIsophones(machines: Machine[]) {
  const dayNoiseLevels: number[] = []
  const nightNoiseLevels: number[] = []

  for (const machine of machines) {
    if (machine.dayHours ?? 0 > 0) {
      dayNoiseLevels.push(machine.volume! + calculateDayBonus(machine.dayHours!))
    }
    if (machine.nightHours ?? 0 > 0) {
      nightNoiseLevels.push(machine.volume! + calculateNightBonus(machine.nightHours!))
    }
  }

  let dayRadii: Record<number, number> = {}
  let nightRadii: Record<number, number> = {}

  // Berechnung der Radien basierend auf den Geräuschpegeln
  if (dayNoiseLevels.length !== 0) {
    dayRadii = calculateRadii(sumNoiseLevels(dayNoiseLevels), IMMISSION_THRESHOLDS.day)
  }
  if (nightNoiseLevels.length !== 0) {
    nightRadii = calculateRadii(sumNoiseLevels(nightNoiseLevels), IMMISSION_THRESHOLDS.night)
  }

  return {
    day: dayRadii,
    night: nightRadii
  }

  // Berechnung des Nachtbonus
  function calculateNightBonus(duration: number): number {
    if (duration < 2) {
      return -10
    } else if (duration < 6) {
      return -5
    }
    return 0
  }

  // Berechnung des Tagbonus
  function calculateDayBonus(duration: number): number {
    if (duration < 2.5) {
      return -10
    } else if (duration < 8) {
      return -5
    }
    return 0
  }

  // Summe der Geräuschpegel berechnen
  function sumNoiseLevels(noiseLevels: number[]): number {
    return 10 * Math.log10(noiseLevels.reduce((sum, level) => sum + 10 ** (level / 10), 0))
  }

  // Funktion zur Berechnung der Radien
  function calculateRadii(
    totalNoiseLevel: number,
    immissionThresholds: number[],
    sourceHeight = 3.0
  ) {
    const radii: Record<number, number> = {}

    for (let distance = 5; distance <= 100000; distance += 5) {
      const soundPressure = calculateSoundPressure(totalNoiseLevel, distance, sourceHeight)

      for (let i = 0; i < immissionThresholds.length; i++) {
        if (soundPressure >= immissionThresholds[i]) {
          radii[immissionThresholds[i]] = distance
        }
      }

      if (soundPressure < Math.min(...immissionThresholds)) {
        break
      }
    }

    return radii
  }

  // Berechnung des Schalldrucks
  function calculateSoundPressure(
    noiseLevel: number,
    distance: number,
    sourceHeight: number
  ): number {
    const heightDifferenceMinus = sourceHeight - 5.1
    const heightDifferencePlus = sourceHeight + 5.1
    const distanceSquared = distance ** 2
    return (
      noiseLevel +
      calculateDirectionalCorrection(distanceSquared, heightDifferenceMinus, heightDifferencePlus) -
      (20 * Math.log10(distance) +
        11 +
        (2.8 * distance) / 1000 +
        4.8 -
        (heightDifferencePlus / distance) * (17 + 300 / distance))
    )
  }

  // Berechnung der Richtwirkungskorrektur
  function calculateDirectionalCorrection(
    distanceSquared: number,
    heightDifferenceMinus: number,
    heightDifferencePlus: number
  ) {
    return (
      10 *
      Math.log10(
        1 +
          (distanceSquared + heightDifferenceMinus ** 2) /
            (distanceSquared + heightDifferencePlus ** 2)
      )
    )
  }
}
