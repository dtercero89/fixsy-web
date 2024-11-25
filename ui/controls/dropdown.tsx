'use client'

import React, { useState, useEffect } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

interface Option {
  key: string;
  text: string
}

interface DropdownProps {
  name: string
  options?: Option[]
  defaultValue?: string | string[]
  placeholder?: string
  onChange?: (value: string | string[]) => void
  selectedKey?: string | string[]
  isMulti?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  options = [],
  defaultValue,
  placeholder = 'Seleccione una opción',
  onChange,
  selectedKey,
  isMulti = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(() => {
    const initialKeys = isMulti
      ? (Array.isArray(selectedKey) ? selectedKey : (selectedKey ? [selectedKey] : []))
      : (selectedKey ? [selectedKey] : [])
    return initialKeys.map(key => options.find(opt => opt.key === key)).filter(Boolean) as Option[]
  })

  useEffect(() => {
    if (selectedKey) {
      const keys = isMulti
        ? (Array.isArray(selectedKey) ? selectedKey : [selectedKey])
        : (Array.isArray(selectedKey) ? [selectedKey[0]] : [selectedKey])
      const newSelectedOptions = keys.map(key => options.find(opt => opt.key === key)).filter(Boolean) as Option[]
      setSelectedOptions(newSelectedOptions)
    } else {
      setSelectedOptions([])
    }
  }, [selectedKey, options, isMulti])

  if (!Array.isArray(options) || options.length === 0) {
    return (
      <div className="text-gray-700 p-2 border rounded-md">
        {selectedOptions.length > 0 ? selectedOptions.map(opt => opt.text).join(', ') : placeholder}
      </div>
    )
  }

  const handleValueChange = (newValue: string) => {
    let newSelectedOptions: Option[]
    if (isMulti) {
      const option = options.find(opt => opt.key === newValue)
      if (option) {
        newSelectedOptions = selectedOptions.some(opt => opt.key === newValue)
          ? selectedOptions.filter(opt => opt.key !== newValue)
          : [...selectedOptions, option]
      } else {
        newSelectedOptions = selectedOptions
      }
    } else {
      newSelectedOptions = [options.find(opt => opt.key === newValue)].filter(Boolean) as Option[]
    }
    setSelectedOptions(newSelectedOptions)
    if (onChange) {
      onChange(isMulti ? newSelectedOptions.map(opt => opt.key) : newValue)
    }
  }

  const removeOption = (key: string) => {
    const newSelectedOptions = selectedOptions.filter(opt => opt.key !== key)
    setSelectedOptions(newSelectedOptions)
    if (onChange) {
      onChange(isMulti ? newSelectedOptions.map(opt => opt.key) : newSelectedOptions[0]?.key)
    }
  }

  return (
    <Select.Root 
      name={name} 
      value={isMulti ? undefined : selectedOptions[0]?.key}
      onValueChange={handleValueChange}
    >
      <Select.Trigger className="inline-flex items-center justify-between rounded-md px-4 py-2 text-sm leading-none h-auto min-h-[40px] gap-1 bg-white border border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 data-[placeholder]:text-gray-400 w-full flex-wrap">
        <div className="flex flex-wrap gap-1">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <div key={option.key} className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-sm flex items-center">
                {option.text}
                {isMulti && (
                  <button 
                    onClick={(e) => { e.preventDefault(); removeOption(option.key); }} 
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label={`Remover ${option.text}`}
                  >
                    <Cross2Icon />
                  </button>
                )}
              </div>
            ))
          ) : (
            <Select.Value placeholder={placeholder} />
          )}
        </div>
        <Select.Icon className="text-gray-400">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.key}
                value={option.key}
                className="relative flex items-center h-8 px-8 text-sm text-gray-700 rounded-md select-none hover:bg-blue-100 focus:bg-blue-100 focus:outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900"
              >
                <Select.ItemText>{option.text}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-700 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default Dropdown