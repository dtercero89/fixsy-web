'use client';

import { Supplier } from '@/lib/types/suppliers';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/controls/select';
import { ArrowBigLeft, PlusIcon, Save } from 'lucide-react';
import { FormSection } from '@/ui/controls/form-section';
import { useSupplierActions } from '@/lib/actions/suppliers';
import { FormEvent } from 'react';
import { utils } from '@/lib/utils/index';
import { useRouter } from 'next/navigation';
import { CommandBar } from '@/ui/controls/command-bar';
import { mapFormDataToObject } from '@/lib/utils';

export const SupplierFormPage = ({
  editingSupplier,
}: {
  editingSupplier: any | null;
}) => {
  const { fetchCreateSupplier } = useSupplierActions();
  const router = useRouter();

  async function handleOnSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSupplier = mapFormDataToObject<Supplier>(formData, Supplier);

    newSupplier.supplierId =
      editingSupplier?.supplierId || newSupplier.supplierId;

    const request = {
      supplier: { ...newSupplier },
      isEditing: utils.objectIsNotNull(editingSupplier),
    };
    const response = await fetchCreateSupplier(request);

    if (response && utils.isResponseSucceeded(response)) {
      router.push(`/main/suppliers/${response.supplierId}`);
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
          router.push('/main/suppliers');
        },
      },
    ];

    if (isEditing) {
      cmd.push({
        icon: <PlusIcon className="h-4 w-4" />,
        label: 'Add Supplier',
        action: () => router.push('/main/suppliers/create'),
      });
    }

    return cmd;
  };

  return (
    <Card className="flex h-[91vh] w-full flex-col border-[#017269] bg-white">
      <CardHeader className="bg-[#017269] text-white">
        <CardTitle className="text-2xl font-bold">
          {' '}
          {editingSupplier ? 'Edit Supplier' : 'Create Supplier'}
        </CardTitle>
      </CardHeader>

      <CommandBar commands={crudSuppliersCommands(utils.objectIsNotNull(editingSupplier))} />

      <CardContent className="flex-grow overflow-auto p-2 text-black md:p-4">
        <form onSubmit={handleOnSubmitForm}>
          
          <FormSection title="General Information" columns={{ default: 1, sm: 1, md: 2, lg: 2 }}>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <span className="pl-1 text-red-500">*</span>
              <Input
                id="name"
                name="name"
                defaultValue={editingSupplier?.name}
              />
            </div>
    
            <div className="space-y-2">
              <Label htmlFor="emai-input-field">Email</Label>
              <span className="pl-1 text-red-500">*</span>
              <Input
                id="email-id"
                name="email"
                defaultValue={editingSupplier?.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber-keylb">Phone Number</Label>
              <span className="pl-1 text-red-500">*</span>
              <Input
                id="phoneNumber-id"
                name="phoneNumber"
                defaultValue={editingSupplier?.phoneNumber}
              />
            </div>
     
            <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={editingSupplier?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </FormSection>

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
