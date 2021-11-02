import { FC } from 'react'
import { Link } from 'react-router-dom'
import PayrollTable from './containers/PayrollTable'
import styles from './PayrollPage.less'

const PayrollPage: FC = () => (
  <>
    <Link to="/" className={styles.backbutton}>
      <span>{'<'}</span>
    </Link>
    <div className={styles.payrollpage}>
      <header>Payroll Viewer</header>
      <section className={styles.viewercontainer}>
        <PayrollTable />
      </section>
    </div>
  </>
)

export default PayrollPage
