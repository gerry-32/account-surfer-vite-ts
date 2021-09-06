import { join } from 'path'

const browserWindowConfig = {
  // useContentSize: true,
  center: true,
  backgroundColor: '#1f2937',
  // fullscreenable: false,
  // maximizable: false,
  // fullscreen: false,
  icon: join(__dirname, '../buildResources/appx/StoreLogo.png'), // working for localhost
  // titleBarStyle: 'hiddenInset',
  height: 430,
  width: 655,
  frame: false,
  transparent: false,
  // show: false,
  thickFrame: false,
  webPreferences: {
    preload: join(__dirname, 'preload.js'),
    nodeIntegration: true,
    contextIsolation: true,
    nativeWindowOpen: true,
    textAreasAreResizable: false,
    defaultEncoding: 'UTF-8',
    disableHtmlFullscreenWindowResize: true,
    spellcheck: false
  }
}

export default browserWindowConfig
