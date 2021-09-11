import { ipcRenderer, contextBridge, webFrame } from 'electron'
import electronLog from 'electron-log' // not using ./log cause electron-is-dev is not working in renderer
import { initStore } from './store'

declare global {
  interface Window {
    electronLog: any
    initialStoreData: any
    sendEvent: any
    onStoreChange: any
  }
}

try {
  electronLog.log('@@@@@@@ PRELOAD STARTED @@@@@@@')
  webFrame.setZoomFactor(1)
  const electronStore = initStore()

  const sendEvent = (eventName: string, data: any) => {
    ipcRenderer.send(eventName, data)
  }

  const onStoreChange = (cb: any) => {
    const listener = (_: any, newState: any) => cb(newState)
    ipcRenderer.on('storeChanged', listener)
    return () => ipcRenderer.removeListener('storeChanged', listener)
  }

  contextBridge.exposeInMainWorld('electronLog', electronLog)
  contextBridge.exposeInMainWorld('initialStoreData', electronStore.store)
  contextBridge.exposeInMainWorld('sendEvent', sendEvent)
  contextBridge.exposeInMainWorld('onStoreChange', onStoreChange)
} catch (e) {
  electronLog.error(e)
}
