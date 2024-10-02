export type TimeOfDay = 'day' | 'night'

// Globale Konstante für die Immissionsrichtwerte
// MUSS ZWINGEND in aufsteigender Ordnung sein.
export const isophoneLevels: Record<TimeOfDay, Record<number, string>> = {
  day: {
    45: '#66aa22',
    50: '#00694c',
    55: '#f1d90b',
    60: '#996a29',
    65: '#ee7821',
    70: '#cb2e34'
  },
  night: {
    35: '#66aa22',
    40: '#ee7821',
    45: '#cb2e34',
    50: '#891d20',
    70: '#824c7c'
  }
}

export const isophoneLabel = [
  'Sondergebiet/ Kurgebiet (SO)',
  'Reines Wohngebiet (WR)',
  'Allgemeines Wohngebiet (WA)',
  'Mischgebiet (MI)',
  'Gewerbegebiet (GE)',
  'Industriegebiet (GI)'
]

export function getImmissionThresholds() {
  return {
    day: Object.keys(isophoneLevels.day).map(Number),
    night: Object.keys(isophoneLevels.night).map(Number)
  }
}

export function getIsophoneColor(index: number, time: TimeOfDay) {
  return Object.values(isophoneLevels[time])[index]
}
