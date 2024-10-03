import type { Machine } from '../stores/constructionMachineStore'
import { getImmissionThresholds } from './Isophones'

export const immissionThresholds = getImmissionThresholds()

const sourceHeight = 3.0 // Wir aktuell nicht aus den Stammdaten der Baumaschinen entnommen
const receiverHeight = 5.1 // Gebäude 1. Stock
const maxDistance = 100000 // Maximaler zu rechnenden Radius
const stepDistance = 5 // Granularität der Radiusberechnung
const coefficientAbsorption = 2.8 // 500Hz, 20°C


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
    dayRadii = calculateRadii(sumNoiseLevels(dayNoiseLevels), immissionThresholds.day, sourceHeight, receiverHeight)
  }
  if (nightNoiseLevels.length !== 0) {
    nightRadii = calculateRadii(sumNoiseLevels(nightNoiseLevels), immissionThresholds.night, sourceHeight, receiverHeight)
  }

  return {
    day: dayRadii,
    night: nightRadii
  }
}

// Berechnung des Nachtbonus (Anpassung der Dezibel aufgrund der Lärmdauer)
function calculateNightBonus(duration: number): number {
  if (duration < 2) {
    return -10
  } else if (duration < 6) {
    return -5
  }
  return 0
}

// Berechnung des Tagbonus (Anpassung der Dezibel aufgrund der Lärmdauer)
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
  sourceHeight: number,
  receiverHeight: number,
) {
  const radii: Record<number, number> = {}

  for (let distance = stepDistance; distance <= maxDistance; distance += stepDistance) {
    const soundPressure = calculateSoundPressure(totalNoiseLevel, distance, sourceHeight, receiverHeight)

    immissionThresholds.forEach(threshold => {
      if (soundPressure >= threshold) {
        radii[threshold] = distance;
      }
    })

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
  sourceHeight: number,
  receiverHeight: number,
): number {
  return (
    noiseLevel +
    calculateDirectionalCorrection(distance, sourceHeight, receiverHeight) -
    calculateOctaveBandAbsorption(distance, sourceHeight, receiverHeight)
  )
}

// Berechnung Oktavbanddämpfung
function calculateOctaveBandAbsorption(
  distance: number,
  sourceHeight: number,
  receiverHeight: number,
): number {
  return (
    calculateGeometricDiffusion(distance) +
    calculateAirAbsorption(distance) +
    calculateGroundAbsorption(distance, sourceHeight, receiverHeight)
  )
}

// Berechnung der Bodendämpfung
function calculateGroundAbsorption(
  distance: number,
  sourceHeight: number,
  receiverHeight: number,
): number {
  return (
    4.8 - ((sourceHeight + receiverHeight) / distance) * (17 + 300 / distance)
  )
}

// Berechnung der geometrischen Ausbreitung
function calculateGeometricDiffusion(
  distance: number,
): number {
  return (
    20 * Math.log10(distance) + 11
  )
}

// Berechnung der Luftabsorption
function calculateAirAbsorption(
  distance: number,
): number {
  return (
    coefficientAbsorption * distance / 1000
  )
}

// Berechnung der Richtwirkungskorrektur
function calculateDirectionalCorrection(
  distance: number,
  sourceHeight: number,
  receiverHeight: number,
) {
  return (
    10 *
    Math.log10(
      1 +
        ((distance ** 2) + sourceHeight - (receiverHeight ** 2)) /
          ((distance ** 2) + sourceHeight + (receiverHeight ** 2))
    )
  )
}
