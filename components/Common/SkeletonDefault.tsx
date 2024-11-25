import { Skeleton } from "@/ui/controls/skeleton"

export default function SkeletonDefault() {
  return (
    <div className="min-h-[100vh] bg-gray-100">
      <header className="bg-[#017269] text-white p-2">
        <Skeleton className="h-8 w-64 bg-[#017269]" />
        <Skeleton className="h-4 w-96 mt-2 bg-[#017269]" />
      </header>

      <main className="mt-2 p-2 w-full h-[90vh]">

        <div className="bg-white shadow-md rounded-lg overflow-hidden h-[80vh]">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-24" />
              ))}
            </div>
            {[...Array(12)].map((_, i) => (
             
             <div key={i} className="flex justify-between items-center py-2 border-b">
                {[...Array(7)].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-24" />
                ))}
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-10 rounded-full" />
          ))}
        </div>

      </main>
    </div>
  )
}