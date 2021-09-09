import { useState, useEffect } from 'react'

const useStoreChange = (fieldName: any) => {
  const [state, setState] = useState(window.initialStoreData)

  const setField = (newVal: any) => {
    window.sendEvent('requestStoreSet', { [fieldName]: newVal })
  }

  useEffect(() => {
    // let unsubscribe: any
    // let isActive = true
    // if (isActive) {
    const unsubscribe = window.onStoreChange((newState: any) => {
      setState(newState)
    })
    // }
    return () => {
      console.log('unsubscribe() ' + fieldName)
      // isActive = false
      unsubscribe()
    }
  }, [])

  return [state?.[fieldName], setField]
}

export default useStoreChange
