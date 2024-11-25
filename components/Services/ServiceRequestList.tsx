

import { utils } from "@/lib/utils/index"
import { ServiceRequestCard } from "./ServiceRequestCard"

interface ServiceRequestListProps {
  jobs: any[]
}

export function ServiceRequestList({ jobs }: ServiceRequestListProps) {
  return (
   !utils.arrayHasItems(jobs) ? <div></div>
   :
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto h-[70vh] mt-3">
      
      {jobs.map((job) => (
        
        <ServiceRequestCard
          key={job.jobId}
          jobId={job.jobId}
          title={job.title}
          description={job.description}
          requirements={job.requirements}
          status={job.status}
          preferredSchedule={job.preferredSchedule}
          createdAt={job.createdAt}
          customerName={job.customerName}
          supplierName={job.supplierName}
          assignedAt={job.assignedAt}
          completedAt={job.completedAt}
          notes={job.notes}
          supplierId={job.supplierId}
          serviceName={job.serviceName}
          
        />
      ))}


    </div> 


  )
}

