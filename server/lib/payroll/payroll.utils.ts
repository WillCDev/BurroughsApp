import {
  addDays,
  endOfMonth,
  getDate,
  isWeekend,
  nextWednesday,
  previousFriday,
} from 'date-fns'
import config from './payroll.config'

export function getBonusDateForThisMonth(refDate: Date): Date {
  const bonusDate = addDays(refDate, config.bonusDay - getDate(refDate))
  return isWeekend(bonusDate) ? nextWednesday(bonusDate) : bonusDate
}

export function getSalaryDateForThisMonth(refDate: Date): Date {
  const salaryDate = endOfMonth(refDate)
  return isWeekend(salaryDate) ? previousFriday(salaryDate) : salaryDate
}
