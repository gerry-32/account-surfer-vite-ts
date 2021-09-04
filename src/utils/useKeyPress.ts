import { useState, useEffect } from 'react'

const useKeyPress = (
  conditionMatch = e => {},
  // onPressDown = () => {},
  onPressUp = () => {}
) => {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const downHandler = e => {
      if (conditionMatch(e)) {
        setKeyPressed(true)
        // onPressDown(e)
      }
    }

    const upHandler = e => {
      if (conditionMatch(e)) {
        setKeyPressed(false)
        onPressUp(e)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  })

  return keyPressed
}

export default useKeyPress
