import React from 'react'
import Header from './Header'
import SavedDomains from './SavedDomains'
import Footer from './Footer'
import useStoreChange from '../../utils/useStoreChange'

const Settings = () => {
  const [{ appVersion, openInFirst }, setState] = useStoreChange()
  return (
    <div className="h-[400px]">
      <Header />
      <div className="px-8 py-2 pr-5 overflow-y-auto overflow-x-hidden text-gray-400 h-[300px]">
        <div className="pb-5">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="openInFirst"
                name="openInFirst"
                type="checkbox"
                checked={openInFirst}
                className="form-checkbox"
                onChange={e => setState({ openInFirst: e.target.checked })}
              />
            </div>
            <div className="ml-2 text-sm">
              <label htmlFor="openInFirst" className="">
                <p>
                  Always open links in the{' '}
                  <span className="text-yellow-800">First account</span> <br /> Show
                  Account Surfer only when the link is clicked with CTRL+ALT+X pressed
                </p>
              </label>
            </div>
          </div>
        </div>{' '}
        <SavedDomains {...{ openInFirst }} />
        <div className="pt-5 pb-5">
          <div
            className="px-2 inline-flex items-center py-1 border border-transparent text-xs font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 cursor-default"
            onClick={() => window.sendEvent('requestResetBrowserList')}
          >
            Reset Browser list
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
