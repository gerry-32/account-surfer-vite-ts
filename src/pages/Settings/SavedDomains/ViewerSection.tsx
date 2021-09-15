import React, { useState } from 'react'
import { PlusIcon, CheckIcon, XIcon } from '@heroicons/react/solid'
import Protocols from './Protocols'
import BrowserIcons from '../../../BrowserIcons'
import useStoreChange from '@/utils/useStoreChange'

const ViewerSection = ({ viewer }: any) => {
  const { grid } = useStoreChange('ViewerSection')

  const { id, savedDomains, bigIcon, smallIcon, title, subTitle } = viewer
  const [newDomainHost, setNewDomainHost] = useState('')
  const [newDomainProtocol, setNewDomainProtocol] = useState(['https', 'http'])
  const [imgSrc, setImgSrc] = useState(
    bigIcon.fromSrc ||
      bigIcon.fromFile ||
      BrowserIcons[bigIcon.fromTemplate] ||
      smallIcon.fromSrc ||
      smallIcon.fromFile ||
      BrowserIcons[smallIcon.fromTemplate]
  )
  const [addDomainEnabled, setAddDomainEnabled] = useState(false)

  const updateGrid = (grid: any) => window.storeSet({ grid })

  const updateProtocolByIndex = (protocolsStr: string, indexToUpdate: number) =>
    updateGrid(
      grid.map((v: any) =>
        v.id === id
          ? {
              ...v,
              savedDomains: v.savedDomains.map((domainObj: any, i: number) =>
                i === indexToUpdate
                  ? {
                      ...domainObj,
                      protocols: protocolsStr.split(', ')
                    }
                  : domainObj
              )
            }
          : v
      )
    )

  const addDomain = (domainObj: any) =>
    updateGrid(
      grid.map((v: any) =>
        v.id === id ? { ...v, savedDomains: [...v.savedDomains, domainObj] } : v
      )
    )

  const removeDomainByIndex = (indexToRemove: number) =>
    updateGrid(
      grid.map((v: any) =>
        v.id === id
          ? {
              ...v,
              savedDomains: v.savedDomains.filter(
                (_: any, i: number) => i !== indexToRemove
              )
            }
          : v
      )
    )

  return (
    <div key={id} className="bg-gray-900 p-3 mb-3">
      <h3 className="mb-2">
        <img
          className="h-5 w-5 inline-block mr-1 align-text-bottom"
          src={imgSrc}
          alt=""
          onError={() => {
            window.electronLog.warn(`image loading failed: ${imgSrc}`)
            setImgSrc(BrowserIcons[bigIcon.fromTemplate])
          }}
        />
        {title}
        {subTitle && ` | ${subTitle}`}
      </h3>
      <div className="-mx-0.5">
        {savedDomains.map((domainObj: any, domainIndex: number) => (
          <div
            key={domainObj.host}
            className="inline-flex bg-gray-600 relative pr-6 align-top m-0.5 "
          >
            <div className="inline-flex text-sm font-medium text-gray-300">
              <Protocols
                {...{
                  domainObj,
                  onChange: (protocolsStr: string) =>
                    updateProtocolByIndex(protocolsStr, domainIndex)
                }}
              />
              <span className="px-1.5 pl-2 py-1">{domainObj.host}</span>
            </div>
            <div
              className="inset-y-0 right-0 absolute bg-gray-700 hover:bg-gray-500"
              onClick={() => removeDomainByIndex(domainIndex)}
            >
              <XIcon className="w-6 h-4 mt-1.5 " />
            </div>
          </div>
        ))}
        {addDomainEnabled ? (
          <div className="relative p-0.5">
            <Protocols
              {...{
                domainObj: { protocols: newDomainProtocol },
                onChange: (protocolsStr: any) =>
                  setNewDomainProtocol(protocolsStr.split(', '))
              }}
            />
            <input
              autoFocus
              type="text"
              value={newDomainHost}
              onChange={e => setNewDomainHost(e.target.value)}
              className="inline-flex m-0.5 p-2 w-40 h-7 bg-gray-800 text-gray-200 text-sm border-none align-top"
              placeholder="e.g. google.com"
            />
            <div
              className="inline-flex p-1 h-7 align-baseline m-0.5 relative bg-red-900 hover:bg-red-800"
              onClick={() => {
                setNewDomainHost('')
                setAddDomainEnabled(false)
              }}
            >
              <div className="inline-flex px-1.5 text-sm text-gray-200">Cancel</div>
            </div>
            <div
              className={`inline-flex p-1 h-7 align-baseline pl-4 m-0.5 relative ${
                newDomainHost.length
                  ? ' bg-blue-700 hover:bg-blue-600 text-gray-200'
                  : ' bg-gray-700 text-gray-500'
              }`}
              onClick={() => {
                if (newDomainHost) {
                  addDomain({
                    host: newDomainHost,
                    protocols: newDomainProtocol
                  })
                  setAddDomainEnabled(false)
                  setNewDomainHost('')
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
              setAddDomainEnabled(true)
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
  )
}

export default ViewerSection
