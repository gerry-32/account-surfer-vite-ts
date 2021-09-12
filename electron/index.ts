// import { join } from 'path'
import { exec } from 'child_process'
import { BrowserWindow, app, Menu, ipcMain, globalShortcut } from 'electron'
// import isDev from 'electron-is-dev'
import { initStore } from './store'
import browserWindowConfig from './browserWindow'
import { createTray } from './tray'
import { openUrl } from './url'
import electronLog from './log'
import { findDomainInViewer, getUrlFromArgv } from './utils'
import { getBrowserGrid, getMergedGrid } from './grid'

try {
  electronLog.warn('@@@@@@@ MAIN STARTED @@@@@@@')
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

  const store = initStore()
  let ctrlAltXPressed = false
  let mainWindow: any, tray: any

  setInterval(() => {
    ctrlAltXPressed = false
  }, 150)

  const openAS = (url: any) => {
    if (url) store.set('url', url)
    mainWindow.show()
    mainWindow.focus()
  }

  const hideAS = () => {
    try {
      store.set({
        currentPage: '/',
        url: '',
        shouldSaveDomain: false,
        dragEnabled: false,
        showHidden: false
      })
      setTimeout(() => {
        mainWindow.hide()
      }, 50) // prevent blinking on open
    } catch (e) {
      electronLog.error(e)
    }
  }

  const onOpenUrl = ({ viewer, url }: any) => {
    try {
      openUrl({ viewer, url })
      hideAS()
    } catch (e) {
      electronLog.error(e)
    }
  }

  const onOpenApp = (url: any) => {
    try {
      const grid: any = store.get('grid')
      const domainFoundInViewer = url && findDomainInViewer(grid, url)

      if (store.get('openInFirst')) {
        if (url && grid.length && !ctrlAltXPressed) {
          electronLog.log('openInFirst mode onOpenUrl')
          onOpenUrl({ viewer: grid[0], url })
        } else {
          electronLog.log('openInFirst mode openAS')
          openAS(url)
        }
      } else {
        if (url && grid.length && domainFoundInViewer) {
          electronLog.log('default mode onOpenUrl')
          onOpenUrl({ viewer: domainFoundInViewer, url })
        } else {
          electronLog.log('default mode openAS')
          openAS(url)
        }
      }
    } catch (e) {
      electronLog.error(e)
    }
  }

  const createWindow = () => {
    return new Promise((resolve: any) => {
      try {
        mainWindow = new BrowserWindow(browserWindowConfig)

        mainWindow.once('ready-to-show', () => {
          try {
            const url = getUrlFromArgv(process.argv)
            if (url) onOpenApp(url)

            Menu.setApplicationMenu(null)
            resolve()
          } catch (e) {
            electronLog.error(e)
          }
        })

        getBrowserGrid().then(freshGrid => {
          try {
            const storedGrid: any = store.get('grid')
            const actualGrid = storedGrid.length
              ? getMergedGrid(freshGrid, storedGrid)
              : freshGrid

            store.set('grid', actualGrid)

            ipcMain.on('requestOpenDevTools', () => {
              try {
                mainWindow.webContents.openDevTools({ mode: 'undocked' })
              } catch (e) {
                electronLog.error(e)
              }
            })

            ipcMain.on('requestHideWindow', hideAS)

            ipcMain.on('requestOpenUrl', (_, viewer) => {
              store.set('currentPage', '/')
              onOpenUrl({ viewer, url: store.get('url') })
            })

            ipcMain.on('requestOpenWindowsSettings', () =>
              exec('start ms-settings:defaultapps')
            )

            ipcMain.on('requestResetBrowserList', () => {
              try {
                store.set('currentPage', '/')
                getBrowserGrid().then(freshGrid => {
                  store.set('grid', freshGrid)
                })
              } catch (e) {
                electronLog.error(e)
              }
            })

            ipcMain.on('requestStoreSet', (_, data: any) => {
              try {
                store.set(data)
              } catch (e) {
                electronLog.error(e)
              }
            })

            store.onDidAnyChange((newState: any) => {
              try {
                mainWindow.webContents.send('storeChanged', newState)
              } catch (e) {
                electronLog.log(e)
              }
            })

            // const port = process.env.PORT || 3000
            // const url = isDev
            //   ? `http://localhost:${port}`
            //   : join(__dirname, '../src/out/index.html')

            // isDev ? mainWindow?.loadURL(url) : mainWindow?.loadFile(url)

            // if (isDev) mainWindow.webContents.openDevTools({ mode: 'undocked' })
          } catch (e) {
            electronLog.error(e)
          }
        })

        mainWindow.on('will-resize', (e: any) => {
          e.preventDefault()
        })
        mainWindow.setResizable(false)

        // TODO check impact
        // mainWindow.on('closed', () => {
        //   mainWindow = null
        // })

        mainWindow.on('close', (event: any) => {
          try {
            if (!store.get('appClosed')) {
              event.preventDefault()
              hideAS()
            } else {
              if (tray) {
                tray.destroy()
                tray = null
              }
            }
            return false
          } catch (e) {
            electronLog.error(e)
          }
        })

        return mainWindow
      } catch (e) {
        electronLog.error(e)
      }
    })
  }

  /** Catch when someone tried to run a second instance  */
  const hookOpenSecondInstance = () => {
    const gotTheLock = app.requestSingleInstanceLock()
    if (!gotTheLock) app.quit()
    else {
      app.on('second-instance', ({} = {}, argv: any) => {
        try {
          app.clearRecentDocuments()
          onOpenApp(getUrlFromArgv(argv))
        } catch (e) {
          electronLog.error(e)
        }
      })
    }
    return gotTheLock
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(async () => {
    const isMain = hookOpenSecondInstance()
    app.clearRecentDocuments()
    if (isMain) {
      tray = createTray({ onOpenApp, store })
      await createWindow()
    }

    const ret = globalShortcut.register('Ctrl+Alt+X', () => {
      electronLog.log('Ctrl+Alt+X registered')
      ctrlAltXPressed = true
    })

    if (!ret) electronLog.log('globalShortcut is not registered')
  })

  app.on('will-quit', () => {
    try {
      globalShortcut.unregister('Ctrl+Alt+X')
      globalShortcut.unregisterAll()
    } catch (e) {
      electronLog.error(e)
    }
  })
} catch (e) {
  electronLog.error(e)
}
