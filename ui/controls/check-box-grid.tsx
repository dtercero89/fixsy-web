'use client'

import React from 'react'
import { Checkbox } from "@/ui/controls/checkbox"
import { Label } from "@/ui/controls/label"

interface CheckboxItem {
  key: any
  text: string
}

interface CheckboxGridProps {
  title?: string
  items: CheckboxItem[]
  selectedValues: string[]
  onChange: (selectedKeys: any[]) => void
  columns?: number
}

export const CheckboxGrid: React.FC<CheckboxGridProps> = ({
  title,
  items,
  selectedValues,
  onChange,
  columns = 4
}) => {

  const handleCheckboxChange = (key: string, checked: boolean) => {
    const updatedSelection = checked
      ? [...selectedValues, key]
      : selectedValues.filter(item => item !== key)
    onChange(updatedSelection)
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>} 
      <div className={`w-[80vw] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-2`}>
        {items.map((item) => (
          <div key={item.key} className="flex items-center space-x-2 w-full">
            <Checkbox
              id={item.key}
              checked={selectedValues && selectedValues.includes(item.key)}
              onCheckedChange={(checked) => handleCheckboxChange(item.key, checked as boolean)}
              className="flex-shrink-0"
            />
            <Label 
              htmlFor={item.key} 
              className="text-sm font-normal whitespace-nowrap overflow-hidden text-ellipsis flex-grow"
            >
              {item.text}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}