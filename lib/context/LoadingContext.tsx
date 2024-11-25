"use client"

import { LoadingOverlay } from '@/ui/controls/LoadingOverlay'
import React, { createContext, useContext, useState } from 'react'

type LoadingContextType = {
  isLoading: boolean
  startLoading: (message?: string) => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const startLoading = (msg: string = "Cargando...") => {
    setIsLoading(true)
    setMessage(msg)
  }

  const stopLoading = () => {
    setIsLoading(false)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
      {isLoading && <LoadingOverlay message={message} />}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}