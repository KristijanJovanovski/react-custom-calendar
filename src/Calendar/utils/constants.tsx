export enum DATE_TYPES {
  DATE = 'DATE',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  DECADE = 'DECADE',
  CENTURY = 'CENTURY'
}

export enum MONTH_FORMAT {
  SHORT = 'SHORT',
  LONG = 'LONG'
}

export enum DAYS {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY'
}

export enum TIME_TYPE {
  MINUTE = 'MINUTE',
  HOUR = 'HOUR'
}

export enum CALENDAR_TYPE {
  US = 'US',
  ISO_8601 = 'ISO 8601'
}

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
