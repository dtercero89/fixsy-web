'use client'

import * as React from 'react'
import { Filter, FilterX, ListFilter, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '@/ui/controls/button'

interface FilterOption {
  id: string
  label: string
  onRender: (value: string, onChange: (value: string) => void) => React.ReactNode
}

interface FilterState {
  [key: string]: string
}

const useFilters = (initialFilters: FilterOption[] = []) => {
  const [filters, setFilters] = React.useState<FilterState>(() => 
    initialFilters.reduce((acc, filter) => ({ ...acc, [filter.id]: '' }), {})
  )

  const updateFilter = (id: string, value: string) => {
    setFilters(prev => ({ ...prev, [id]: value }))
  }

  const resetFilters = () => {
    setFilters(initialFilters.reduce((acc, filter) => ({ ...acc, [filter.id]: '' }), {}))
  }

  return { filters, updateFilter, resetFilters }
}

interface AdaptiveFiltersProps {
  filterOptions: FilterOption[]
  onApplyFilters?: () => void,
  onClearFilters?: () => void
}

const AdaptiveFilters: React.FC<AdaptiveFiltersProps> = ({
  filterOptions = [],
  onApplyFilters,
  onClearFilters
}) => {
  const { filters, updateFilter, resetFilters } = useFilters(filterOptions)
  const [isOpen, setIsOpen] = React.useState(false)

  // React.useEffect(() => {
  //   onFiltersChange?.(filters)
  // }, [filters, onFiltersChange])

  const handleOnApplyFilters=() => {
    if(onApplyFilters){
      onApplyFilters();
    }
    setIsOpen(false);
  }

  const FilterContent = () => (
    <>
      {filterOptions.length > 0 ? (
        filterOptions.map(filter => (
          <div key={filter.id}>
            <label htmlFor={filter.id} className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            {filter.onRender(filters[filter.id], (value) => updateFilter(filter.id, value))}
          </div>
        ))
      ) : (
        <p>No hay filtros disponibles</p>
      )}
      {filterOptions.length > 0 && (
        <div className='flex gap-2 pb-1'>
        <Button onClick={handleOnApplyFilters} variant="outline" className="mt-4">
          <Filter/> Aplicar Filtros
        </Button>

        <Button onClick={onClearFilters} variant="outline" className="mt-4">
        <FilterX /> Quitar Filtros
        </Button>
        </div>
        
      )}
    </>
  )

  return (
    <>
      <div className="hidden md:flex flex-wrap gap-4 items-end">
        <FilterContent />
      </div>

      <div className="md:hidden">
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <Button variant="outline">  <ListFilter/></Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed bottom-0 left-0 right-0 top-auto h-[80vh] overflow-y-auto rounded-t-[10px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="m-0 text-[17px] font-medium mb-4">
                Filtros
              </Dialog.Title>
              <div className="space-y-4">
                <FilterContent />
              </div>
              <Dialog.Close asChild>
                <button
                  className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <X />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  )
}

export default AdaptiveFilters