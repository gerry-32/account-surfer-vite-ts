import path from 'path'
import { app } from 'electron'

const WINUSER_DIRECTORY = app.getPath('home')

const sidekickStablePaths = [
  path.join(WINUSER_DIRECTORY, 'AppData\\Local\\Sidekick\\Application\\sidekick.exe')
]

const sidekickStable = [
  {
    bigIconTemplate: 'sidekick',
    smallIconTemplate: '',
    title: '',
    subTitle: 'Sidekick',
    exePaths: sidekickStablePaths,
    commandLineArguments: '',
    userDataFolderPath: 'AppData\\Local\\Sidekick\\User Data'
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'sidekick',
    title: 'Incognito',
    subTitle: 'Sidekick',
    exePaths: sidekickStablePaths,
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

export default sidekickStable
