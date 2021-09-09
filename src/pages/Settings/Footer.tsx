import React from 'react'
import useStoreChange from '../../utils/useStoreChange'

const Footer = () => {
  const [, setState] = useStoreChange()
  return (
    <div className="flex leading-4 px-8 py-3">
      <div
        className="ml-auto -mt-0.5 px-2 inline-flex items-center py-1 border border-transparent text-xs font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 cursor-default"
        onClick={() => setState({ currentPage: '/' })}
      >
        Home
      </div>
    </div>
  )
}

export default Footer
