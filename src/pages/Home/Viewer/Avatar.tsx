import React from 'react'
import { BrowserIcon } from '../../../constants'

const Avatar = ({ viewer }) => {
  const { isVisible, account, browser, incognito } = viewer
  const getBigCoin = () => {
    if (account?.image || !account)
      return (
        <img
          className={`flex-shrink-0 h-12 w-12 ${account?.image ? 'rounded-full' : ''} ${
            isVisible ? 'opacity-100' : 'opacity-40'
          }`}
          src={
            account?.image
              ? account?.image
              : incognito
              ? BrowserIcon.incognito
              : BrowserIcon[browser?.name]
          }
          alt=""
          style={{ filter: isVisible ? 'none' : 'grayscale(80%)' }}
        />
      )

    return (
      <span
        className={`inline-flex items-center justify-center h-12 w-12 rounded-full bg-white ${
          isVisible ? 'opacity-100' : 'opacity-40'
        }`}
      >
        <span className="text-lg font-medium leading-none text-gray-800">
          {account?.title[0] || browser?.title[0]}
        </span>
      </span>
    )
  }

  const getSmallCoin = () =>
    (account || incognito) && (
      <img
        className="h-5 w-5 absolute -bottom-0.5 -right-0.5"
        src={BrowserIcon[browser?.name]}
        alt=""
        style={{ filter: isVisible ? 'none' : 'grayscale(80%)' }}
      />
    )
  return (
    <div className="relative">
      {getBigCoin()}
      {getSmallCoin()}
    </div>
  )
}

export default Avatar
