'use client'

import React, { useState, useEffect } from 'react'
import { Label } from './label'

interface SubtotalItem {
  label: string
  value: string
  unit: string
}

interface SubtotalDisplayProps {
  items: SubtotalItem[]
  className?: string
}

export default function SubtotalDisplay({ items, className = "" }: SubtotalDisplayProps) {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getDisplayStyle = () => {
    if (windowWidth < 640) return 'w-full flex flex-col items-end space-y-2'
    if (windowWidth < 768) return 'w-full grid grid-cols-2 gap-2'
    return 'flex flex-row justify-end space-x-2 w-full'
  }

  return (
    <nav className={`${getDisplayStyle()} ${className}`} aria-label="Subtotales">
      {items.map((item, index) => (
        <Label
          key={index}
          className="flex gap-1 border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white px-4 py-2 w-full sm:w-auto text-right justify-end items-center"
        >
          <span className="font-bold">{item.label}</span>
          <span className="font-semibold">{item.value?.toLocaleString()}</span>
          <span className="ml-1 text-sm">{item.unit}</span>
        </Label>
      ))}
    </nav>
  )
}