import React from 'react'

const ToggleDrag = ({ state }: any) => {
  const { dragEnabled } = state
  return (
    <div
      className={`${
        dragEnabled ? 'bg-blue-600' : 'bg-gray-600'
      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full  transition-colors ease-in-out duration-200`}
      aria-pressed={dragEnabled ? 'true' : 'false'}
      title="Reorder accounts"
      onClick={() => {
        if (!dragEnabled) window.storeSet({ showHidden: false })
        window.storeSet({ dragEnabled: !dragEnabled })
      }}
    >
      <span
        className={`${
          dragEnabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-gray-800 shadow transform ring-0 transition ease-in-out duration-200`}
      >
        <span
          className={`${
            dragEnabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200'
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <svg className="bg-gray-800 h-3 w-3 text-gray-300" viewBox="0 0 1024 1024">
            <path
              d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span
          className={`${
            dragEnabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100'
          } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <svg className="bg-gray-800 h-3 w-3 text-gray-300" viewBox="0 0 1024 1024">
            <path
              d="M909.3 506.3L781.7 405.6a7.23 7.23 0 0 0-11.7 5.7V476H548V254h64.8c6 0 9.4-7 5.7-11.7L517.7 114.7a7.14 7.14 0 0 0-11.3 0L405.6 242.3a7.23 7.23 0 0 0 5.7 11.7H476v222H254v-64.8c0-6-7-9.4-11.7-5.7L114.7 506.3a7.14 7.14 0 0 0 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h222v222h-64.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V548h222v64.8c0 6 7 9.4 11.7 5.7l127.5-100.8a7.3 7.3 0 0 0 .1-11.4z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>
    </div>
  )
}

export default ToggleDrag
