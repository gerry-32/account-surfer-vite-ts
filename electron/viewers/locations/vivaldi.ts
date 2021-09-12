import path from 'path'
import { app } from 'electron'
import { getAllProgramFilesLocations } from './utils'

const WINUSER_DIRECTORY = app.getPath('home')

const vivaldiStablePaths = [
  path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Vivaldi\\Application\\vivaldi.exe'),
  ...getAllProgramFilesLocations('Vivaldi\\Application\\vivaldi.exe')
]

const vivaldiStable = [
  {
    bigIconTemplate: 'vivaldi',
    smallIconTemplate: '',
    title: '',
    subTitle: 'Vivaldi',
    exePaths: vivaldiStablePaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Vivaldi\\User Data'
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'vivaldi',
    title: 'Incognito',
    subTitle: 'Vivaldi',
    exePaths: vivaldiStablePaths,
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

export default [...vivaldiStable]
