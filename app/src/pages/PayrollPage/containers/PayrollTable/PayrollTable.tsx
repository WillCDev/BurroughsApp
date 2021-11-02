import { FC, useEffect, useState } from 'react'
import { getPayroll, PayrollJson } from 'core/http/payroll'
import useSoundFX from 'core/utils/useSoundFX'
import { Sounds } from 'core/utils/useSoundFX/useSoundFX'
import styles from './PayrollTable.less'

const PayrollTable: FC = () => {
  const [payroll, setPayroll] = useState<PayrollJson>()
  const printer = useSoundFX(Sounds.Printer)
  let timer: number

  const stopPrinter = (): void => {
    printer.stop()
    clearTimeout(timer)
  }

  useEffect(() => {
    getPayroll()
      .then((payrolldata) => {
        printer.play()
        setPayroll(payrolldata)
      })
      .then(() => {
        // TODO: Sync up the length of the animation and the soundFX
        timer = window.setTimeout(stopPrinter, 9000)
      })

    return stopPrinter
  }, [])

  if (!payroll) return <>Fetching Payroll Info....be patient!!</>

  return (
    <div className={styles.payrolltable}>
      <table>
        <thead>
          <tr>
            <th>Month / Year</th>
            <th>Bonus Payment</th>
            <th>Salary Payment</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(payroll).map(([date, { salary, bonus }]) => {
            return (
              <tr key={date}>
                <td>{date}</td>
                <td>{bonus || '-'}</td>
                <td>{salary || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PayrollTable
