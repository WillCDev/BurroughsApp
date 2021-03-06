import { FC } from 'react'
import Button from 'core/components/Button'
import DownloadPayrollButton from './components/DownloadPayrollButton'
import styles from './SplashPage.less'

const SplashPage: FC = () => (
  <div className={styles.splashpage}>
    <header data-test-id="titleBanner">
      <h1>WillCorp</h1>
      <h4>Productivity Tools</h4>
    </header>

    <section>
      <Button text="Payroll Viewer" style={{ width: '40%' }} href="/payroll" />
      <DownloadPayrollButton />
    </section>
  </div>
)

export default SplashPage
