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

export const isophoneLabels = new Map<string, { day: number; night: number }>([
  ['Industriegebiet (GI)', { day: 70, night: 70 }],
  ['Gewerbegebiet (GE)', { day: 65, night: 50 }],
  ['Mischgebiet (MI)', { day: 60, night: 45 }],
  ['Allgemeines Wohngebiet (WA)', { day: 55, night: 40 }],
  ['Reines Wohngebiet (WR)', { day: 50, night: 35 }],
  ['Sondergebiet/ Kurgebiet (SO)', { day: 45, night: 35 }]
])

export function getImmissionThresholds() {
  return {
    day: Object.keys(isophoneLevels.day).map(Number),
    night: Object.keys(isophoneLevels.night).map(Number)
  }
}

export function getIsophoneColor(level: number, time: TimeOfDay) {
  return isophoneLevels[time][Number(level)]
}
