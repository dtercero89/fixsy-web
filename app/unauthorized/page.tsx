'use client'

import Link from 'next/link'
import { Home, ShieldX } from 'lucide-react'

import { Button } from '@/ui/controls/button'

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="mx-auto max-w-md text-center">
        <ShieldX className="mx-auto h-24 w-24 text-primary" />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary">Access Denied</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sorry, you do not have permission to access this page. If you believe this is an error, please contact support.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild variant="outline" onClick={()=> { window.location.href ='/'}} >
            <Home className='w-14 h-14'/>
          </Button>
        </div>
      </div>
    </div>
  )
}

