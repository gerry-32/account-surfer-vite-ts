import React from 'react'
import ToggleHidden from './ToggleHidden'
import ToggleDrag from './ToggleDrag'

const Footer = ({ state, storeState }: any) => {
  return (
    <div className="flex leading-4 px-8 py-3">
      <div className="space-x-3">
        <ToggleHidden {...{ state, storeState }} />
        <ToggleDrag {...{ state, storeState }} />
      </div>

      <div
        className="ml-auto -mt-0.5 px-2 inline-flex items-center py-1 border border-transparent text-xs font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 cursor-default"
        onClick={() => storeState({ currentPage: '/settings' })}
      >
        Settings
      </div>
    </div>
  )
}

export default Footer
