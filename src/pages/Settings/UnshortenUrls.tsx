import React, { useState } from 'react'
import { PlusIcon, CheckIcon, XIcon } from '@heroicons/react/solid'
import useStoreChange from '@/utils/useStoreChange'

const UnshortenUrls = () => {
  const { unshortenUrls, shortenerServices } = useStoreChange('Settings')
  const [newShortener, setNewShortener] = useState('')
  const [addShortenerEnabled, setAddShortenerEnabled] = useState(false)

  const addShortener = (newShortener: any) =>
    window.storeSet({ shortenerServices: [...shortenerServices, newShortener] })

  const removeShortenerByIndex = (indexToRemove: number) =>
    window.storeSet({
      shortenerServices: shortenerServices.filter(
        (_: any, i: number) => i !== indexToRemove
      )
    })

  return (
    <div className="pb-5">
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id="unshortenUrls"
            name="unshortenUrls"
            type="checkbox"
            checked={unshortenUrls}
            className="form-checkbox"
            onChange={e => window.storeSet({ unshortenUrls: e.target.checked })}
          />
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor="unshortenUrls" className="">
            <p>Unshorten URLs from services like Bit.ly, Goo.gl and similar</p>
          </label>
        </div>
      </div>

      <div className="mt-2 mb-3">
        {/* <div className="mb-2">Shortener services:</div> */}
        <div className="-mx-0.5">
          {shortenerServices.map((shortenerService: string, shortenerIndex: number) => (
            <div
              key={shortenerService}
              className="inline-flex bg-gray-600 relative pr-6 align-top m-0.5 "
            >
              <div className="inline-flex text-sm font-medium text-gray-300">
                <span className="px-1.5 pl-2 py-1">{shortenerService}</span>
              </div>
              <div
                className="inset-y-0 right-0 absolute bg-gray-700 hover:bg-gray-500"
                onClick={() => removeShortenerByIndex(shortenerIndex)}
              >
                <XIcon className="w-6 h-4 mt-1.5 " />
              </div>
            </div>
          ))}
          {addShortenerEnabled ? (
            <div className="relative p-0.5">
              <input
                autoFocus
                type="text"
                value={newShortener}
                onChange={e => setNewShortener(e.target.value)}
                className="inline-flex m-0.5 p-2 w-40 h-7 bg-gray-800 text-gray-200 text-sm border-none align-top"
                placeholder="e.g. google.com"
              />
              <div
                className="inline-flex p-1 h-7 align-baseline m-0.5 relative bg-red-900 hover:bg-red-800"
                onClick={() => {
                  setNewShortener('')
                  setAddShortenerEnabled(false)
                }}
              >
                <div className="inline-flex px-1.5 text-sm text-gray-200">Cancel</div>
              </div>
              <div
                className={`inline-flex p-1 h-7 align-baseline pl-4 m-0.5 relative ${
                  newShortener.length
                    ? ' bg-blue-700 hover:bg-blue-600 text-gray-200'
                    : ' bg-gray-700 text-gray-500'
                }`}
                onClick={() => {
                  if (newShortener) {
                    addShortener(newShortener)
                    setAddShortenerEnabled(false)
                    setNewShortener('')
                  }
                }}
              >
                <div className="inset-y-0 left-0 absolute ">
                  <CheckIcon className="w-6 h-4 mt-1.5 " />
                </div>
                <div className="inline-flex px-1.5 text-sm ">Save</div>
              </div>
            </div>
          ) : (
            <div
              className="inline-flex p-1 pl-4 m-0.5 relative bg-green-800 hover:bg-green-600"
              onClick={() => {
                setAddShortenerEnabled(true)
              }}
            >
              <div className="inset-y-0 left-0 absolute ">
                <PlusIcon className="w-6 h-4 mt-1.5 " />
              </div>
              <div className="inline-flex px-1.5 text-sm text-gray-200">domain</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UnshortenUrls
