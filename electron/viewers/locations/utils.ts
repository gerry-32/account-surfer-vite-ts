export const getAllProgramFilesLocations = (path: any) => [
  `C:\\Program Files\\${path}`,
  `C:\\Program Files (x86)\\${path}`,
  `D:\\Program Files\\${path}`,
  `D:\\Program Files (x86)\\${path}`,
  `E:\\Program Files\\${path}`,
  `E:\\Program Files (x86)\\${path}`
]
