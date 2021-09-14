import React from 'react'
import ViewerSection from './ViewerSection'
import useStoreChange from '@/utils/useStoreChange'

const SavedDomains = () => {
  const { openInFirst, grid } = useStoreChange('SavedDomains')

  return (
    <div className="relative pt-10">
      {openInFirst && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-80 z-10 -m-3 -mt-2"></div>
      )}
      <h2 className=" text-lg mb-2 absolute top-0 z-30">
        Saved domains
        {openInFirst && (
          <>
            {' '}
            (disabled in <span className="text-yellow-800">First account</span> mode)
          </>
        )}
        :
      </h2>
      {grid.map((viewer: any) => (
        <ViewerSection {...{ viewer }} key={viewer.id} />
      ))}
    </div>
  )
}

export default SavedDomains
