import { join } from 'path'
import { app, Tray, Menu } from 'electron'

export const createTray = ({ onOpenApp, store }: any) => {
  try {
    const tray = new Tray(join(__dirname, '../static/logo_256.png'))
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show App',
        click() {
          onOpenApp()
        }
      },
      {
        label: 'Exit',
        click() {
          store.set('appClosed', true)
          app.quit()
        }
      }
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Account Surfer')
    tray.on('click', () => {
      onOpenApp()
    })

    return tray
  } catch (e) {
    console.error(e)
  }
}
