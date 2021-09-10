import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import TitleBar from './TitleBar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import NotDefault from './pages/NotDefault'
import useKeyPress from './utils/useKeyPress'
import useStoreChange from './utils/useStoreChange'
// import DEFAULT_VIEWERS from '@/mocks/viewers.mock'
import './App.css'

function App() {
  const history = useHistory()
  const [state, storeState] = useStoreChange()
  const { currentPage, isDefaultBrowser } = state

  useEffect(() => {
    history.push(currentPage)
  }, [currentPage])

  useKeyPress(
    ({ code, ctrlKey, shiftKey }: any) => code === 'KeyI' && ctrlKey && shiftKey,
    () => window.sendEvent('requestOpenDevTools')
  )
  useKeyPress(
    ({ code }: any) => code === 'Escape',
    () => window.sendEvent('requestHideWindow')
  )
  useKeyPress(
    ({ code, ctrlKey }: any) => code === 'KeyR' && ctrlKey,
    () => storeState({ url: '', shouldSaveDomain: false })
  )
  useKeyPress(
    ({ code, ctrlKey }: any) => code === 'KeyC' && ctrlKey,
    () => copy(state.url)
  )

  return (
    <div className="relative h-screen select-none">
      <TitleBar />
      {isDefaultBrowser ? (
        <Switch>
          <Route path="/as-not-default">
            <NotDefault />
          </Route>
          <Route path="/settings">
            <Settings {...{ state, storeState }} />
          </Route>
          <Route path="/">
            <Home {...{ state, storeState }} />
          </Route>
        </Switch>
      ) : (
        <NotDefault />
      )}
    </div>
  )
}

export default App
