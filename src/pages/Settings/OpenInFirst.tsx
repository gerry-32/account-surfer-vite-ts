import React from 'react'
import { toast } from 'react-toastify'
import useStoreChange from '@/utils/useStoreChange'

const OpenInFirst = () => {
  const { openInFirst } = useStoreChange('Settings')
  return (
    <div className="pb-5">
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id="openInFirst"
            name="openInFirst"
            type="checkbox"
            checked={openInFirst}
            className="form-checkbox"
            onChange={e =>
              window
                .invokeEvent('setFirstAccountMode', e.target.checked)
                .then((r: any) => (r.error ? toast.error(r.error) : toast(r.message)))
            }
          />
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor="openInFirst" className="">
            <p>
              Always open links in the{' '}
              <span className="text-yellow-800">First account</span> <br /> Show Account
              Surfer only when the link is clicked with CTRL+ALT+X pressed
            </p>
          </label>
        </div>
      </div>
    </div>
  )
}

export default OpenInFirst
