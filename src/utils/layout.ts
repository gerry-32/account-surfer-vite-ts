import { LAYOUT_COLS_NUMBER } from '../constants'

// "grid" items contain only browsers + grid coordinates
// "layout" items contain only tech info
// "matrix" items contain ALL data
// "mesh" is any type of previous

const orderMeshByCoordinate = (mesh: any) =>
  mesh
    .map((item: any) => ({ ...item, weight: item.x + LAYOUT_COLS_NUMBER * item.y }))
    .sort((a: any, b: any) => a.weight - b.weight)
    .map((item: any) => {
      const { weight, ...rest } = item
      return rest
    })

const squeezeMesh = (mesh: any) =>
  mesh.map((item: any, i: any, arr: any) => ({
    ...item,
    x: i % LAYOUT_COLS_NUMBER,
    y: Math.floor(i / LAYOUT_COLS_NUMBER)
  }))

// GRID has ID field, LAYOUT has I field
const mergeLayoutWithGridField = (layout: any, grid: any) =>
  layout.map((layoutItem: any) => ({
    ...grid.find((gridItem: any) => gridItem.id === layoutItem.i),
    ...layoutItem
  }))

// GRID has ID field, LAYOUT has I field
const getMissingIds = (editModeGrid: any, squeezedLayout: any) =>
  editModeGrid
    .filter(
      (gridItem: any) =>
        !squeezedLayout.some((layoutItem: any) => layoutItem.i === gridItem.id)
    )
    .map((item: any) => ({
      id: item.id,
      originalIndex: editModeGrid.findIndex((indexItem: any) => indexItem.id === item.id)
    }))

const getMatrixWithInactive = (
  matrixWithoutInactive: any,
  missingIds: any,
  editModeGrid: any
) => {
  let matrixWithInactive = [...matrixWithoutInactive]
  const insertInPosition = (arr: any, item: any, i: any) => [
    ...arr.slice(0, i),
    item,
    ...arr.slice(i)
  ]

  if (missingIds.length) {
    for (let i = 0; i < missingIds.length; i++) {
      const insertionIndex = missingIds[i].originalIndex
      const currentItem = editModeGrid[insertionIndex]

      matrixWithInactive =
        insertionIndex === 0
          ? [currentItem, ...matrixWithInactive]
          : [...insertInPosition(matrixWithInactive, currentItem, insertionIndex)]
    }
  }

  return matrixWithInactive
}

const getGridFromMatrix = (matrix: any) => {
  const FieldsToStore = [
    'id',
    'isVisible',
    'savedDomains',
    'x',
    'y',
    'bigIcon',
    'smallIcon',
    'commandLineArguments',
    'exePath',
    'subTitle',
    'title'
  ]

  return matrix.map((viewer: any) =>
    Object.keys(viewer)
      .filter(field => FieldsToStore.includes(field))
      .reduce((acc, curVal) => ({ ...acc, [curVal]: viewer[curVal] }), {})
  )
}

export const prepareLayoutForSave = (updatedLayout: any, grid: any) => {
  const orderedLayout = orderMeshByCoordinate(updatedLayout)
  const squeezedLayout = squeezeMesh(orderedLayout)
  const matrixWithoutInactive = mergeLayoutWithGridField(squeezedLayout, grid)
  const missingIds = getMissingIds(grid, squeezedLayout)
  const matrixWithInactive = getMatrixWithInactive(
    matrixWithoutInactive,
    missingIds,
    grid
  )
  const squeezedMatrix = squeezeMesh(matrixWithInactive)
  const orderedMatrix = orderMeshByCoordinate(squeezedMatrix)
  const newGrid = getGridFromMatrix(orderedMatrix)
  return newGrid
}

export const extractModeGrid = (grid: any, dragEnabled: any, showHidden: any) => {
  const modeGrid =
    dragEnabled || showHidden ? grid : grid.filter((item: any) => item.isVisible)
  return squeezeMesh(modeGrid)
}

export const getSqueezeRequired = (layout: any) => {
  let isSqueezeRequired = false
  const LAST_IN_ROW = LAYOUT_COLS_NUMBER - 1
  for (let i = 0; i < layout.length - 1; i++) {
    const current = layout[i]
    const desiredNext = {
      x: current.x === LAST_IN_ROW ? 0 : current.x + 1,
      y: current.x === LAST_IN_ROW ? current.y + 1 : current.y
    }
    const next = layout[i + 1]
    // window.electronLog.log('____')
    // window.electronLog.log(`x${current.x} y${current.y} current ${current.i}`)
    // window.electronLog.log(`x${desiredNext.x} y${desiredNext.y} desiredNext`)
    // window.electronLog.log(`x${next.x} y${next.y} next ${next.i}`)
    if (desiredNext.x !== next.x || desiredNext.y !== next.y) {
      isSqueezeRequired = true
    }
  }
  return isSqueezeRequired
}
