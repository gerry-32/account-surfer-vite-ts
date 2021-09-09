// export const SharedStoreProvider = ({ children }) => {

// }

// import { useState, useEffect } from 'react'

// const useStoreChange = (fieldName: any) => {
//   const [state, setState] = useState(window.initialStoreData)

//   const setField = (newVal: any) => {
//     window.sendEvent('requestStoreSet', { [fieldName]: newVal })
//   }

//   useEffect(() => {
//     const unsubscribe = window.onStoreChange((newState: any) => {
//       setState(newState)
//     })
//     return () => unsubscribe()
//   }, [])

//   return [state?.[fieldName], setField]
// }

// export default useStoreChange
