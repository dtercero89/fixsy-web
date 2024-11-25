import { TableControlColumn } from "@/ui/controls/table";
import { PlusIcon } from "lucide-react";

  export const getTableColumns = (onRenderActions: (rowData: any) => JSX.Element): TableControlColumn[] => [
    {
      header: 'Actions', 
      accessor: '', 
      width: '80px',
      onRender: onRenderActions,
    },
    { header: 'Name', accessor: 'name', width:'260px' },
    { header: 'Email', accessor: 'email',width:'260px'},
    { header: 'Phone Numer', accessor: 'phoneNumber',width:'160px'},
    { header: 'Services', accessor: 'services'},
 
  ];

 export const supplierCommands = (handleOnNew:()=>void)=> {
    return [
      { icon: <PlusIcon className="h-4 w-4" />, label: "Add Supplier", action: () => handleOnNew() },
    ]}
