import path from 'path'
import fs from 'fs'
import { app } from 'electron'
import { t } from 'typy'

const isProfileFolder = (userDataFolder: any) =>
  userDataFolder === 'Default' ||
  (/Profile/.test(userDataFolder) &&
    !/\./.test(userDataFolder) &&
    userDataFolder !== 'System Profile' &&
    !/Guest/.test(userDataFolder))

export const getChromiumAccount = async ({
  channelName,
  browser,
  incognitoName = '',
  accountDetails
}: any) => {
  const accounts = []
  const WINUSER_DIRECTORY = app.getPath('home')

  const userDataFolderSubs = await fs.promises.readdir(
    path.join(WINUSER_DIRECTORY, accountDetails.userDataFolderPath)
  )

  for (const userDataFolderSub of userDataFolderSubs) {
    if (isProfileFolder(userDataFolderSub)) {
      const preferencesFile = await fs.promises.readFile(
        path.join(
          WINUSER_DIRECTORY,
          accountDetails.userDataFolderPath,
          userDataFolderSub,
          'Preferences'
        ),
        'utf8'
      )
      const preferences = JSON.parse(preferencesFile)
      const fullName =
        t(preferences, accountDetails.infoXPath.fullName).safeObject ||
        t(preferences, 'profile.name').safeObject ||
        t(preferences, 'account_info.full_name').safeObject ||
        'Account ?'
      const id =
        `${browser.name}_` +
        `${channelName}_` +
        `${fullName.replace(/ /g, '-')}_` +
        `${userDataFolderSub.replace(/ /g, '-')}`

      const pictureUrl =
        (accountDetails.infoXPath.pictureUrl &&
          t(preferences, accountDetails.infoXPath.pictureUrl).safeObject) ||
        ''

      accounts.push({
        id,
        channelName,
        browser,
        account: {
          name: fullName.toLowerCase(),
          title: fullName,
          profileDirectoryPath: path.join(
            WINUSER_DIRECTORY,
            accountDetails.userDataFolderPath,
            userDataFolderSub
          ),
          image: pictureUrl
        },
        savedDomains: [],
        isVisible: true
      })

      // add incognito one
      if (userDataFolderSub === 'Default') {
        const id =
          `${browser.name}_` +
          `${channelName}_` +
          `${incognitoName.replace(/ /g, '-')}_` +
          `${userDataFolderSub.replace(/ /g, '-')}`

        accounts.push({
          id,
          channelName,
          browser,
          incognito: {
            name: incognitoName,
            title: incognitoName.replace(/^./, (str: any) => str.toUpperCase())
          },
          savedDomains: [],
          isVisible: true
        })
      }
    }
  }

  return accounts
}
