import path from 'path'
import { app } from 'electron'
import { getAllProgramFilesLocations } from './utils'

const WINUSER_DIRECTORY = app.getPath('home')

const braveLocations = [
  {
    bigIconTemplate: 'opera',
    smallIconTemplate: '',
    title: 'Opera',
    subTitle: '',
    exePaths: [
      path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Programs\\Opera\\launcher.exe'),
      ...getAllProgramFilesLocations('Opera\\launcher.exe')
    ],
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'opera',
    title: 'Incognito',
    subTitle: 'Opera',
    exePaths: [
      path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Programs\\Opera\\launcher.exe'),
      ...getAllProgramFilesLocations('Opera\\launcher.exe')
    ],
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'opera',
    smallIconTemplate: '',
    title: 'Opera: beta',
    subTitle: '',
    exePaths: [
      path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Programs\\Opera beta\\launcher.exe'),
      ...getAllProgramFilesLocations('Opera beta\\launcher.exe')
    ],
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'opera',
    title: 'Incognito',
    subTitle: 'Opera: beta',
    exePaths: [
      path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Programs\\Opera beta\\launcher.exe'),
      ...getAllProgramFilesLocations('Opera beta\\launcher.exe')
    ],
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'opera',
    smallIconTemplate: '',
    title: 'Opera: dev',
    subTitle: '',
    exePaths: [
      path.join(
        WINUSER_DIRECTORY,
        'AppData\\Local\\Programs\\Opera developer\\launcher.exe'
      ),
      ...getAllProgramFilesLocations('Opera developer\\launcher.exe')
    ],
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'opera',
    title: 'Incognito',
    subTitle: 'Opera: dev',
    exePaths: [
      path.join(
        WINUSER_DIRECTORY,
        'AppData\\Local\\Programs\\Opera developer\\launcher.exe'
      ),
      ...getAllProgramFilesLocations('Opera developer\\launcher.exe')
    ],
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

export default braveLocations
