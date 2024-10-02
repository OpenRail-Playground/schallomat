export type TimeOfDay = 'day' | 'night'

// Globale Konstante für die Immissionsrichtwerte
// MUSS ZWINGEND in aufsteigender Ordnung sein.
export const isophoneLevels: Record<TimeOfDay, Record<number, string>> = {
  day: {
    70: '#824c7c',
    65: '#891d20',
    60: '#cb2e34',
    55: '#ee7821',
    50: '#996a29',
    45: '#f1d90b'
  },
  night: {
    70: '#824c7c',
    50: '#996a29',
    45: '#f1d90b',
    40: '#00694c',
    35: '#66aa22' // assigned twice (see datasheet)
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
