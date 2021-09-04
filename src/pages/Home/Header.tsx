import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import useStoreChange from '../../utils/useStoreChange'
import { CheckIcon } from '@heroicons/react/solid'

const Header = () => {
  const [url, storeUrl] = useStoreChange('url')
  const [, storeShouldSaveDomain] = useStoreChange('shouldSaveDomain')
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    copy(url)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="text-xl px-8 pt-2 text-gray-300 overflow-y-auto overflow-x-hidden h-[82px]">
      <h2 className="pb-1">
        {url ? 'Open link at ' : 'Launch an '}
        account or browser:
      </h2>
      {url && (
        <div className="group break-all truncate text-gray-500 hover:text-gray-400 -mx-2 -my-1 px-2 py-1 hover:bg-gray-900 relative">
          {url}
          <div className="absolute top-0 right-0 text-gray-300 z-10 opacity-0 group-hover:opacity-100 text-sm">
            <span
              className="py-1 px-2 bg-blue-900 hover:bg-blue-700 hover:text-gray-200"
              onClick={onCopy}
            >
              {copied ? (
                <>
                  <CheckIcon className="h-4 w-4 inline text-green-400" /> Copied
                </>
              ) : (
                'Copy'
              )}
            </span>
            <span
              className="py-1 px-2 bg-red-900 hover:bg-red-700 hover:text-gray-200"
              onClick={() => {
                storeUrl('')
                storeShouldSaveDomain(false)
              }}
            >
              Erase
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
