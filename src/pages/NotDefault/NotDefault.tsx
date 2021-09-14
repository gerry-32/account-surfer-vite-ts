import React from 'react'
import windowsSettings from './windows-settings.png'

// To intercept links Account&nbsp;Surfer must integrate into the Windows
// system and create an association with links http and https. This is only
// possible by setting Account&nbsp;Surfer the default browser.

const NotDefault = () => {
  return (
    <div className="h-[400px]">
      <div className="text-md px-8 pt-2 pb-3 text-gray-300 h-[52px]">
        <h2>
          To run all functions - Account Surfer must be installed as the default browser:
        </h2>
      </div>

      <div className="overflow-hidden h-[300px]">
        <img src={windowsSettings} alt="Windows settings" className="h-[290px] mx-auto" />
      </div>
      <div className="flex leading-4 px-8 py-3">
        <div
          className="ml-auto -mt-0.5 px-2 inline-flex items-center py-1 border border-transparent text-xs font-medium text-gray-300 bg-blue-600 hover:bg-blue-500 cursor-default"
          onClick={() => window.invokeEvent('openWindowsSettings')}
        >
          Go to Windows settings
        </div>
      </div>
    </div>
  )
}

export default NotDefault
