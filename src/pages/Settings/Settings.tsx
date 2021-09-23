import React from 'react'
import { toast } from 'react-toastify'
import Header from './Header'
import OpenInFirst from './OpenInFirst'
import UnshortenUrls from './UnshortenUrls'
import SavedDomains from './SavedDomains'
import Footer from './Footer'
import useStoreChange from '@/utils/useStoreChange'

const Settings = () => {
  const { appVersion } = useStoreChange('Settings')

  return (
    <div className="h-[400px]">
      <Header />
      <div className="px-8 py-2 pr-5 overflow-y-auto overflow-x-hidden text-gray-400 h-[300px]">
        <OpenInFirst />
        <UnshortenUrls />
        <SavedDomains />
        <div className="pt-5 pb-5">
          <div
            className="px-2 inline-flex items-center py-1 border border-transparent text-xs font-medium text-gray-300 bg-red-900 hover:bg-red-800 cursor-default"
            onClick={() => {
              window
                .invokeEvent('resetBrowserList')
                .then((r: any) => (r.error ? toast.error(r.error) : toast(r.message)))
            }}
          >
            Reset Browser list
          </div>
          <div
            className="ml-2 px-2 inline-flex items-center py-1 border border-transparent text-xs font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 cursor-default"
            onClick={() => {
              // read from file
              window
                .invokeEvent('importSettings')
                .then((r: any) => (r.error ? toast.error(r.error) : toast(r.message)))
            }}
          >
            Import settings
          </div>
          <div
            className="ml-2 px-2 inline-flex items-center py-1 border border-transparent text-xs font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 cursor-default"
            onClick={() => {
              // save to file
              window
                .invokeEvent('exportSettings')
                .then((r: any) => (r.error ? toast.error(r.error) : toast(r.message)))
            }}
          >
            Export settings
          </div>
        </div>
        <div>
          <p>App version: {appVersion}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings
