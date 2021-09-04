import React from 'react'

const TitleBar = () => {
  return (
    <div
      className="p-1 text-sm pl-2 text-gray-200 relative h-[30px] app-region-drag"
    >
      Account Surfer
      <svg
        className="h-7 w-7 p-1 hover:bg-gray-700 absolute inset-y-0 right-0 app-region-no-drag"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        onClick={() => window.AS.ipcRenderer.send('requestHideWindow')}
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

export default TitleBar
