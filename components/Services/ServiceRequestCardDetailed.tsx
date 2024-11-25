'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/controls/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/controls/avatar';
import { Badge } from '@/ui/controls/badge';
import {
  ArrowLeft,
  CalendarIcon,
  CircleCheck,
  ClockIcon,
  NotebookPen,
  Save,
  UserIcon,
} from 'lucide-react';
import { formatDateTime12Hour, getBadgeColorByStatus } from '@/lib/utils';
import { ServiceRequestProps } from './ServiceRequestCard';
import GenericSearch from '@/ui/controls/generic-search-box';
import { Suspense, useEffect, useState } from 'react';
import { Textarea } from '@/ui/controls/textarea';
import { Button } from '@/ui/controls/button';
import { IN_PROCESS } from '@/lib/constants/status';
import { useRouter } from 'next/navigation';
import { utils } from '@/lib/utils/index';
import { useJobsActions } from '@/lib/actions/jobs';
import { useSupplierActions } from '@/lib/actions/suppliers';
import AlertDialog from '@/ui/controls/alert-dialog';

export function ServiceRequestCardDetailed({
  jobId,
  title,
  description,
  requirements,
  status,
  preferredSchedule,
  createdAt,
  customerName,
  supplierName,
  assignedAt,
  completedAt,
  notes,
  supplierId,
  serviceName,
}: ServiceRequestProps) {

  const [pendingChanges, setPendingChanges] = useState<boolean>(false);
  const [isOpenAlertCompleteJob, setIsOpenAlertCompleteJob] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<any>({
    notes:'',
    supplierName: '',
    assignedAt: new Date(),
  });

  const router = useRouter();
  const { fetchCompleteRequestedServicesAsync, fetchUpdateRequestedServicesAsync } = useJobsActions();
  const {fetchGetSuppliersAsync} = useSupplierActions();

  useEffect(() => {
    setDataForm({
      notes,
      supplierName,
      supplierId,
      jobId
    });

  },[]);


  const searchSuppliers = async (term: string): Promise<any[]> => {
    const request =  {
      searchValue: term
    }

    const response = await fetchGetSuppliersAsync(request);

    const suppliers = await Promise.all(
      response.map((item: any) => {
        return {
          ...item
        };
      }),
    );
    return suppliers;
  };

  
  const handleOnDataFormChange = (
    propName: any,
    value: any,
  ) => {
    setDataForm((prevState: any) => ({
      ...prevState,
      [propName]: value,
    }));
  };

  const hanldeOnCompleteRequestService = async () => {
      setIsOpenAlertCompleteJob(true);
  };

  const hanldeOnUpdateRequestService = async () => {
        
    const request = { 
        ...dataForm
    }

    const response = await fetchUpdateRequestedServicesAsync(request);

    if(response && utils.isResponseSucceeded(response)){
      setPendingChanges(false);
      router.refresh();
    }

  }

  const onCompleteJob = async () => { 
    setIsOpenAlertCompleteJob(false);
    const request = {
      jobId,
    };

    const response = await fetchCompleteRequestedServicesAsync(request);
    if (response && utils.isResponseSucceeded(response)) {
      router.refresh();
    }
  }

  
  const onRenderStartProductionActions = () => {
    return (
      <div className="felx">
        <Button className="mr-3 w-16" onClick={onCompleteJob}>
          YES
        </Button>

        <Button
          variant="outline"
          className="w-16"
          onClick={() => {
            setIsOpenAlertCompleteJob(false);
          }}
        >
          No
        </Button>
      </div>
    );
  };

  return (
    <Card className="border-1 flex h-full min-h-[30vh] w-full flex-col rounded-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${customerName}`}
              />
              <AvatarFallback>
                {customerName && customerName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{title}
              <Badge className='ml-5' variant={getBadgeColorByStatus(status)}>{status}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Customer: {customerName}
              </p>
              <p className="text-sm text-muted-foreground">
                Service: {serviceName}
              </p>
              
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow text-slate-600">
        <p className="mb-4">{description}</p>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">
                Preferred Schedule: {preferredSchedule}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">
                Created at: {formatDateTime12Hour(new Date(createdAt))}
              </span>
            </div>
          </div>

          <div className="space-y-2">

            <div className="flex items-center gap-2">
              <UserIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">Assigned to:</span>
              <GenericSearch<any>
                title=""
                placeholder={ dataForm && dataForm.supplierName ? dataForm.supplierName : `Pending`}
                formDataKey="main--supplier-search"
                formId="frm-filter-inv-detailed-main"
                selectedValue={
                  
                  dataForm && dataForm.supplierName
                    ? dataForm.supplierName
                    : ''
                }
                onSearch={searchSuppliers}
                onSelectedItem={(item:any)=>{

                  if(item) {
                    handleOnDataFormChange('supplierId',item.supplierId );
                    handleOnDataFormChange('supplierName',item.name );
                    setPendingChanges(true);
                  }
              
                }}
                columns={[{ key: 'name', header: 'Supplier' },
                          {key: 'services', header: 'Services'}
                ]}
                
              />
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">
                Assigned at: {formatDateTime12Hour((new Date(assignedAt)))}
              </span>
            </div>

          </div>
        </div>

        <div className="flex items-center">
          <NotebookPen className="mr-2 h-4 w-4" />
          <span className="text-sm">Notes:</span>
        </div>
        <div className="flex items-center">
          <Textarea className="mt-4 md:max-w-[75vw]" 
              value={dataForm && dataForm.notes ? dataForm.notes :'' }
              onChange={(e) =>
              {
                setPendingChanges(true);
                handleOnDataFormChange('notes',e.target.value)}
              } />
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex justify-between gap-1">
        <Button
              variant="ghost"
              
              onClick={()=> router.push('/main')}
            >
              <ArrowLeft className="h-5 w-5 pr-1" />
              Back
            </Button>

          {status === IN_PROCESS && (
            <Button
              variant="ghost"
              className="text-green-800"
              onClick={hanldeOnCompleteRequestService}
            >
              <CircleCheck className="h-5 w-5 pr-1" />
              Complete
            </Button>
          )}

        {pendingChanges && <Suspense>
          <Button
              variant="default"
              className="w-full bg-[#017269] hover:bg-slate-300 hover:text-[#017269] text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-md transition duration-300 text-xs sm:text-sm md:text-base flex items-center justify-center space-x-1 sm:space-x-2"
              onClick={hanldeOnUpdateRequestService}
            >
              <Save className="h-5 w-5 pr-1" />
              Save
            </Button>
          </Suspense>}  
     
        </div>
      </CardFooter>

      <AlertDialog
          description="Do you want complete the selected request service ?"
          title="Complete Job"
          isOpen={isOpenAlertCompleteJob}
          onClose={() => {
            setIsOpenAlertCompleteJob(false);
          }}
          actions={onRenderStartProductionActions}
          key="remove-process-production"
        />
        
    </Card>
  );
}
