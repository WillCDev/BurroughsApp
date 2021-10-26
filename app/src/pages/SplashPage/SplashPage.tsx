import { FC } from 'react'
import styles from './SplashPage.less'

const SplashPage: FC = () => {
  return (
    <div className={styles.pagewrapper}>
      <header>
        <h1>WillCorp</h1>
        <h4>Productivity Tools</h4>
      </header>
    </div>
  )
}

export default SplashPage
