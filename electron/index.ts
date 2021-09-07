import { join } from 'path'
import { exec } from 'child_process'
import { BrowserWindow, app, Menu, ipcMain, globalShortcut } from 'electron'
import isDev from 'electron-is-dev'
import electronLog from 'electron-log'
import { initStore } from './store'
import browserWindowConfig from './browserWindow'
import { createTray } from './tray'
import { openUrl } from './url'
import { findDomainInViewer, getUrlFromArgv } from './utils'
import { getBrowserGrid, getMergedGrid } from './getBrowserGrid'

try {
  Object.assign(console, electronLog.functions)
  console.warn('@@@@@@@ MAIN STARTED @@@@@@@')
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
      mainWindow.hide()
    } catch (e) {
      console.error(e)
    }
  }

  const onOpenUrl = ({ viewer, url }: any) => {
    try {
      openUrl({ viewer, url })
      hideAS()
    } catch (e) {
      console.error(e)
    }
  }

  const onOpenApp = (url: any) => {
    try {
      const grid: any = store.get('grid')
      const domainFoundInViewer = url && findDomainInViewer(grid, url)

      if (store.get('openInFirst')) {
        if (url && grid.length && !ctrlAltXPressed) {
          console.log('openInFirst mode onOpenUrl')
          onOpenUrl({ viewer: grid[0], url })
        } else {
          console.log('openInFirst mode openAS')
          openAS(url)
        }
      } else {
        if (url && grid.length && domainFoundInViewer) {
          console.log('default mode onOpenUrl')
          onOpenUrl({ viewer: domainFoundInViewer, url })
        } else {
          console.log('default mode openAS')
          openAS(url)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  function createWindow() {
    return new Promise((resolve: any) => {
      try {
        const mainWindow = new BrowserWindow(browserWindowConfig)

        mainWindow.once('ready-to-show', () => {
          try {
            const url = getUrlFromArgv(process.argv)
            if (url) onOpenApp(url)

            Menu.setApplicationMenu(null)
            resolve()
          } catch (e) {
            console.error(e)
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
                console.error(e)
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
                console.error(e)
              }
            })

            ipcMain.on('requestStoreSet', (_, data: any) => {
              try {
                console.log('requestStoreSet', data)
                store.set(data)
              } catch (e) {
                console.error(e)
              }
            })

            store.onDidAnyChange((newState: any) => {
              try {
                mainWindow.webContents.send('storeChanged', newState)
              } catch (e) {
                console.log(e)
              }
            })

            const port = process.env.PORT || 3000
            const url = isDev
              ? `http://localhost:${port}`
              : join(__dirname, '../src/out/index.html')

            isDev ? mainWindow?.loadURL(url) : mainWindow?.loadFile(url)
            mainWindow.webContents.openDevTools({ mode: 'undocked' })
          } catch (e) {
            console.error(e)
          }
        })

        mainWindow.on('will-resize', e => {
          e.preventDefault()
        })
        mainWindow.setResizable(false)

        // TODO check impact
        // mainWindow.on('closed', () => {
        //   mainWindow = null
        // })

        mainWindow.on('close', function (event) {
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
            console.error(e)
          }
        })

        return mainWindow
      } catch (e) {
        console.error(e)
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
          console.error(e)
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
      console.log('Ctrl+Alt+X registered')
      ctrlAltXPressed = true
    })

    if (!ret) console.log('globalShortcut is not registered')
  })

  app.on('will-quit', () => {
    try {
      globalShortcut.unregister('Ctrl+Alt+X')
      globalShortcut.unregisterAll()
    } catch (e) {
      console.error(e)
    }
  })
} catch (e) {
  console.error(e)
}
