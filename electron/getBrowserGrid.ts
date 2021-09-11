// import { app } from 'electron'
// import path from 'path'
import fs from 'fs'
// import https from 'https'
// import base64Img from 'base64-img'
// import t from 'typy'
// import { startLogging } from './log'
import { nonChromiumLocations } from './browserLocations'
import electronLog from './log'

// const log = startLogging();

const LAYOUT_COLS_NUMBER = 3

const getNonChromiumViewers = async () => {
  const viewers = []
  for (const browser of nonChromiumLocations) {
    for (const channel of browser.channels) {
      for (const exePath of channel.exePaths) {
        try {
          await fs.promises.access(exePath, fs.constants.R_OK)

          const viewerProps = {
            browser: {
              channelName: channel.channelName,
              exePath: exePath,
              iconName: browser.browserName,
              title: browser.browserName.replace(/^./, str => str.toUpperCase()),
              commandLineArguments: ''
            },
            domains: [],
            isVisible: true
          }

          viewers.push(
            {
              id: `${browser.browserName}_${channel.channelName}`,
              ...viewerProps
            },
            {
              id: `${browser.browserName}_${channel.channelName}_incognito`,
              ...viewerProps,
              browser: {
                ...viewerProps.browser,
                commandLineArguments: browser.incognitoCommandLineArgument
              }
            }
          )
        } catch (e) {
          // electronLog.error(`${exePath}: path does not exist`)
        }
      }
    }
  }
  return viewers
}

// const getViewers = async (existingBrowsers: any) => {
//   const viewers = []
//   for (const browser of existingBrowsers) {
//     if (browser.accountDetails) {
//       const accounts = await browser.accountDetails.resolver(browser)
//       viewers.push(...accounts)
//     } else {
//       viewers.push(browser)
//     }
//   }
//   return viewers
// }

const generateGrid = (viewers: any) =>
  viewers.map((viewer: any, index: any) => ({
    ...viewer,
    x: index % LAYOUT_COLS_NUMBER,
    y: Math.floor(index / LAYOUT_COLS_NUMBER)
  }))

export const getBrowserGrid = async () => {
  const nonChromiumViewers = await getNonChromiumViewers()

  const allViewers = [
    ...nonChromiumViewers
    // ...chromiumViewersWithAccounts,
    // ...chromiumViewersWithoutAccounts
  ]
  electronLog.info(allViewers)
  // const grid = generateGrid()

  // const viewers = await getViewers(existingBrowsers)
  const grid = generateGrid(allViewers)
  return grid
  // return []
}

export const getMergedGrid = (freshGrid: any, storedGrid: any) => {
  const uniqueFreshGridItems = freshGrid.filter(
    (freshAccount: any) =>
      !storedGrid.some((storedAccount: any) => storedAccount.id === freshAccount.id)
  )

  const mergedGrid = [
    ...storedGrid,
    ...uniqueFreshGridItems.map((browser: any, index: any) => ({
      ...browser,
      x: (index + storedGrid.length) % LAYOUT_COLS_NUMBER,
      y: Math.floor((index + storedGrid.length) / LAYOUT_COLS_NUMBER)
    }))
  ]

  return mergedGrid
}
