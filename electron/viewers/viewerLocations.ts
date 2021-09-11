// import path from 'path'
// import { app } from 'electron'
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

// const WINUSER_DIRECTORY = app.getPath('home')

const allProgramFilesLocations = (path: any) => [
  `C:\\Program Files\\${path}`,
  `C:\\Program Files (x86)\\${path}`,
  `D:\\Program Files\\${path}`,
  `D:\\Program Files (x86)\\${path}`,
  `E:\\Program Files\\${path}`,
  `E:\\Program Files (x86)\\${path}`
]

export const firefoxLocations = [
  {
    iconName: 'firefox',
    title: 'Firefox',
    exePaths: allProgramFilesLocations('Mozilla Firefox\\firefox.exe'),
    commandLineArguments: ''
  },
  {
    iconName: 'firefox',
    title: 'Firefox Incognito',
    exePaths: allProgramFilesLocations('Mozilla Firefox\\firefox.exe'),
    commandLineArguments: '-private'
  },
  {
    iconName: 'firefox',
    title: 'Firefox Dev',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: ''
  },
  {
    iconName: 'firefox',
    title: 'Firefox Dev Incognito',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '-private'
  },
  {
    iconName: 'firefox',
    title: 'Firefox Nightly',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: ''
  },
  {
    iconName: 'firefox',
    title: 'Firefox Nightly Incognito',
    exePaths: allProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '-private'
  }
]
