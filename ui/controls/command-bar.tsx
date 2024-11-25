import React from 'react'
import { Button } from "@/ui/controls/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/controls/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/controls/dropdown-menu"
import { cn } from "@/lib/utils"
import { 
  ChevronDown
} from "lucide-react"

export interface CommandBarProps {
  icon: React.ReactNode
  label: string
  action: () => void
  highlight?: boolean
  subMenu?: { label: string; action: () => void }[]
}

interface ExecutiveCommandBarProps {
  className?: string
  commands: CommandBarProps[]
}
export function CommandBar({ className, commands }: ExecutiveCommandBarProps) {
  return (
    <TooltipProvider>
      <div className={cn("bg-white shadow-md rounded-lg p-1", className)}>
        <div className="flex flex-wrap items-center gap-1">
          {commands.map((command, index) => (
            command.subMenu ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-2 py-0 text-gray-700 hover:bg-[#017269] hover:text-white active:bg-[#8a0d21] active:text-white transition-colors duration-200"
                  >
                    {command.icon}
                    <span className="ml-2 hidden sm:inline">{command.label}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {command.subMenu.map((item, subIndex) => (
                    <DropdownMenuItem 
                      key={subIndex} 
                      onSelect={item.action}
                      className="hover:bg-[#017269] hover:text-white active:bg-[#8a0d21] active:text-white"
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    variant={command.highlight ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "h-9 px-2 py-0 flex items-center justify-center",
                      command.highlight 
                        ? "bg-[#017269] text-white hover:bg-[#8a0d21] active:bg-[#017269]" 
                        : "text-gray-700 hover:bg-[#017269] hover:text-white active:bg-[#8a0d21] active:text-white",
                      "transition-colors duration-200"
                    )}
                    onClick={command.action}
                  >
                    {command.icon}
                    <span className="ml-2 hidden sm:inline">{command.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="sm:hidden">
                  <p>{command.label}</p>
                </TooltipContent>
              </Tooltip>
            )
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}