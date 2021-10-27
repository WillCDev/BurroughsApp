import {
  addMonths,
  format,
  isWithinInterval,
  isAfter,
  subDays,
  startOfDay,
} from 'date-fns'
import { PaymentsByMonth, PaymentsMap, PaymentType } from './payroll.types'
import config from './payroll.config'
import {
  getBonusDateForThisMonth,
  getDateText,
  getSalaryDateForThisMonth,
} from './payroll.utils'

export function getPayrollDates(): PaymentsByMonth {
  const start: number = Date.now()

  const adjustedStart: Date = startOfDay(subDays(start, 4)) // See *

  const end: Date = addMonths(start, config.durationInMonths)

  function getDatesByMonth(
    refDate: Date = adjustedStart,
    datesByMonth: PaymentsByMonth = {}
  ): PaymentsByMonth {
    const dates: PaymentsMap = {}

    const bonusDate = getBonusDateForThisMonth(refDate)
    if (isWithinInterval(bonusDate, { start, end })) {
      dates[PaymentType.Bonus] = getDateText(bonusDate)
    }

    const salaryDate = getSalaryDateForThisMonth(refDate)
    if (isWithinInterval(salaryDate, { start, end })) {
      dates[PaymentType.Salary] = getDateText(salaryDate)
    }

    if (dates[PaymentType.Salary] || dates[PaymentType.Bonus]) {
      datesByMonth[format(refDate, 'MMM yyyy')] = dates
    }

    if (isAfter(bonusDate, end) || isAfter(salaryDate, end)) return datesByMonth
    return getDatesByMonth(addMonths(refDate, 1), datesByMonth)
  }

  return getDatesByMonth()
}

// * If the bonus date configuration has been moved towards
// the end of the month, and payroll is ran at the beginning of the month
// If the previous bonus period fell on a weekend, it's possible that it was therefore
// pushed forward to the next wednesday and into this payroll run
// So we look back 4 days (max distance between Sat -> Wed) to check this.

// ** The algorithm is slightly inefficient in that it potentially selects dates
// outside the payroll period and then discounts them via the "isWIthinInterval"
// check, however given the very small size of recursion, the trade off is cleaner
// more readable code IMO.

// *** We also don't account for TZs right now, so are at the mercy of the TZof the runtime env
// this would be another iteration of work, but for now is not a requirement

export function buildPayrollCSV(payments: PaymentsByMonth): string {
  return Object.entries(payments).reduce(
    (content, [key, { bonus, salary }]) => {
      return `${content}\n${key},${bonus},${salary}`
    },
    'Month/Year,Bonus,Salary'
  )
}
