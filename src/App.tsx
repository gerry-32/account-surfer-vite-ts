import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import TitleBar from './TitleBar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import NotDefault from './pages/NotDefault'
import NoBrowsersFound from './pages/NoBrowsersFound'
import useKeyPress from './utils/useKeyPress'
import useStoreChange from '@/utils/useStoreChange'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import './App.css'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
//  const { url, currentPage, isDefaultBrowser, grid, isDev } = useStoreChange('app')
  const { url, currentPage, grid, isDev } = useStoreChange('app')
  const isDefaultBrowser = true // Override für fehlerhafte Erkennung

  useEffect(() => {
    if (location.pathname !== currentPage) navigate(currentPage)
  }, [currentPage])

  useKeyPress(
    ({ code, ctrlKey, shiftKey }: any) => code === 'KeyI' && ctrlKey && shiftKey,
    () => window.invokeEvent('openDevTools')
  )
  useKeyPress(
    ({ code }: any) => code === 'Escape',
    () =>
      url
        ? window.storeSet({ url: '', shouldSaveDomain: false })
        : window.invokeEvent('hideWindow')
  )
  useKeyPress(
    ({ code, ctrlKey }: any) => code === 'KeyC' && ctrlKey && url,
    () => {
      copy(url)
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
      {isDefaultBrowser || isDev ? (
        <Routes>
          <Route path="settings" element={<Settings />} />
          <Route path="/" element={!!grid.length ? <Home /> : <NoBrowsersFound />} />
        </Routes>
      ) : (
        <NotDefault />
      )}
    </div>
  )
}

export default App
