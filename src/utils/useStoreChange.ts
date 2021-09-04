import { useState, useEffect } from 'react'
import DEFAULT_STORE from '../mocks/store.mock'

const getInitialState = () =>
  process.env.NODE_ENV === 'development' ? DEFAULT_STORE : window.AS.store.store

const useStoreChange = fieldName => {
  const [state, setState] = useState(getInitialState())

  const setField = newVal => {
    if (process.env.NODE_ENV === 'development') {
      window.AS.localStore.emit(`store-update:${fieldName}`, { [fieldName]: newVal })
    } else {
      window.AS.store.set(fieldName, newVal)
    }
  }

  useEffect(() => {
    let unsubscribe

    if (process.env.NODE_ENV === 'development') {
      unsubscribe = window.AS.localStore.subscribe(`store-update:${fieldName}`, data => {
        setState({ ...state, [fieldName]: data[fieldName] })
      })
    } else {
      unsubscribe = window.AS.store.onDidChange(fieldName, newValue =>
        setState({ ...state, [fieldName]: newValue })
      )
    }
    return () => unsubscribe()
  }, [])

  return [state?.[fieldName], setField]
}

export default useStoreChange
