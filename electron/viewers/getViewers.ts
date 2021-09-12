import path from 'path'
import fs from 'fs'
import { app } from 'electron'
import viewerLocations from './locations/allLocations'
import { t } from 'typy'

const WINUSER_DIRECTORY = app.getPath('home')

const isProfileFolder = (userDataFolder: any) =>
  userDataFolder === 'Default' ||
  (/Profile/.test(userDataFolder) &&
    !/\./.test(userDataFolder) &&
    userDataFolder !== 'System Profile' &&
    !/Guest/.test(userDataFolder))

export const getViewers = async () => {
  const viewers = []
  for (const location of viewerLocations) {
    for (const exePath of location.exePaths) {
      try {
        await fs.promises.access(exePath, fs.constants.R_OK)

        if (location.userDataFolderPath) {
          const userDataFolderSubs = await fs.promises.readdir(
            path.join(WINUSER_DIRECTORY, location.userDataFolderPath)
          )

          for (const userDataFolderSub of userDataFolderSubs) {
            if (isProfileFolder(userDataFolderSub)) {
              const preferencesFile = await fs.promises.readFile(
                path.join(
                  WINUSER_DIRECTORY,
                  location.userDataFolderPath,
                  userDataFolderSub,
                  'Preferences'
                ),
                'utf8'
              )
              const preferences = JSON.parse(preferencesFile)
              const accountName =
                t(preferences, 'profile.name').safeObject ||
                t(preferences, 'account_info.full_name').safeObject ||
                t(preferences, 'account_info[0].edge_account_first_name').safeObject ||
                'Account ?'

              const viewer = {
                exePath: exePath,
                iconName: location.iconName,
                title: accountName.replace(/^./, (s: any) => s.toUpperCase()),
                subTitle: location.subTitle,
                commandLineArguments: `--profile-directory="${userDataFolderSub}"`
              }

              const pictureUrl = t(preferences, 'account_info[0].picture_url').safeObject

              if (pictureUrl) (<any>viewer).avatarUrl = pictureUrl

              viewers.push(viewer)
            }
          }
        } else {
          viewers.push({
            exePath: exePath,
            iconName: location.iconName,
            title: location.title,
            subTitle: location.subTitle,
            commandLineArguments: location.commandLineArguments
          })
        }
      } catch (e) {
        // electronLog.error(`${exePath}: path does not exist`)
      }
    }
  }
  return viewers
}
