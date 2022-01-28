import React from 'react'
import Avatar from './Avatar'
import DragDots from './DragDots'
import ViewerVisibilityToggler from './ViewerVisibilityToggler'
import useOnlineStatus from 'react-online-hook'

const Viewer = ({ viewer, dragEnabled, linearIndex, openUrlInViewer }: any) => {
  const { isVisible, title, subTitle } = viewer
  const { isOnline } = useOnlineStatus()
  return (
    <div
      className={`flex relative px-2 py-2 shadow-sm items-center hover:shadow-lg ${
        isVisible ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
      }`}
      onClick={e => !dragEnabled && openUrlInViewer(viewer, e.ctrlKey)}
    >
      {linearIndex !== -1 && linearIndex < 9 && (
        <div
          className={`absolute left-0.5 top-0 text-xs ${
            isVisible ? 'text-gray-500' : 'text-gray-700'
          }`}
        >
          {linearIndex + 1}
        </div>
      )}
      {isOnline && <Avatar {...{ viewer }} />}
      <div className="flex-1 min-w-0 pl-2">
        <div className="">
          <p className="text-sm font-medium text-gray-300 truncate">{title}</p>
          <p className="text-sm text-gray-500 truncate">{subTitle}</p>
        </div>
      </div>
      {dragEnabled && (
        <>
          <ViewerVisibilityToggler {...{ isVisible, viewerId: viewer.id }} />
          <DragDots {...{ isVisible }} />
        </>
      )}
    </div>
  )
}

export default Viewer
