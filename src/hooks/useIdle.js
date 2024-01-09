import { useState, useEffect, useRef } from 'react'

import { IDLE_TIME } from '@/helpers'

const USER_EVENTS = [
  'mousemove',
  'mousedown',
  'keypress',
  'DOMMouseScroll',
  'mousewheel',
  'touchmove',
  'MSPointerMove',
  'focus'
]

const useIdle = (delay = IDLE_TIME) => {
  const [isIdle, setIsIdle] = useState(false)

  // create a new reference to track timer
  const timeoutId = useRef()

  // assign and remove the listeners
  useEffect(() => {
    setup()

    return () => {
      cleanUp()
    }
  })

  const startTimer = () => {
    // wait till delay time before calling goInactive
    timeoutId.current = setTimeout(goInactive, delay)
  }

  const resetTimer = () => {
    //reset the timer and make user active
    clearTimeout(timeoutId.current)
    goActive()
  }

  const goInactive = () => {
    setIsIdle(true)
  }

  const goActive = () => {
    setIsIdle(false)

    // start the timer to track Inactiveness
    startTimer()
  }

  const setup = () => {
    for (const event of USER_EVENTS) {
      document.addEventListener(event, resetTimer, false)
    }

    //edge case
    //if tab is changed or is out of focus
    window.addEventListener('blur', startTimer, false)
  }

  const cleanUp = () => {
    for (const event of USER_EVENTS) {
      document.removeEventListener(event, resetTimer)
    }
    window.removeEventListener('blur', startTimer)

    // memory leak
    clearTimeout(timeoutId.current)
  }

  // return previous value (happens before update in useEffect above)
  return { isIdle }
}

export default useIdle
