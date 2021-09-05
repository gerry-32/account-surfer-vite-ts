import React, { useState } from 'react'
import GridLayout from 'react-grid-layout'
import Viewer from './Viewer'
import { LAYOUT_COLS_NUMBER } from '../../constants'
import useKeyPress from '../../utils/useKeyPress'
import useStoreChange from '../../utils/useStoreChange'
import {
  extractModeGrid,
  getSqueezeRequired,
  prepareLayoutForSave
} from '../../utils/layout'

const getVisibleIndex = (item: any, editModeGrid: any) => {
  const onlyVisible = editModeGrid.filter((item: any) => item.isActive)
  return onlyVisible.findIndex((gridItem: any) => item.i === gridItem.i)
}

const Grid = ({ openUrlInViewer }: any) => {
  const [grid, storeGrid] = useStoreChange('grid')
  const [ignoreUpdateLayout, setIgnoreUpdateLayout] = useState(true)
  const [showHidden] = useStoreChange('showHidden')
  const [dragEnabled] = useStoreChange('dragEnabled')

  const currentModeLayout = extractModeGrid(
    grid.map(v => ({ ...v, i: v.id, h: 1, w: 1 })),
    dragEnabled,
    showHidden
  )

  useKeyPress(
    ({ code, metaKey }: any) => !dragEnabled && code.includes('Digit') && !metaKey,
    (e: any) => {
      const viewerIndex = +e.key - 1
      openUrlInViewer(currentModeLayout[viewerIndex])
    }
  )

  return (
    <GridLayout
      className=""
      isResizable={false}
      layout={currentModeLayout}
      cols={LAYOUT_COLS_NUMBER}
      rowHeight={66}
      width={655}
      containerPadding={[30, 0]}
      isDraggable={true}
      draggableHandle=".drag-dots"
      onLayoutChange={(updatedLayout: any) => {
        const squeezeRequired = getSqueezeRequired(updatedLayout)
        if (ignoreUpdateLayout && !squeezeRequired) {
          setIgnoreUpdateLayout(false)
        } else {
          storeGrid(prepareLayoutForSave(updatedLayout, grid))
          setIgnoreUpdateLayout(true)
        }
      }}
    >
      {currentModeLayout.map((viewer: any, index: any): any => {
        const linearIndex = dragEnabled ? getVisibleIndex(viewer, grid) : index
        return (
          <div key={viewer.id} title={`Hotkey: "${linearIndex + 1}"`}>
            <Viewer
              {...{
                viewer,
                dragEnabled,
                openUrlInViewer,
                linearIndex
              }}
            />
          </div>
        )
      })}
    </GridLayout>
  )
}

export default Grid
