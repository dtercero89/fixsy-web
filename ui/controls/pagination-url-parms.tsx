'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/ui/controls/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  className?: string;
}

export function PaginationURLParams({ currentPage, totalPages, pageSize,className = "" }: PaginationProps) {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);

  const pathname = usePathname();
  const searchParams = useSearchParams()
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageNumbers = () => {
    const maxButtons = windowWidth < 640 ? 3 : windowWidth < 768 ? 5 : 7;
    const halfButtons = Math.floor(maxButtons / 2);

    let startPage = Math.max(currentPage - halfButtons, 1);
    let endPage = Math.min(startPage + maxButtons - 1, totalPages);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  const goToPage = (page: number) => {
    const url = createPageURL(page);
    router.push(url);
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString());
    params.set('pageSize', pageSize.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav className={`flex justify-center items-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
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
            onClick={() => goToPage(1)}
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
          onClick={() => goToPage(page)}
          className={
            currentPage === page
              ? "bg-[#017269] text-white"
              : "border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"
          }
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
            onClick={() => goToPage(totalPages)}
            className="border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="border-[#017269] text-[#017269] hover:bg-[#017269] hover:text-white"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
