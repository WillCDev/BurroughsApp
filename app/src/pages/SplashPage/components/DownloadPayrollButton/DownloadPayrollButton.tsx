import { FC, useRef, useState } from 'react'
import { Howl } from 'howler'
import Button from 'core/components/Button'

const DownloadPayrollButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const dialup = useRef<InstanceType<typeof Howl>>(
    new Howl({
      src: ['/assets/audio/dial-up.mp3'],
    })
  )

  const clickHandler = (): void => {
    dialup.current.play()
    setIsLoading(true)

    const timeout = setTimeout(() => {
      dialup.current.stop()
      setIsLoading(false)

      clearTimeout(timeout)
    }, 8000)
  }

  return (
    <Button
      text={`Download Payroll as CSV ${isLoading ? '...' : ''}`}
      onClick={clickHandler}
      style={{ width: '50%' }}
      disabled={isLoading}
    />
  )
}

export default DownloadPayrollButton
