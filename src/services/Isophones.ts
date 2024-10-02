export type TimeOfDay = 'day' | 'night'

// Globale Konstante für die Immissionsrichtwerte
// MUSS ZWINGEND in aufsteigender Ordnung sein.
export const isophoneLevels: Record<TimeOfDay, Record<number, string>> = {
  day: {
    70: '#cb2e34',
    65: '#ee7821',
    60: '#996a29',
    55: '#f1d90b',
    50: '#00694c',
    45: '#66aa22',
  },
  night: {
    70: '#824c7c',
    50: '#891d20',
    45: '#cb2e34',
    40: '#ee7821',
    35: '#66aa22',
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

export function getIsophoneColor(isophone: number, time: TimeOfDay) {
  return isophoneLevels[time][Number(isophone)]
}
