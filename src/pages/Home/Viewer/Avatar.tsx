import React, { useState } from 'react'
import BrowserIcons from '../../../BrowserIcons'

const Avatar = ({ viewer }: any) => {
  const { isVisible, bigIcon, smallIcon, title } = viewer

  const [bigIconLoadFailed, setBigIconLoadFailed] = useState(false)
  const [bigIconSrc, setBigIconSrc] = useState(
    bigIcon.fromSrc ||
      bigIcon.fromFile ||
      BrowserIcons[bigIcon.fromTemplate] ||
      BrowserIcons[smallIcon.fromTemplate]
  )

  const [smallIconLoadFailed, setSmallIconLoadFailed] = useState(false)
  const [smallIconSrc, setSmallIconSrc] = useState(
    smallIcon.fromSrc || smallIcon.fromFile || BrowserIcons[smallIcon.fromTemplate]
  )

  const getBigIcon = () => {
    return (
      <img
        className={`flex-shrink-0 h-12 w-12 ${
          bigIcon.fromSrc || bigIcon.fromFile ? 'rounded-full' : ''
        } ${isVisible ? 'opacity-100' : 'opacity-40'}`}
        src={bigIconSrc}
        alt=""
        style={{ filter: isVisible ? 'none' : 'grayscale(80%)' }}
        onError={() => {
          setBigIconLoadFailed(true)
          window.electronLog.error(`image loading failed: ${bigIconSrc}`)
          setBigIconSrc(BrowserIcons[bigIcon.fromTemplate])
        }}
      />
    )
  }

  const getSmallIcon = () =>
    smallIconSrc && (
      <img
        className="h-5 w-5 absolute -bottom-0.5 -right-0.5"
        src={smallIconSrc}
        alt=""
        style={{ filter: isVisible ? 'none' : 'grayscale(80%)' }}
        onError={() => {
          setSmallIconLoadFailed(true)
          window.electronLog.error(`image loading failed: ${smallIconSrc}`)
          setSmallIconSrc(BrowserIcons[smallIcon.fromTemplate])
        }}
      />
    )

  return (
    <div className="relative">
      {getBigIcon()}
      {bigIconLoadFailed || getSmallIcon()}
    </div>
  )
}

export default Avatar
