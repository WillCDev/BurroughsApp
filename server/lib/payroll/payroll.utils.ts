import {
  addDays,
  lastDayOfMonth,
  getDate,
  isWeekend,
  nextWednesday,
  previousFriday,
  format,
} from 'date-fns'
import config from './payroll.config'

export function getDateText(date?: Date): string {
  if (!date) return '-'
  return format(date, config.csvDateFormat)
}

export function getBonusDateForThisMonth(refDate: Date): Date {
  const bonusDate = addDays(refDate, config.bonusDay - getDate(refDate))
  return isWeekend(bonusDate) ? nextWednesday(bonusDate) : bonusDate
}

export function getSalaryDateForThisMonth(refDate: Date): Date {
  const salaryDate = lastDayOfMonth(refDate)
  return isWeekend(salaryDate) ? previousFriday(salaryDate) : salaryDate
}
