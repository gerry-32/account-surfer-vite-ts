import React from 'react'
import Avatar from './Avatar'
import DragDots from './DragDots'
import ViewerVisibilityToggler from './ViewerVisibilityToggler'
import useOnlineStatus from 'react-online-hook'

const Viewer = ({ viewer, dragEnabled, linearIndex, openUrlInViewer }) => {
  const { isVisible, account, browser, incognito, channelName } = viewer
  const { isOnline } = useOnlineStatus()
  return (
    <div
      className={`flex relative px-2 py-2 shadow-sm items-center hover:shadow-lg ${
        isVisible ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
      }`}
      onClick={() => !dragEnabled && openUrlInViewer(viewer)}
    >
      {linearIndex !== -1 && linearIndex < 9 && (
        <div
          className={`absolute left-0.5 top-0 text-xs text-gray-${
            isVisible ? '500' : '700'
          }`}
        >
          {linearIndex + 1}
        </div>
      )}
      {isOnline && <Avatar {...{ viewer }} />}
      <div className="flex-1 min-w-0 pl-2">
        <div className="">
          <p className="text-sm font-medium text-gray-300 truncate">
            {account?.title || incognito?.title || browser?.title}
            {!(account?.title || incognito?.title) &&
              channelName !== 'stable' &&
              `: ${channelName}`}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {account?.title || incognito?.title ? browser?.title : ''}
            {(account?.title || incognito?.title) &&
              channelName !== 'stable' &&
              `: ${channelName}`}
          </p>
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
