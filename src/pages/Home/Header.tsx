import React from 'react'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

const Header = ({ state }: any) => {
  const { url } = state

  return (
    <div className="text-xl px-8 pt-2 text-gray-300 overflow-y-auto overflow-x-hidden h-[82px]">
      <h2 className="pb-1">
        {url ? 'Open link at ' : 'Launch an '}
        account or browser:
      </h2>
      {url && (
        <div className="group break-all truncate text-gray-500 hover:text-gray-400 -mx-2 -my-1 px-2 py-1 hover:bg-gray-900 relative">
          {url}
          <div className="absolute top-0 right-[7px] text-gray-300 z-10 opacity-0 group-hover:opacity-100 text-sm">
            <span
              className="py-1 px-2 bg-blue-900 hover:bg-blue-700 hover:text-gray-200"
              title='Hotkey: "ctrl+c"'
              onClick={() => {
                copy(url)
                toast('Url copied')
              }}
            >
              Copy
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
