// import React, { createContext, useState, useEffect, useContext } from 'react'

// const defaultState = {
//   A: 0,
//   B: 0
// }

// export const SharedCountContext = createContext({
//   state: defaultState,
//   setSharedCount: () => {
//     return
//   }
// })

// export const SharedCountProvider = ({ children }: any) => {
//   const [state, setState] = useState(defaultState)

//   const [contextValue, setContextValue] = useState({
//     state,
//     // dispatch // from your reducer
//     // this is where a reducer comes handy when this grows
//     setSharedCount: (key: any, val: any) => {
//       storeState(state => {
//         return { ...state, [key]: val }
//       })
//     }
//   })

//   // avoids deep re-renders
//   // when instances of stuff in context change
//   useEffect(() => {
//     setContextValue(currentValue => ({
//       ...currentValue,
//       state
//     }))
//   }, [state])

//   return (
//     <SharedCountContext.Provider value={contextValue}>
//       {children}
//     </SharedCountContext.Provider>
//   )
// }

// export function useSharedCount() {
//   const { state, setSharedCount } = useContext(SharedCountContext)

//   function incA() {
//     setSharedCount('A', state.A + 1)
//   }

//   function incB() {
//     setSharedCount('B', state.B + 1)
//   }

//   return { count: state, incA, incB }
// }
