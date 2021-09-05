import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
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
  const [currentPage] = useStoreChange('currentPage')
  const [isDefaultBrowser] = useStoreChange('isDefaultBrowser')

  useEffect(() => {
    history.push(currentPage)
  }, [currentPage])

  useKeyPress(
    ({ code, ctrlKey, shiftKey }) => code === 'KeyI' && ctrlKey && shiftKey,
    () => window.AS.ipcRenderer.send('requestOpenDevTools'),
  )
  useKeyPress(
    ({ code }) => code === 'Escape',
    () => window.AS.ipcRenderer.send('requestHideWindow'),
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
            <Settings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      ) : (
        <NotDefault />
      )}
    </div>
  )
}

export default App
