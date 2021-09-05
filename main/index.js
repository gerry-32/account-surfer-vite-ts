"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const browserWindow_1 = __importDefault(require("./browserWindow"));
// import { initStore } from '../utils/store'
const electron_log_1 = __importDefault(require("electron-log"));
// electronLog.transports.file.level = true
// electronLog.transports.console.level = true
Object.assign(console, electron_log_1.default.functions);
console.warn('@@@@@@@ MAIN STARTED @@@@@@@');
function createWindow() {
    const window = new electron_1.BrowserWindow(browserWindow_1.default);
    const port = process.env.PORT || 3000;
    const url = electron_is_dev_1.default
        ? `http://localhost:${port}`
        : (0, path_1.join)(__dirname, '../src/out/index.html');
    // and load the index.html of the app.
    electron_is_dev_1.default ? window?.loadURL(url) : window?.loadFile(url);
    // Open the DevTools.
    // window.webContents.openDevTools();
}
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()
//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })
// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
// // listen the channel `message` and resend the received message to the renderer process
// ipcMain.on('message', (event: IpcMainEvent, message: any) => {
//   console.log(message)
//   setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
// })
// try {
//   const store = initStore()
//   console.log(store.get('appVersion'))
// } catch (e) {
//   console.error(e)
// }
