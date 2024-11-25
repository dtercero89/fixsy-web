
import React from 'react'

interface LoadingOverlayProps {
  message?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-2 max-w-sm w-[150px] mx-4 relative overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
            <div className="bg-[#017269] h-2.5 rounded-full bg-gradient-to-r from-[#017269] to-[#ff9966] animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  )
}