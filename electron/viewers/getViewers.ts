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
    const {
      iconName,
      title,
      subTitle,
      exePaths,
      commandLineArguments,
      userDataFolderPath
    } = location

    for (const exePath of exePaths) {
      try {
        await fs.promises.access(exePath, fs.constants.R_OK)

        const sanitize = (str: string) =>
          str.replace(/(?: |\!|\@|\#|\$|\%|\^|\&|\*|\(\)|\_|\:|\;)/gi, '-')

        if (userDataFolderPath) {
          const userDataFolderSubs = await fs.promises.readdir(
            path.join(WINUSER_DIRECTORY, userDataFolderPath)
          )

          for (const userDataFolderSub of userDataFolderSubs) {
            if (isProfileFolder(userDataFolderSub)) {
              const preferencesFile = await fs.promises.readFile(
                path.join(
                  WINUSER_DIRECTORY,
                  userDataFolderPath,
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

              const viewerTitle = accountName.replace(/^./, (s: any) => s.toUpperCase())

              const viewer = {
                id: `${sanitize(subTitle)}_${sanitize(viewerTitle)}_${sanitize(
                  userDataFolderSub
                )}`.toLocaleLowerCase(),
                exePath: exePath,
                iconName: iconName,
                title: viewerTitle,
                subTitle: subTitle,
                commandLineArguments: `--profile-directory="${userDataFolderSub}"`
              }

              const pictureUrl = t(preferences, 'account_info[0].picture_url').safeObject

              if (pictureUrl) (<any>viewer).avatarUrl = pictureUrl

              viewers.push(viewer)
            }
          }
        } else {
          viewers.push({
            id: `${title}_${sanitize(subTitle)}_${sanitize(
              commandLineArguments
            )}`.toLocaleLowerCase(),
            exePath: exePath,
            iconName: iconName,
            title: title,
            subTitle: subTitle,
            commandLineArguments: commandLineArguments
          })
        }
      } catch (e) {
        // electronLog.error(`${exePath}: path does not exist`)
      }
    }
  }
  return viewers
}
