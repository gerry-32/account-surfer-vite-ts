import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import TitleBar from './TitleBar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import NotDefault from './pages/NotDefault'
import useKeyPress from './utils/useKeyPress'
import useStoreChange from './utils/useStoreChange'
import { ToastContainer, toast, Zoom } from 'react-toastify'
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
    () =>
      state.url
        ? storeState({ url: '', shouldSaveDomain: false })
        : window.sendEvent('requestHideWindow')
  )
  useKeyPress(
    ({ code, ctrlKey }: any) => code === 'KeyC' && ctrlKey && state.url,
    () => {
      copy(state.url)
      toast('Url copied')
    }
  )

  return (
    <div className="relative h-screen select-none">
      <ToastContainer
        limit={1}
        closeButton={false}
        transition={Zoom}
        theme="dark"
        className="top-[30px] right-[27px] w-[250px]"
        toastClassName="cursor-default min-h-0 rounded-none m-0 bg-indigo-900"
        bodyClassName="cursor-default p-0"
        position="top-right"
        autoClose={1200}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
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
