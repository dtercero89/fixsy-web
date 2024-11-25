'use client'

import React, { useState, useCallback, KeyboardEvent, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@/ui/controls/button'
import { Input } from '@/ui/controls/input'
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface Column {
  key: string
  header: string,
  width?: string;
}

interface PaginatedResult<T> {
  items: T[]
  totalItems: number
  totalPages: number
  currentPage: number
}

interface PaginatedGenericSearchProps<T> {
  title: string
  onSearch: (term: string, page: number, pageSize: number) => Promise<PaginatedResult<T>>
  onSelectedItem: (item: T | null) => void
  columns: Column[]
  placeholder?: string
  selectedValue: string | null
  formDataKey: string
  formId: string
  pageSize?: number
}

export default function PaginatedGenericSearch<T extends Record<string, any>>({
  title,
  onSearch,
  onSelectedItem,
  columns,
  placeholder = "Search...",
  selectedValue,
  formDataKey,
  formId,
  pageSize = 10,
}: PaginatedGenericSearchProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<PaginatedResult<T>>({
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = useCallback(async (page: number = 1) => {
    setIsLoading(true)
    setHasSearched(true)
    try {
      const searchResults = await onSearch(searchTerm, page, pageSize)
      setResults(searchResults)
      setCurrentPage(searchResults.currentPage)
    } catch (error) {
      setResults({
        items: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: 1
      })
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, onSearch, pageSize])

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(1)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSelectItem = (item: T) => {
    if(!item) return;
    
    onSelectedItem(item)
    setIsOpen(false)

    const form = document.getElementById(formId) as HTMLFormElement
    if (form) {
      const formData = new FormData(form)
      formData.set(formDataKey, item[formDataKey])
      
      const event = new CustomEvent('formDataUpdated', { detail: { key: formDataKey, value: item[formDataKey] } })
      form.dispatchEvent(event)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      onSelectedItem(null)
    }
  }

  const renderCellValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    return value
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= results.totalPages) {
      handleSearch(newPage)
    }
  }

  useEffect(() => {
    const form = document.getElementById(formId)
    if (form) {
      const handleFormDataUpdated = (e: Event) => {
        const customEvent = e as CustomEvent
        if (customEvent.detail.key === formDataKey) {
          setSearchTerm(customEvent.detail.value)
        }
      }
      form.addEventListener('formDataUpdated', handleFormDataUpdated)
      return () => {
        form.removeEventListener('formDataUpdated', handleFormDataUpdated)
      }
    }
  }, [formId, formDataKey])

  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <div className="flex items-center text-xs">
            <Input
              type="text"
              value={selectedValue ? selectedValue : title}
              readOnly
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            <Button
              variant="outline"
              size="icon"
              className="ml-1"
              onClick={(e:any) =>  { e.preventDefault(); setIsOpen(true)}}
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
            </Button>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 mt-5 sm:p-6 rounded-lg shadow-lg w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] max-w-2xl h-[90vh] sm:h-[80vh] md:h-[70vh] flex flex-col"
          >
            <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-grow mr-2"
              />
              <Button onClick={() => handleSearch(1)}>
                <SearchIcon/>
              </Button>
            </div>
            <div className="overflow-y-auto flex-grow">
              {isLoading ? (
                <p className="text-center">Loading...</p>
              ) : !hasSearched ? (
                <p className="text-center text-gray-500">Enter a search value then press enter</p>
              ) : results.items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-white">
                      <tr className="bg-gray-100 text-xs">
                        {columns.map((column) => (
                          <th key={column.key} className="p-2 text-left text-xs"
                          style={{ width: column.width }} 
                          >
                            {column.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {results.items.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleSelectItem(item)}
                        >
                          {columns.map((column) => (
                            <td key={column.key} className="p-2 text-xs" style={{ width: column.width }} >
                              {renderCellValue(item[column.key])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">No se encontró resultados.</p>
              )}
            </div>
            {results.totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <span>
                  Página {currentPage} de {results.totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === results.totalPages}
                  variant="outline"
                  size="sm"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Dialog.Close asChild>
              <button
                className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full p-2 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}