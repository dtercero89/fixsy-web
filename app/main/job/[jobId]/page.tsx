import React from 'react';
import { fetchServer } from '@/lib/fetchHelper/fetchServer';
import { ServiceRequestCardDetailed } from '@/components/Services/ServiceRequestCardDetailed';

export default async function Page({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {

  const { jobId } = await params;
  const isEditMode = jobId !== 'create';

  let job : any | null = null;
  
  if(isEditMode){
    const jobResponse = await fetchServer.httpGet('/jobs/by-id', { jobId, cutomerId:0  });
    job = jobResponse ? jobResponse : {};
  }

  return (
    <div>
       <ServiceRequestCardDetailed
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
    </div>
  );
}
