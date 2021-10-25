import { isWednesday } from 'date-fns'
import {
  getBonusDateForThisMonth,
  getSalaryDateForThisMonth,
} from '../payroll.utils'

describe('getBonusDateForThisMonth', () => {
  it('should return the bonus day as the 15th of the month if it does not fall on a weekend', () => {
    // Sept 2021 -> 15th falls on a Wednesday
    const today = new Date('September 10, 2021 00:00:00')
    const bonusDay = getBonusDateForThisMonth(today)

    expect(bonusDay).toEqual(new Date('2021-09-15T00:00:00.000Z'))
  })

  it('should return the next wednesday if the 15th falls on a weekend', () => {
    // Aug 2021 -> 15th falls on a Sunday
    const today = new Date('August 10, 2021 00:00:00')
    const bonusDay = getBonusDateForThisMonth(today)

    expect(bonusDay).toEqual(new Date('2021-08-18T00:00:00.000Z'))
    expect(isWednesday(bonusDay)).toBeTruthy()
  })
})

describe('getSalaryDateForThisMonth', () => {
  it('should return the last day of the month if it does not fall on a weekend', () => {
    // Aug 2021 -> 31st falls on a Tuesday
    const today = new Date('August 10, 2021 00:00:00')
    const bonusDay = getSalaryDateForThisMonth(today)

    expect(bonusDay).toEqual(new Date('2021-08-31T00:00:00.000Z'))
  })

  it('should return the previous friday if the last day falls on a weekend', () => {
    // July 2021 -> 31st falls on a Saturday
    const today = new Date('July 10, 2021 00:00:00')
    const bonusDay = getSalaryDateForThisMonth(today)

    expect(bonusDay).toEqual(new Date('2021-07-30T00:00:00.000Z'))
  })
})
