import fs from 'fs'
import { firefoxLocations } from './viewerLocations'

export const getNonChromiumViewers = async () => {
  const viewers = []
  for (const location of firefoxLocations) {
    for (const exePath of location.exePaths) {
      try {
        await fs.promises.access(exePath, fs.constants.R_OK)

        viewers.push({
          viewer: {
            exePath: exePath,
            iconName: location.iconName,
            title: location.title,
            commandLineArguments: location.commandLineArguments
          },
          domains: [],
          isVisible: true
        })
      } catch (e) {
        // electronLog.error(`${exePath}: path does not exist`)
      }
    }
  }
  return viewers
}
