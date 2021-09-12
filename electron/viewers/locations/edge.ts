import path from 'path'
import { app } from 'electron'
import { getAllProgramFilesLocations } from './utils'

const WINUSER_DIRECTORY = app.getPath('home')

const edgeStablePaths = [
  ...getAllProgramFilesLocations('Microsoft\\Edge\\Application\\msedge.exe'),
  path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Microsoft\\Edge\\Application\\msedge.exe')
]

const edgeStable = [
  {
    bigIconTemplate: 'edge',
    smallIconTemplate: '',
    title: '',
    subTitle: 'Edge',
    exePaths: edgeStablePaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge\\User Data'
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'edge',
    title: 'Incognito',
    subTitle: 'Edge',
    exePaths: edgeStablePaths,
    commandLineArguments: '-inprivate',
    userDataFolderPath: null
  }
]

const edgeBetaPaths = [
  ...getAllProgramFilesLocations('Microsoft\\Edge Beta\\Application\\msedge.exe'),
  path.join(
    WINUSER_DIRECTORY,
    'AppData\\Local\\Microsoft\\Edge Beta\\Application\\msedge.exe'
  )
]

const edgeBeta = [
  {
    bigIconTemplate: 'edge',
    smallIconTemplate: '',
    title: '',
    subTitle: 'Edge: beta',
    exePaths: edgeBetaPaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge Beta\\User Data'
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'edge',
    title: 'Incognito',
    subTitle: 'Edge: beta',
    exePaths: edgeBetaPaths,
    commandLineArguments: '-inprivate',
    userDataFolderPath: null
  }
]

const edgeDevPaths = [
  ...getAllProgramFilesLocations('Microsoft\\Edge Dev\\Application\\msedge.exe'),
  path.join(
    WINUSER_DIRECTORY,
    'AppData\\Local\\Microsoft\\Edge Dev\\Application\\msedge.exe'
  )
]

const edgeDev = [
  {
    bigIconTemplate: 'edge',
    smallIconTemplate: '',
    title: '',
    subTitle: 'Edge: dev',
    exePaths: edgeDevPaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge Dev\\User Data'
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'edge',
    title: 'Incognito',
    subTitle: 'Edge: dev',
    exePaths: edgeDevPaths,
    commandLineArguments: '-inprivate',
    userDataFolderPath: null
  }
]

const edgeCanaryPaths = [
  ...getAllProgramFilesLocations('Microsoft\\Edge SxS\\Application\\msedge.exe'),
  path.join(
    WINUSER_DIRECTORY,
    'AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe'
  )
]

const edgeCanary = [
  {
    bigIconTemplate: 'edge',
    smallIconTemplate: '',
    title: '',
    subTitle: 'Edge: canary',
    exePaths: edgeCanaryPaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Microsoft\\Edge SxS\\User Data'
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'edge',
    title: 'Incognito',
    subTitle: 'Edge: canary',
    exePaths: edgeCanaryPaths,
    commandLineArguments: '-inprivate',
    userDataFolderPath: null
  }
]

export default [...edgeStable, ...edgeBeta, ...edgeDev, ...edgeCanary]
