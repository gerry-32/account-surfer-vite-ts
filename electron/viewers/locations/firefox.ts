import path from 'path'
import { app } from 'electron'
import { getAllProgramFilesLocations } from './utils'

const WINUSER_DIRECTORY = app.getPath('home')

const firefoxStablePaths = [
  ...getAllProgramFilesLocations('Mozilla Firefox\\firefox.exe'),
  path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Mozilla Firefox\\firefox.exe')
]

const firefoxStable = [
  {
    bigIconTemplate: 'firefox',
    smallIconTemplate: '',
    title: 'Firefox',
    subTitle: '',
    exePaths: firefoxStablePaths,
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'firefox',
    title: 'Incognito',
    subTitle: 'Firefox',
    exePaths: firefoxStablePaths,
    commandLineArguments: '-private',
    userDataFolderPath: null
  }
]

const firefoxDevPaths = [
  ...getAllProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
  path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Firefox Developer Edition\\firefox.exe')
]

const firefoxDev = [
  {
    bigIconTemplate: 'firefox',
    smallIconTemplate: '',
    title: 'Firefox: dev',
    subTitle: '',
    exePaths: firefoxDevPaths,
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'firefox',
    title: 'Incognito',
    subTitle: 'Firefox: dev',
    exePaths: firefoxDevPaths,
    commandLineArguments: '-private',
    userDataFolderPath: null
  }
]

const firefoxNightlyPaths = [
  ...getAllProgramFilesLocations('Firefox Nightly\\firefox.exe'),
  path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Firefox Nightly\\firefox.exe')
]

const firefoxNightly = [
  {
    bigIconTemplate: 'firefox',
    smallIconTemplate: '',
    title: 'Firefox: nightly',
    subTitle: '',
    exePaths: firefoxNightlyPaths,
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'firefox',
    title: 'Incognito',
    subTitle: 'Firefox: nightly',
    exePaths: firefoxNightlyPaths,
    commandLineArguments: '-private',
    userDataFolderPath: null
  }
]

export default [...firefoxStable, ...firefoxDev, ...firefoxNightly]
