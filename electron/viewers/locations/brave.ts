import { getAllProgramFilesLocations } from './utils'

const braveLocations = [
  {
    iconName: 'brave',
    title: 'Brave',
    subTitle: '',
    exePaths: getAllProgramFilesLocations(
      'BraveSoftware\\Brave-Browser\\Application\\brave.exe'
    ),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    iconName: 'brave',
    title: 'Incognito',
    subTitle: 'Brave',
    exePaths: getAllProgramFilesLocations(
      'BraveSoftware\\Brave-Browser\\Application\\brave.exe'
    ),
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  },
  {
    iconName: 'brave',
    title: 'Brave: beta',
    subTitle: '',
    exePaths: getAllProgramFilesLocations(
      'BraveSoftware\\Brave-Browser-Beta\\Application\\brave.exe'
    ),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    iconName: 'brave',
    title: 'Incognito',
    subTitle: 'Brave: beta',
    exePaths: getAllProgramFilesLocations(
      'BraveSoftware\\Brave-Browser-Beta\\Application\\brave.exe'
    ),
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  },
  {
    iconName: 'brave',
    title: 'Brave: nightly',
    subTitle: '',
    exePaths: getAllProgramFilesLocations(
      'BraveSoftware\\Brave-Browser-Nightly\\Application\\brave.exe'
    ),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    iconName: 'brave',
    title: 'Incognito',
    subTitle: 'Brave: nightly',
    exePaths: getAllProgramFilesLocations(
      'BraveSoftware\\Brave-Browser-Nightly\\Application\\brave.exe'
    ),
    commandLineArguments: '--incognito',
    userDataFolderPath: null
  }
]

export default braveLocations
