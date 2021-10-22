import { join } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { exec } from 'child_process'
import { BrowserWindow, app, Menu, ipcMain, globalShortcut, dialog } from 'electron'
import isDev from 'electron-is-dev'
import { tall } from 'tall'
import { initStore } from './store'
import { getAppProgId, getIsDefaultBrowser } from './registry'
import browserWindowConfig from './browserWindow'
import { createTray } from './tray'
import { openUrl } from './url'
import electronLog from './log'
import { findDomainInViewer, getUrlFromArgv } from './utils'
import { getBrowserGrid, getMergedGrid } from './grid'

try {
  electronLog.warn('@@@@@@@ MAIN4 STARTED @@@@@@@')
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

  const store = initStore()
  let ctrlAltXPressed = false
  let mainWindow: any, tray: any

  store.set({ appVersion: app.getVersion() })
  if (!store.get('progId')) getAppProgId(store)

  setInterval(() => {
    ctrlAltXPressed = false
  }, 150)

  setInterval(() => {
    getIsDefaultBrowser(store)
  }, 500)

  const openAS = (url: any) => {
    if (url) store.set('url', url)
    const shortenerServices: any = store.get('shortenerServices')
    if (
      store.get('unshortenUrls') &&
      url &&
      shortenerServices.some((shortenerService: string) => url.includes(shortenerService))
    ) {
      tall(url)
        .then(unshortenedUrl => store.set({ url: unshortenedUrl }))
        .catch(e => electronLog.error(e))
    }
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

            ipcMain.handle('openDevTools', () => {
              try {
                mainWindow.webContents.openDevTools({ mode: 'undocked' })
              } catch (e) {
                electronLog.error(e)
              }
            })

            ipcMain.handle('hideWindow', hideAS)

            ipcMain.handle('openUrl', (_, viewer) => {
              store.set('currentPage', '/')
              onOpenUrl({ viewer, url: store.get('url') })
            })

            ipcMain.handle('openWindowsSettings', () => {
              exec('start ms-settings:defaultapps')
            })

            ipcMain.handle('resetBrowserList', async () => {
              try {
                const freshGrid = await getBrowserGrid()
                store.set({ grid: freshGrid, currentPage: '/' })
                return { message: 'All browsers has been reset' }
              } catch (e) {
                electronLog.error(e)
                return { error: "Can't reset browser" }
              }
            })

            ipcMain.handle('importSettings', async () => {
              try {
                const result = await dialog.showOpenDialog(mainWindow, {
                  defaultPath: 'account-surfer-settings.json',
                  title: 'Import Account Surfer settings',
                  filters: [{ name: 'JSON Files', extensions: ['json'] }],
                  properties: ['openFile', 'dontAddToRecent']
                })

                if (!result.canceled && result.filePaths && result.filePaths.length) {
                  const grid = await readFile(result.filePaths[0], { encoding: 'utf8' })
                  store.set({ grid: JSON.parse(grid), currentPage: '/' })
                  return { message: 'Settings applied' }
                }
              } catch (e) {
                electronLog.error(e)
                return { error: "Can't import settings" }
              }
            })

            ipcMain.handle('exportSettings', async () => {
              try {
                const result = await dialog.showSaveDialog(mainWindow, {
                  defaultPath: 'account-surfer-settings.json',
                  title: 'Export Account Surfer settings',
                  filters: [{ name: 'JSON Files', extensions: ['json'] }],
                  properties: ['dontAddToRecent']
                })

                if (!result.canceled && result.filePath) {
                  await writeFile(
                    result.filePath,
                    JSON.stringify(store.get('grid'), null, 2)
                  )
                  store.set({ currentPage: '/' })
                  return { message: 'Settings saved' }
                }
              } catch (e) {
                electronLog.error(e)
                return { error: "Can't save settings" }
              }
            })

            ipcMain.handle('setFirstAccountMode', (_, openInFirst: boolean) => {
              try {
                if (openInFirst) {
                  const ret = globalShortcut.register('Ctrl+Alt+X', () => {
                    ctrlAltXPressed = true
                  })
                  if (!ret) return { error: 'globalShortcut is not registered' }
                } else {
                  globalShortcut.unregister('Ctrl+Alt+X')
                  globalShortcut.unregisterAll()
                }
                store.set({ openInFirst })
                return {}
              } catch (e) {
                electronLog.error(e)
                return { error: 'globalShortcut is not registered' }
              }
            })

            ipcMain.handle('storeSet', (_, data: any) => {
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

            store.set({ isDev })
            if (isDev) {
              const port = process.env.PORT || 3000
              mainWindow?.loadURL(`http://localhost:${port}`)
              mainWindow.webContents.openDevTools({ mode: 'undocked' })
            } else {
              mainWindow?.loadFile(join(__dirname, '../src/out/index.html'))
            }
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
