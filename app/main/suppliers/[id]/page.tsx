import React from 'react';
import { fetchServer } from '@/lib/fetchHelper/fetchServer';
import { SupplierFormPage } from '@/components/Suppliers/SupplierFormPage';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } =await params;
  const isEditMode = id !== 'create';

  let existingSupplier : any | null = null;
  
  if(isEditMode){
    existingSupplier = await fetchServer.httpGet('/suppliers/by-id', { supplierId: id  });
  }

  return (
    <div>
       <SupplierFormPage editingSupplier={existingSupplier} />
    </div>
  );
}
