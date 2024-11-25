"use client"

import React from 'react'
import { Button } from "@/ui/controls/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/controls/tooltip"
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconButtonProps {
  icon: LucideIcon
  tooltip: string
  width?: string | number
  height?: string | number
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
}

export default function IconButton({
  icon: Icon,
  tooltip,
  width = "auto",
  height = "auto",
  onClick,
  type = "button",
  className
}: IconButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            type={type}
            onClick={onClick}
            style={{ width, height }}
            className={cn("p-2", className)}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{tooltip}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}