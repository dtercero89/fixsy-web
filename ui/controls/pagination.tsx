"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/ui/controls/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set the initial window width
    setWindowWidth(window.innerWidth)

    // Add event listener
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const getPageNumbers = () => {
    const maxButtons = windowWidth < 640 ? 3 : windowWidth < 768 ? 5 : 7
    const halfButtons = Math.floor(maxButtons / 2)

    let startPage = Math.max(currentPage - halfButtons, 1)
    let endPage = Math.min(startPage + maxButtons - 1, totalPages)

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(endPage - maxButtons + 1, 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className={`flex justify-center items-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {pageNumbers[0] > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            className="border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"
          >
            1
          </Button>
          {pageNumbers[0] > 2 && <MoreHorizontal className="h-4 w-4 text-gray-400" />}
        </>
      )}
      
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(page)}
          className={currentPage === page 
            ? "bg-[#017269] text-white" 
            : "border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"}
        >
          {page}
        </Button>
      ))}
      
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <MoreHorizontal className="h-4 w-4 text-gray-400" />}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            className="border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"
          >
            {totalPages}
          </Button>
        </>
      )}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}