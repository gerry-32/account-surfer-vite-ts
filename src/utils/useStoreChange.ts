import { useState, useEffect } from 'react'

const useStoreChange = (): [any] => {
  const [state, setState] = useState(window.initialStoreData)

  useEffect(() => {
    const unsubscribe = window.onStoreChange((newState: any) => {
      setState(newState)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return [state]
}

export default useStoreChange
