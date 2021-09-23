import React from 'react'
import useStoreChange from '@/utils/useStoreChange'

const UnshortenUrls = () => {
  const { unshortenUrls } = useStoreChange('Settings')
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
    </div>
  )
}

export default UnshortenUrls
