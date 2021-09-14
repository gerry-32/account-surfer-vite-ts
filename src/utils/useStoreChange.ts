import { useState, useEffect } from 'react'

const useStoreChange = (): [any, any] => {
  const [state, setState] = useState(window.initialStoreData)

  const updateStore = (newDataObj: any) => {
    window.invokeEvent('storeSet', newDataObj)
  }

  useEffect(() => {
    const unsubscribe = window.onStoreChange((newState: any) => {
      setState(newState)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return [state, updateStore]
}

export default useStoreChange
