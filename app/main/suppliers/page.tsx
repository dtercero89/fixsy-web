'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/controls/card';
import { Button } from '@/ui/controls/button';
import TableControl from '@/ui/controls/table';
import { Edit, MoreVertical } from 'lucide-react';
import {
  getTableColumns,
  supplierCommands,
} from '@/components/Suppliers/settings';
import { Pagination } from '@/ui/controls/pagination';
import { useSupplierActions } from '@/lib/actions/suppliers';
import { CommandBar } from '@/ui/controls/command-bar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/controls/dropdown-menu';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Input } from '@/ui/controls/input';

export default function GestionProveedoresCafeDetallado() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [suppliersPaged, setSuppliersPaged] = useState<any>({
    pageSize: 10,
    totalPages: 1,
    pageNumber: 1,
    items: [],
  });
  const [pagedProp, setPagedProp] = useState<any>({
    pageSize: 10,
    page: 1,
    searchValue: '',
  });

  const { fetchGetSuppliersPagedAsync } = useSupplierActions();

  const router = useRouter();

  useEffect(() => {
    loadSuppliersPaged();
  }, []);

  useEffect(() => {
    loadSuppliersPaged();
  }, [pagedProp]);

  const loadSuppliersPaged = async() => {
    const request = {
      page: pagedProp.page,
      pageSize: pagedProp.pageSize,
      searchValue: pagedProp.searchValue,
    };

    const response = await fetchGetSuppliersPagedAsync(request);
    if(response ) {
      setSuppliers(response.items);
      return;
    }
    setSuppliers([]);
    
  };

  
  const onRenderActions = (proveedor: any) => {
    return (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                router.push(`suppliers/${proveedor.supplierId}`);
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const tableColumns = getTableColumns(onRenderActions);


  return (
    <Card className="flex h-[85vh] md:h-[90vh] w-full flex-col border-primary bg-white overflow-auto">
      <CardHeader className="bg-primary text-white">
        <CardTitle className="text-lg md:text-2xl">
          Suppliers
        </CardTitle>
      </CardHeader>

      <CommandBar
        commands={supplierCommands(() => {
          router.push('suppliers/create');
        })}
      />

      <CardContent className="flex-grow overflow-auto p-2 md:p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
                <Input
                  placeholder="Enter a search value then press enter"
                  onKeyDown={(e:any) => {
                    if (e.key === 'Enter') {
                      setPagedProp({ ...pagedProp, searchValue: e.target.value, page: 1 });
                    }
                  }}
                  className="w-full md:w-[35vw] border-primary focus:ring-primary"
                />
          </div>
        </div>

        <TableControl data={suppliers} columns={tableColumns} />
      </CardContent>
      <CardFooter className="border-t border-primary p-1">
        <Pagination
          className="flex w-full justify-center"
          currentPage={suppliersPaged && suppliersPaged.pageNumber}
          totalPages={suppliersPaged && suppliersPaged.totalPages}
          onPageChange={(page) => {
            setPagedProp({ ...pagedProp, page: page });
          }}
        />
      </CardFooter>
    </Card>
  );
}
