'use client';

import { Button } from '@/ui/controls/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/controls/card';
import { Input } from '@/ui/controls/input';
import { Label } from '@/ui/controls/label';
import { ArrowBigLeft, PlusIcon, Save } from 'lucide-react';
import { FormSection } from '@/ui/controls/form-section';
import { FormEvent, useEffect, useState } from 'react';
import { utils } from '@/lib/utils/index';
import { useRouter } from 'next/navigation';
import { CommandBar } from '@/ui/controls/command-bar';
import { isNullOrEmpty, mapFormDataToObject } from '@/lib/utils';
import { useCustomersActions } from '@/lib/actions/customers';
import { RequestJob } from '@/lib/types/requestJob';
import { DatePicker } from '@/ui/controls/date-picker';
import { Textarea } from '@/ui/controls/textarea';
import GenericSearch from '@/ui/controls/generic-search-box';
import { useServicesActions } from '@/lib/actions/services';

export const RequestForm = ({
  editingRequestedService,
}: {
  editingRequestedService: RequestJob | null;
}) => {

  const [dataForm, setDataForm] = useState<RequestJob>(new RequestJob());

  useEffect(() => {
      if(editingRequestedService && utils.objectIsNotNull(editingRequestedService)){
        setDataForm(editingRequestedService);
      }
  },[editingRequestedService])

  const { fetchPublishRequestService } = useCustomersActions();
  const {fetchServices} = useServicesActions();
  const router = useRouter();

  async function handleOnSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRequestService = mapFormDataToObject<RequestJob>(formData, RequestJob);

    newRequestService.jobId =
      editingRequestedService?.jobId || newRequestService.jobId;

    const request = {
      job: { ...dataForm },
    };
    const response = await fetchPublishRequestService(request);

    if (response && utils.isResponseSucceeded(response)) {
      router.push(`/customer/job/${response.jobId}`);
    }
  }

  const crudSuppliersCommands = (
    isEditing: boolean,
  ) => {
    const cmd = [
      {
        icon: <ArrowBigLeft className="h-4 w-4" />,
        label: 'Back',
        action: () => {
          router.push('/customer');
        },
      },
    ];

    if (isEditing) {
      cmd.push({
        icon: <PlusIcon className="h-4 w-4" />,
        label: '',
        action: () => router.push('/customer/job/create'),
      });
    }

    return cmd;
  };


  const searchServices = async (term: string): Promise<any[]> => {
    const request =  {
      searchValue: term
    }

    const response = await fetchServices(request);

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

  
  return (
    <Card className="flex h-[91vh] w-full flex-col border-[#017269] bg-white">
      <CardHeader className="bg-[#017269] text-white">
        <CardTitle className="text-2xl font-bold">
          {' '}
          {editingRequestedService ? 'Edit Request Service' : 'Create Request Service'}
        </CardTitle>
      </CardHeader>

      <CommandBar commands={crudSuppliersCommands(utils.objectIsNotNull(editingRequestedService))} />

      <CardContent className="flex-grow overflow-auto p-2 text-black md:p-4">
        <form onSubmit={handleOnSubmitForm}>
          
          <FormSection title="Enter the details of your request" columns={{ default: 1, sm: 1, md: 2, lg: 2 }}>
          <div className="space-y-2">
              <Label htmlFor="title-input-field">Title</Label>
              <span className="pl-1 text-red-500">*</span>
              <Input
                id="title-id"
                name="title"
                onChange={(e) => handleOnDataFormChange('title',e.target.value)}
                value={dataForm?.title}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Service</Label>
              <span className="pl-1 text-red-500">*</span>
              <GenericSearch<RequestJob>
                title=""
                placeholder={ dataForm && dataForm.serviceName ? dataForm.serviceName : `Select Service`}
                formDataKey="customer-service-search"
                formId="frm-filter-inv-detailed-customer-request"
                selectedValue={
                  
                  dataForm && dataForm.serviceName ? dataForm.serviceName : ``
                }
                onSearch={searchServices}
                onSelectedItem={(item:any)=>{

                  if(item) {
                    handleOnDataFormChange('serviceId',item.serviceId );
                     handleOnDataFormChange('serviceName',item.name );
                  }
              
                }}
                columns={[{ key: 'name', header: 'Service' }]
                }
              />
            </div>
    
  
            <div className="space-y-2">
              <Label htmlFor="phoneNumber-keylb">Description</Label>
              <span className="pl-1 text-red-500">*</span>
              <Textarea
                id="description-id"
                name="description"
                onChange={(e) => handleOnDataFormChange('description',e.target.value)}
                value={dataForm?.description}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber-keylb">Requirements</Label>
              <span className="pl-1 text-red-500">*</span>
              <Textarea
                id="requirements-id"
                name="requirements"
                onChange={(e) => handleOnDataFormChange('requirements',e.target.value)}
                value={dataForm?.requirements}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber-keylb">PreferredSchedule</Label>
              <span className="pl-1 text-red-500">*</span>
              <DatePicker
              selectedDate={dataForm && dataForm.preferredScheduleDate ? dataForm.preferredScheduleDate : new Date()} 
              onDateChange={(date:any)=> {
                    if(date){
                      const preferredScheduleStr = date.toLocaleString();
                      handleOnDataFormChange('preferredSchedule',preferredScheduleStr);
                      handleOnDataFormChange('preferredScheduleDate',date);
                    }
              }} />
            </div>
     
          </FormSection>
          <br/>
          {dataForm && !isNullOrEmpty(dataForm.supplierName) && 
            
              <FormSection title="Supplier Assigned" columns={{ default: 3, sm: 1, md: 3, lg: 3 }}>
              <div className="space-y-2">
                  <Label htmlFor="title-input-field">Name</Label>
                  <Input readOnly defaultValue={dataForm?.supplierName}
                  />
                </div>
    
                <div className="space-y-2">
                  <Label htmlFor="title-input-field">Phone Number</Label>
                  <Input readOnly defaultValue={dataForm?.supplierPhoneNumber}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title-input-field">Email</Label>
                  <Input readOnly defaultValue={dataForm?.supplierEmail}
                  />
                </div>
              </FormSection>
              }

          <CardFooter className="flex justify-end gap-2 p-1">
            <Button
              type="submit"
              className="bg-[#017269] text-white hover:bg-[#017269]"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
