import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'secondary' | 'outlineYellow' | 'outlineGreen' | 'outlineBlue' | 'outlineOrange' 
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '' 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full'
  
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    outlineYellow: 'border border-yellow-500 text-yellow-500 hover:bg-primary/10',
    outlineGreen: 'border border-green-500 text-green-500 hover:bg-primary/10',
    outlineBlue: 'border border-blue-500 text-blue-500 hover:bg-primary/10',
    outlineOrange: 'border border-orange-500 text-orange-500 hover:bg-primary/10',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  }
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <span className={combinedClassName}>
      {children}
    </span>
  )
}