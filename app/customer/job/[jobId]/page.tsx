import React from 'react';
import { fetchServer } from '@/lib/fetchHelper/fetchServer';
import { RequestForm } from '@/components/Customer/RequestForm';
import { auth } from '@/auth'
import { notFound, redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {

  const session = await auth()
  
  if (!session || !session.user) {
    redirect('/unauthorized');
  }

  const { jobId } =await params;
  const isEditMode = jobId !== 'create';

  let existingJob : any | null = null;
  
  if(isEditMode){
    existingJob = await fetchServer.httpGet('/jobs/by-id', { jobId, customerId:session.user.customerId });

    if (existingJob.status === 404) {
     notFound()
    }
  }
  
  return (
    <div>
       <RequestForm editingRequestedService={existingJob} />
    </div>
  );
}
