import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './PayrollPage.less'

const PayrollPage: FC = () => {
  return (
    <>
      <Link to="/" className={styles.backbutton}>
        <span>{'<'}</span>
      </Link>
      <div className={styles.payrollpage}>
        <header>Payroll Page</header>
      </div>
    </>
  )
}

export default PayrollPage
