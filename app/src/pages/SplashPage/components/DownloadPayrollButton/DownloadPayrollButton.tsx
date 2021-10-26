import { FC, useState } from 'react'
import Button from 'core/components/Button'
import { downloadPayroll } from 'core/http/payroll'
import useSoundFX from 'core/utils/useSoundFX'
import { Sounds } from 'core/utils/useSoundFX/useSoundFX'

const DownloadPayrollButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dialup = useSoundFX(Sounds.DialUp)

  const clickHandler = (): void => {
    dialup.play()
    setIsLoading(true)

    const timeout = setTimeout(() => {
      downloadPayroll().finally(() => {
        dialup.stop()
        setIsLoading(false)
        clearTimeout(timeout)
      })
    }, 6000)
  }

  return (
    <Button
      text={isLoading ? 'Downloading Payroll...' : 'Download Payroll as CSV'}
      onClick={clickHandler}
      style={{ width: '50%' }}
      disabled={isLoading}
    />
  )
}

export default DownloadPayrollButton
