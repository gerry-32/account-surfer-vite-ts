import React, { useState } from 'react'
import BrowserIcons from '../../../BrowserIcons'

const Avatar = ({ viewer }: any) => {
  const { isVisible, avatarUrl, iconName, title } = viewer
  const [imageLoadFailed, setImageLoadFailed] = useState(false)
  const [imageSrc, setImageSrc] = useState(avatarUrl ? avatarUrl : BrowserIcons[iconName])

  const getBigCoin = () => {
    return (
      <img
        className={`flex-shrink-0 h-12 w-12 ${avatarUrl ? 'rounded-full' : ''} ${
          isVisible ? 'opacity-100' : 'opacity-40'
        }`}
        src={imageSrc}
        alt=""
        style={{ filter: isVisible ? 'none' : 'grayscale(80%)' }}
        onError={() => {
          setImageLoadFailed(true)
          setImageSrc(BrowserIcons[iconName])
          window.electronLog.error(`image loading failed: ${imageSrc}`)
        }}
      />
    )

    return (
      <span
        className={`inline-flex items-center justify-center h-12 w-12 rounded-full bg-white ${
          isVisible ? 'opacity-100' : 'opacity-40'
        }`}
      >
        <span className="text-lg font-medium leading-none text-gray-800">{title}</span>
      </span>
    )
  }

  const getSmallCoin = () =>
    avatarUrl && (
      <img
        className="h-5 w-5 absolute -bottom-0.5 -right-0.5"
        src={BrowserIcons[iconName]}
        alt=""
        style={{ filter: isVisible ? 'none' : 'grayscale(80%)' }}
      />
    )
  return (
    <div className="relative">
      {getBigCoin()}
      {imageLoadFailed || getSmallCoin()}
    </div>
  )
}

export default Avatar
