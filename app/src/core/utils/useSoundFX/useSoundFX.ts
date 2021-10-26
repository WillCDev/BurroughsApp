import { useRef } from 'react'
import { Howl } from 'howler'

export enum Sounds {
  DialUp,
  Printer,
}
type HowlInstance = InstanceType<typeof Howl>

const soundFiles = {
  [Sounds.DialUp]: 'dial-up.mp3',
  [Sounds.Printer]: 'printer.mp3',
}

const useSoundFX = (sound: Sounds): HowlInstance => {
  const dialup = useRef<HowlInstance>(
    new Howl({
      src: [`/assets/audio/${soundFiles[sound]}`],
    })
  )

  return dialup.current
}

export default useSoundFX
