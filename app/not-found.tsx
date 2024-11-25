import Link from 'next/link'
import { Button } from "@/ui/controls/button"
import { Hammer, Wrench, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">404</h1>
          <p className="text-xl font-semibold tracking-tight text-primary">Page Not Found</p>
        </div>
        
        <div className="flex justify-center space-x-4 text-primary">
          <Hammer size={48} />
          <Wrench size={48} />
        </div>
        
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Sorry, the page you are looking for could not be found. It might have been moved or does not exist.
        </p>
        
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/" className="inline-flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

