'use client';

import { Button } from '@/ui/controls/button';
import { Edit } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const ServiceRequestCardActions = ({
  jobId,
}: {
  status: string;
  jobId: number;
}) => {
  
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex justify-between gap-1">
      <Button variant="outline" onClick={()=> router.push(`${pathname}/job/${jobId}`)}>
        <Edit className='w-6 h-6 p-1'/>
        Edit</Button>

    </div>
  );
};

export default ServiceRequestCardActions;