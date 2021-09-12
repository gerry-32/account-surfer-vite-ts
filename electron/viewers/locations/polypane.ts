import { getAllProgramFilesLocations } from './utils'

const polypaneLocations = [
  {
    iconName: 'polypane',
    title: 'Polypane',
    subTitle: '',
    exePaths: getAllProgramFilesLocations('Polypane\\Polypane.exe'),
    commandLineArguments: '',
    userDataFolderPath: null
  }
]

export default polypaneLocations
