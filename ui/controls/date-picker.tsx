"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths, format, subMonths } from "date-fns"
import { es } from "date-fns/locale"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/controls/button"

interface CalendarProps {
  selectedDate?: Date
  onDateChange?: (date: Date) => void
  defaultDate?: Date
  className?: string,
  placeHolders?: string
}

export function DatePicker({ selectedDate, onDateChange, defaultDate, className,placeHolders }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(defaultDate || new Date())
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  React.useEffect(() => {
    if (defaultDate) {
      setCurrentMonth(defaultDate)
    }
  }, [defaultDate])

  const daysInMonth = React.useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))
  }, [currentMonth])

  const handleDateSelect = (date: Date) => {
    onDateChange?.(date)
    setIsPopoverOpen(false)
  }

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  return (
    <div>

    
    <PopoverPrimitive.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selectedDate && !defaultDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP", { locale: es }) : 
           defaultDate ? format(defaultDate, "PPP", { locale: es }) : 
           <span> {placeHolders ? placeHolders :'Selecciona una fecha' }</span>}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          className="z-50 w-auto rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevMonth}
                className="h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium">
                {format(currentMonth, "MMMM yyyy", { locale: es })}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextMonth}
                className="h-7 w-7"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["D", "L", "M", "X", "J", "V", "S"].map((day) => (
                <div key={day} className="font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {daysInMonth.map((date, i) => {
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
                const isDefault = defaultDate && date.toDateString() === defaultDate.toDateString() && !selectedDate
                const isToday = date.toDateString() === new Date().toDateString()
                return (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 p-0 font-normal",
                      isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      isDefault && "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground",
                      isToday && !isSelected && !isDefault && "border border-primary text-primary"
                    )}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date.getDate()}
                  </Button>
                )
              })}
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
    </div>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}