import path from 'path'
import { app } from 'electron'
// const fs = require("fs");
// import https from 'https'
// import base64Img from 'base64-img'
// const { t } = require("typy");
// // import { startLogging } from './log'
// import getRemoteAvatar from './getRemoteAvatar'
// import {
//   getChromiumAccount
//   // generateProfileId,
// } from './getChromiumAccount'

const allProgramFilesLocations = (path: any) => [
  `C:\\Program Files\\${path}`,
  `C:\\Program Files (x86)\\${path}`,
  `D:\\Program Files\\${path}`,
  `D:\\Program Files (x86)\\${path}`,
  `E:\\Program Files\\${path}`,
  `E:\\Program Files (x86)\\${path}`
]

const chromeStablePaths = [
  ...allProgramFilesLocations('Google\\Chrome\\Application\\chrome.exe'),
  path.join(
    app.getPath('home'),
    'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
  )
]

const chromeLocations = [
  {
    iconName: 'chrome',
    title: 'Chrome',
    exePaths: chromeStablePaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Google\\Chrome\\User Data'
  },
  {
    iconName: 'chrome',
    title: 'Chrome Incognito',
    exePaths: chromeStablePaths,
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

const firefoxLocations = [
  {
    iconName: 'firefox',
    title: 'Firefox',
    exePaths: allProgramFilesLocations('Mozilla Firefox\\firefox.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    iconName: 'firefox',
    title: 'Firefox Incognito',
    exePaths: allProgramFilesLocations('Mozilla Firefox\\firefox.exe'),
    commandLineArguments: '-private',
    userDataFolderPath: null
  },
  {
    iconName: 'firefox',
    title: 'Firefox Dev',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    iconName: 'firefox',
    title: 'Firefox Dev Incognito',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '-private',
    userDataFolderPath: null
  },
  {
    iconName: 'firefox',
    title: 'Firefox Nightly',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    iconName: 'firefox',
    title: 'Firefox Nightly Incognito',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '-private',
    userDataFolderPath: null
  }
]

export default [...chromeLocations, ...firefoxLocations]
