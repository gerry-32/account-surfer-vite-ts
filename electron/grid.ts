import { getViewers } from './viewers/getViewers'

const LAYOUT_COLS_NUMBER = 3

const generateGrid = (viewers: any) =>
  viewers.map((viewer: any, index: any) => ({
    ...viewer,
    domains: [],
    isVisible: true,
    x: index % LAYOUT_COLS_NUMBER,
    y: Math.floor(index / LAYOUT_COLS_NUMBER)
  }))

export const getBrowserGrid = async () => {
  const viewers = await getViewers()
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
