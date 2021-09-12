import path from 'path'
import { app } from 'electron'
import { getAllProgramFilesLocations } from './utils'

const WINUSER_DIRECTORY = app.getPath('home')

const chromeStablePaths = [
  ...getAllProgramFilesLocations('Google\\Chrome\\Application\\chrome.exe'),
  path.join(
    app.getPath('home'),
    'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
  )
]

const chromeStable = [
  {
    iconName: 'chrome',
    title: '',
    subTitle: 'Chrome',
    exePaths: chromeStablePaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Google\\Chrome\\User Data'
  },
  {
    iconName: 'chrome',
    title: 'Incognito',
    subTitle: 'Chrome',
    exePaths: chromeStablePaths,
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

const chromeBetaPaths = getAllProgramFilesLocations(
  'Google\\Chrome Beta\\Application\\chrome.exe'
)

const chromeBeta = [
  {
    iconName: 'chrome',
    title: '',
    subTitle: 'Chrome: beta',
    exePaths: chromeBetaPaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Google\\Chrome Beta\\User Data'
  },
  {
    iconName: 'chrome',
    title: 'Incognito',
    subTitle: 'Chrome: beta',
    exePaths: chromeBetaPaths,
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

const chromeDevPaths = getAllProgramFilesLocations(
  'Google\\Chrome Dev\\Application\\chrome.exe'
)

const chromeDev = [
  {
    iconName: 'chrome',
    title: '',
    subTitle: 'Chrome: dev',
    exePaths: chromeDevPaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Google\\Chrome Dev\\User Data'
  },
  {
    iconName: 'chrome',
    title: 'Incognito',
    subTitle: 'Chrome: dev',
    exePaths: chromeDevPaths,
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

const chromeCanaryPaths = [
  ...getAllProgramFilesLocations('Google\\Chrome SxS\\Application\\chrome.exe'),
  path.join(
    WINUSER_DIRECTORY,
    'AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe'
  )
]

const chromeCanary = [
  {
    iconName: 'chrome',
    title: '',
    subTitle: 'Chrome: canary',
    exePaths: chromeCanaryPaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Google\\Chrome SxS\\User Data'
  },
  {
    iconName: 'chrome',
    title: 'Incognito',
    subTitle: 'Chrome: canary',
    exePaths: chromeCanaryPaths,
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

export default [...chromeStable, ...chromeBeta, ...chromeDev, ...chromeCanary]
