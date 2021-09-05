import React from 'react'

const DragDots = ({ isVisible }: any) => {
  return (
    <div className="drag-dots flex-shrink-0">
      <div
        className={`w-6 h-8 cursor-move inline-flex items-center justify-center ${
          isVisible
            ? 'text-gray-300 hover:text-gray-200'
            : 'text-gray-600 hover:text-gray-500'
        }`}
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </div>
    </div>
  )
}

export default DragDots
