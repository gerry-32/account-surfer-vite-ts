import { getAllProgramFilesLocations } from './utils'

const polypaneLocations = [
  {
    bigIconTemplate: 'polypane',
    smallIconTemplate: '',
    title: 'Polypane',
    subTitle: '',
    exePaths: getAllProgramFilesLocations('Polypane\\Polypane.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  }
]

export default polypaneLocations
