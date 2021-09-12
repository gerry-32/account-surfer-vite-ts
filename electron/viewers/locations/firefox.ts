import { getAllProgramFilesLocations } from './utils'

const firefoxLocations = [
  {
    bigIconTemplate: 'firefox',
    smallIconTemplate: '',
    title: 'Firefox',
    subTitle: '',
    exePaths: getAllProgramFilesLocations('Mozilla Firefox\\firefox.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'firefox',
    title: 'Incognito',
    subTitle: 'Firefox',
    exePaths: getAllProgramFilesLocations('Mozilla Firefox\\firefox.exe'),
    commandLineArguments: '-private',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'firefox',
    smallIconTemplate: '',
    title: 'Firefox: dev',
    subTitle: '',
    exePaths: getAllProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'firefox',
    title: 'Incognito',
    subTitle: 'Firefox: dev',
    exePaths: getAllProgramFilesLocations('Firefox Developer Edition\\firefox.exe'),
    commandLineArguments: '-private',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'firefox',
    smallIconTemplate: '',
    title: 'Firefox: nightly',
    subTitle: '',
    exePaths: getAllProgramFilesLocations('Firefox Nightly\\firefox.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  },
  {
    bigIconTemplate: 'incognito',
    smallIconTemplate: 'firefox',
    title: 'Incognito',
    subTitle: 'Firefox: nightly',
    exePaths: getAllProgramFilesLocations('Firefox Nightly\\firefox.exe'),
    commandLineArguments: '-private',
    userDataFolderPath: null
  }
]

export default firefoxLocations
