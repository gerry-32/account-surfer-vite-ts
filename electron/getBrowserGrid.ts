// import { app } from 'electron'
// import path from 'path'
import fs from 'fs'
// import https from 'https'
// import base64Img from 'base64-img'
// import t from 'typy'
// import { startLogging } from './log'
import { browserLocations } from './browserLocations'

// const log = startLogging();

const LAYOUT_COLS_NUMBER = 3

const getExistingBrowsers = async () => {
  const existingBrowsers = []
  for (const browser of browserLocations) {
    for (const channel of browser.channels) {
      for (const exePath of channel.exePaths) {
        try {
          await fs.promises.access(exePath, fs.constants.R_OK)

          const existingBrowser: any = {
            id: `${browser.browserName}_${channel.channelName}`,
            channelName: channel.channelName,
            browser: {
              exePath: exePath,
              name: browser.browserName,
              title: browser.browserName.replace(/^./, str => str.toUpperCase())
            },
            domains: [],
            isVisible: true
          }

          if ((<any>channel)?.accountDetails)
            existingBrowser.accountDetails = (<any>channel).accountDetails
          if ((<any>channel)?.incognitoName)
            existingBrowser.incognitoName = (<any>channel).incognitoName

          existingBrowsers.push(existingBrowser)
        } catch (e) {
          // console.log(`${exePath}: path does not exist`);
        }
      }
    }
  }
  return existingBrowsers
}

const getViewers = async (existingBrowsers: any) => {
  const viewers = []
  for (const browser of existingBrowsers) {
    if (browser.accountDetails) {
      const accounts = await browser.accountDetails.resolver(browser)
      viewers.push(...accounts)
    } else {
      viewers.push(browser)
    }
  }
  return viewers
}

const generateGrid = (viewers: any) =>
  viewers.map((viewer: any, index: any) => ({
    ...viewer,
    x: index % LAYOUT_COLS_NUMBER,
    y: Math.floor(index / LAYOUT_COLS_NUMBER)
  }))

export const getBrowserGrid = async () => {
  const existingBrowsers = await getExistingBrowsers()
  const viewers = await getViewers(existingBrowsers)
  const grid = generateGrid(viewers)
  return grid
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
