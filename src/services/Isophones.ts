export const isophoneLevels = {
  35: '#824c7c',
  40: '#891d20',
  45: '#cb2e34',
  50: '#ee7821',
  55: '#996a29',
  60: '#f1d90b',
  65: '#00694c',
  70: '#66aa22'
}

export function getIsophoneColor(index: number) {
  return Object.values(isophoneLevels)[index]
}
