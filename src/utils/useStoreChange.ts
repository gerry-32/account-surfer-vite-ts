import { useState, useEffect } from 'react'
import useIsMounted from './useIsMounted'

const useStoreChange = (fromSource?: string): any => {
  const [state, setState] = useState(window.initialStoreData)
  const isMounted = useIsMounted()

  useEffect(() => {
    const unsubscribe = window.onStoreChange((newState: any) => {
      if (isMounted.current) setState(newState)
    })
    return () => unsubscribe()
  }, [])

  return state
}

export default useStoreChange
