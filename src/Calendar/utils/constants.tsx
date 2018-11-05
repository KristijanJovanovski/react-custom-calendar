export const DATE = 'DATE'
export const MONTH = 'MONTH'
export const YEAR = 'YEAR'
export const DECADE = 'DECADE'
export const CENTURY = 'CENTURY'
export type DATE_TYPES = 'DATE' | 'MONTH' | 'YEAR' | 'DECADE' | 'CENTURY'

export const SHORT = 'SHORT'
export const LONG = 'LONG'
export type MONTH_FORMAT = 'SHORT' | 'LONG'

export const SUNDAY = 'SUNDAY'
export const MONDAY = 'MONDAY'
export const TUESDAY = 'TUESDAY'
export const WEDNESDAY = 'WEDNESDAY'
export const THURSDAY = 'THURSDAY'
export const FRIDAY = 'FRIDAY'
export const SATURDAY = 'SATURDAY'

export type DAYS =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'

export const MINUTE = 'MINUTE'
export const HOUR = 'HOUR'

export type TIME_TYPE = 'MINUTE' | 'HOUR'

export const US = 'US'
export const ISO_8601 = 'ISO 8601'

export type CALENDAR_TYPE = 'US' | 'ISO 8601'

export const months = {
  en: {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  },
  mk: {
    1: 'Јануари',
    2: 'Февруари',
    3: 'Март',
    4: 'Април',
    5: 'Мај',
    6: 'Јуни',
    7: 'Јули',
    8: 'Август',
    9: 'Септември',
    10: 'Октомври',
    11: 'Ноември',
    12: 'Декември'
  }
}

export const days = {
  en: {
    long: [
      'SUNDAY',
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY'
    ],
    short: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  },
  mk: {
    long: [
      'НЕДЕЛА',
      'ПОНЕДЕЛНИК',
      'ВТОРНИК',
      'СРЕДА',
      'ЧЕТВРТОК',
      'ПЕТОК',
      'САБОТА'
    ],
    short: ['НЕД', 'ПОН', 'ВТО', 'СРЕ', 'ЧЕТ', 'ПЕТ', 'САБ']
  }
}
