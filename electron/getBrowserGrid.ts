// import { app } from 'electron'
// import path from 'path'
// import https from 'https'
// import base64Img from 'base64-img'
// import t from 'typy'
// import { startLogging } from './log'
import electronLog from './log'
import { getNonChromiumViewers } from './viewers/getViewers'

// const log = startLogging();

const LAYOUT_COLS_NUMBER = 3

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

// const generateGrid = (viewers: any) =>
//   viewers.map((viewer: any, index: any) => ({
//     ...viewer,
//     id: index,
//     x: index % LAYOUT_COLS_NUMBER,
//     y: Math.floor(index / LAYOUT_COLS_NUMBER)
//   }))

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
  // const grid = generateGrid(allViewers)
  // return grid
  return []
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
