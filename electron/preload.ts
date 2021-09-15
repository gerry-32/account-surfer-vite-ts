import { ipcRenderer, contextBridge, webFrame } from 'electron'
import electronLog from 'electron-log' // not using ./log cause electron-is-dev is not working in renderer
import { initStore } from './store'

declare global {
  interface Window {
    electronLog: any
    invokeEvent: any
    onStoreChange: any
    storeGet: any
    storeSet: any
  }
}

try {
  electronLog.log('@@@@@@@ PRELOAD STARTED @@@@@@@')
  webFrame.setZoomFactor(1)
  const electronStore = initStore()

  const invokeEvent = (eventName: string, data: any) =>
    ipcRenderer.invoke(eventName, data)

  const onStoreChange = (cb: any) => {
    const listener = (_: any, newState: any) => cb(newState)
    ipcRenderer.on('storeChanged', listener)
    return () => ipcRenderer.removeListener('storeChanged', listener)
  }

  const storeGet = () => electronStore.store
  const storeSet = (data: any) => ipcRenderer.invoke('storeSet', data)

  contextBridge.exposeInMainWorld('electronLog', electronLog)
  contextBridge.exposeInMainWorld('invokeEvent', invokeEvent)
  contextBridge.exposeInMainWorld('onStoreChange', onStoreChange)
  contextBridge.exposeInMainWorld('storeGet', storeGet)
  contextBridge.exposeInMainWorld('storeSet', storeSet)
} catch (e) {
  electronLog.error(e)
}
