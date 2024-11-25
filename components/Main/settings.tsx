import {
    providers,
    dashboards,
    requests,
  } from '@/lib/constants/constants';
import { SUPPLIERS } from '@/lib/constants/permissions';
import { TableControlColumn } from '@/ui/controls/table';
import { Grid2X2, Home, HomeIcon, SendHorizonal, Users } from 'lucide-react';

export const adminMenuItems = [
  {
    key: dashboards,
    label: 'Home',
    icon: <HomeIcon className="mr-2 h-4 w-4" />,
    path: '/',
    subItems: [],
  },
    {
      key: providers,
      label: 'Suppliers',
      icon: <Users className="mr-2 h-4 w-4" />,
      path: '/suppliers',
      subItems: [],
      securityName: SUPPLIERS,
    }
  ];

  export const customerMenuItems = [
    {
      key: dashboards,
      label: 'My Requests',
      icon: <Grid2X2 className="mr-2 h-4 w-4" />,
      path: '/',
      subItems: [],
    },
    {
      key: requests,
      label: 'Request Service',
      icon: <SendHorizonal className="mr-2 h-4 w-4" />,
      path: '/job/create',
      subItems: [],
    }
    ];

  
    export const getMainAdminJobsTableColumns = (onRenderActions: (rowData: any) => JSX.Element
    ,onRenderEntryDate: (rowData: any) => JSX.Element, onRenderStatus: (rowData: any) => JSX.Element): TableControlColumn[] => [
  {
  header: 'Actions', 
  accessor: '', 
  width: '70px',
  onRender: onRenderActions,
  }, 
  {
  header: 'Created Date', 
  accessor: 'createdAt', 
  width: '130px',
  onRender: onRenderEntryDate, 
  },            
  { header: 'Title', accessor: 'confirmationHour' },
  { header: 'Estado', accessor: 'status', onRender:onRenderStatus, width:'180px' },
  { header: 'Boleta Peso No.', accessor: 'confirmationId' },
  { header: 'Remisión No.', accessor: 'remissionNo' },
  { header: 'Guía Recepción No.', accessor: 'receiptRef' },
  { header: 'Producto', accessor: 'productName', width: '150px' },
  { header: 'Proveedor', accessor: 'supplierName', width: '200px'},
  { header: 'Calidad', accessor: 'coffeeQuality'},
  { header: 'Variedades Café', accessor: 'coffeeVariety' },
  { header: 'Cantidad', accessor: 'quantity'},
  { header: 'Cantidad Confirmada', accessor: 'quantityConfirmed'},
  { header: 'Balance Cantidad', accessor: 'quantityBalanced'},
  { header: 'UM', accessor: 'unitOfMeasure'},
  { header: 'Sacos', accessor: 'packagingBagNumber'},
  { header: 'Sacos Confirmados', accessor: 'packagingBagNumberConfirmed'},
  { header: 'Balance Sacos', accessor: 'packagingBagNumberBalance'},
  { header: 'Humedad%', accessor: 'humidityPercentageConfirmed'},
  { header: 'Cosecha', accessor: 'harvest' },
  { header: 'Notas', accessor: 'notesConfirmation', width: '250px'},
];