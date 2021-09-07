import { ipcRenderer, contextBridge, webFrame } from 'electron'
import electronLog from 'electron-log'
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
  Object.assign(console, electronLog.functions)
  console.log('@@@@@@@ PRELOAD STARTED @@@@@@@')
  webFrame.setZoomFactor(1)
  const electronStore = initStore()

  const sendEvent = (eventName: string, data: any) => {
    ipcRenderer.send(eventName, data)
  }

  const onStoreChange = (cb: any) => {
    ipcRenderer.on('storeChanged', (_, newState: any) => cb(newState))
  }

  contextBridge.exposeInMainWorld('electronLog', electronLog)
  contextBridge.exposeInMainWorld('initialStoreData', electronStore.store)
  contextBridge.exposeInMainWorld('sendEvent', sendEvent)
  contextBridge.exposeInMainWorld('onStoreChange', onStoreChange)
} catch (e) {
  console.error(e)
}
