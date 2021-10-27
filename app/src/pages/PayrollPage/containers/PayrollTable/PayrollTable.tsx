import { FC, useEffect, useState } from 'react'
import { getPayroll, PayrollJson } from 'core/http/payroll'
import useSoundFX from 'core/utils/useSoundFX'
import { Sounds } from 'core/utils/useSoundFX/useSoundFX'
import styles from './PayrollTable.less'

const PayrollTable: FC = () => {
  const [payroll, setPayroll] = useState<PayrollJson>()
  const printer = useSoundFX(Sounds.Printer)

  useEffect(() => {
    printer.play()

    getPayroll()
      .then(setPayroll)
      .then(() => {
        // TODO: Sync up the length of the animation and the soundFX
        const timer = setTimeout(() => {
          printer.stop()
          clearTimeout(timer)
        }, 9000)
      })
  }, [])

  if (!payroll) return <>Fetching Payroll Info....be patient!!</>

  return (
    <div className={styles.payrolltable}>
      <table>
        <thead>
          <tr>
            <th>Month / Year</th>
            <th>Salary Payment</th>
            <th>Bonus Payment</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(payroll).map(([date, { salary, bonus }]) => {
            return (
              <tr key={date}>
                <td>{date}</td>
                <td>{salary || '-'}</td>
                <td>{bonus || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PayrollTable
