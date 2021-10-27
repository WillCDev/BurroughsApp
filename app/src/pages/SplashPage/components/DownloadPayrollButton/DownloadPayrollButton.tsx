import { FC, useEffect, useState } from 'react'
import Button from 'core/components/Button'
import { downloadPayroll } from 'core/http/payroll'
import useSoundFX from 'core/utils/useSoundFX'
import { Sounds } from 'core/utils/useSoundFX/useSoundFX'

const DownloadPayrollButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dialup = useSoundFX(Sounds.DialUp)
  let timer: number

  const stopDownload = (): void => {
    dialup.stop()
    setIsLoading(false)
    clearTimeout(timer)
  }

  const clickHandler = (): void => {
    dialup.play()
    setIsLoading(true)

    timer = window.setTimeout(() => {
      downloadPayroll().finally(stopDownload)
    }, 6000)
  }

  useEffect(() => {
    return stopDownload
  }, [])

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
