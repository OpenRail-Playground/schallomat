// Import necessary libraries

// Global constant for immissions thresholds
export const IMMISIONS_RICHTWERTE: Record<string, number[]> = {
  day: [45, 50, 55, 60, 65, 70],
  night: [35, 35, 40, 45, 50, 70]
}

export function calculateIsophones(
  input: [string, number, number, number][]
): Record<string, number[]> {
  const dayVolumes: number[] = []
  const nightVolumes: number[] = []

  for (const machine of input) {
    // what if under 0
    if (machine[2] != 0) {
      dayVolumes.push(machine[1] + dayBonus(machine[2]))
    }
    if (machine[3] != 0) {
      nightVolumes.push(machine[1] + nightBonus(machine[3]))
    }
  }

  const day_radiums: number[] = []
  const night_radiums: number[] = []

  if (dayVolumes.length != 0) {
    day_radiums.push(calculateRadius(sum_schallleistungen(dayVolumes), IMMISIONS_RICHTWERTE['day']))
  }
  if (nightVolumes.length != 0) {
    night_radiums.push(calculateRadius(
      sum_schallleistungen(nightVolumes),
      IMMISIONS_RICHTWERTE['night'])
    )
  }

  return {
    day: day_radiums,
    night: night_radiums
  }
}

function nightBonus(dauer: number): number {
  if (dauer < 2) {
    return -10
  } else if (dauer < 6) {
    return -5
  }
  return 0
}

function dayBonus(dauer: number): number {
  if (dauer < 2.5) {
    return -10
  } else if (dauer < 8) {
    return -5
  }
  return 0
}

function sum_schallleistungen(schallleistung: number[]): number {
  return 10 * Math.log10(schallleistung.reduce((sum, leistung) => sum + 10 ** (leistung / 10), 0))
}

// Function to calculate radius
function calculateRadius(
  summenschallleistung: number,
  immisions_richtwerte: number[],
  hSource = 3.0
): number[] {
  // Define the result dictionary
  const radius: number[] = []

  // Iterate over the range with step size of 5
  for (let r = 5; r <= 100000; r += 5) {
    const schalldruck = calc_schalldruck(summenschallleistung, r, hSource)

    for (let i = 0; i < immisions_richtwerte.length; i++) {
      if (schalldruck >= immisions_richtwerte[i]) {
        radius[i] = r
      }
    }

    if (schalldruck < Math.min(...immisions_richtwerte)) {
      break
    }
  }

  return radius
}

function calc_schalldruck(leistung: number, distance: number, noise_height: number): number {
  const h_minus = noise_height - 5.1
  const h_plus = noise_height + 5.1
  const distance_squared = distance ** 2
  return (
    leistung +
    richtwirkungskorrektur(distance_squared, h_minus, h_plus) -
    (20 * Math.log10(distance) +
      11 +
      (2.8 * distance) / 1000 +
      4.8 -
      (h_plus / distance) * (17 + 300 / distance))
  )
}

function richtwirkungskorrektur(distance_squared: number, h_minus: number, h_plus: number) {
  return 10 * Math.log10(1 + (distance_squared + h_minus ** 2) / (distance_squared + h_plus ** 2))
}
