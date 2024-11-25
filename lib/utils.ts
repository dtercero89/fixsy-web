import {COMPLETED, IN_PROCESS, NEW, PENDING } from './constants/status';

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDate = (date: Date | undefined, dateFormat: string = 'dd-MM-yyyy'): string => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return format(date, dateFormat); // Puedes personalizar el formato aquí
  }
  return '';
};

export const formatDateTime = (date: Date | undefined, dateTimeFormat: string = 'dd-MM-yyyy HH:mm:ss'): string => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return format(date, dateTimeFormat); 
  }
  return '';
};

export const formatDateTime12Hour = (date: Date | undefined, dateTimeFormat: string = 'dd-MM-yyyy hh:mm a'): string => {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return format(date, dateTimeFormat);
  }
  return '';
};


export const generatePagination = (currentPage: number, totalPages: number) => {

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function arrayHasItems(arr:any[] | undefined) {
  
  if (arr !== undefined && arr !== null && arr.length > 0) {
      return true;
  } else {
      return false;
  }
}

export const isNullOrEmpty = (text?:string) =>
  text === undefined || text === null || text === '';


export const currentDate = ()=>{
    const currentDate = new Date();
    const zoneDifferenceHours:number = process.env.HOURS_FOR_CURRENT_DATE ? Number(process.env.HOURS_FOR_CURRENT_DATE) :0 ;
    const newHours = currentDate.getHours() - zoneDifferenceHours;
    currentDate.setHours(newHours)
    return currentDate;
  
}

export const getStatusColors=(status:string | undefined)=>{

  if(status===PENDING){
    return {textColor: 'text-s24Yellow-500', backgroundColor: 'bg-white', borderColor:'border-s24Yellow-500'}
  }

  if(status===NEW){
    return {textColor: 'text-blue-300', backgroundColor: 'bg-white', borderColor:'border-blue-300'}
  }
  
  return{};


}

export const skeletonShimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  

  type Constructor<T> = { new(): T };

  export function mapFormDataToObject<T>(formData: FormData, model: Constructor<T>): T {
      const instance = new model();
  
      // Convertir el iterador a un array para asegurar compatibilidad
      const formEntries = Array.from(formData.entries());
  
      for (const [key, value] of formEntries) {
          if (Object.prototype.hasOwnProperty.call(instance, key)) {
              const propertyType = typeof (instance as any)[key];
              (instance as any)[key] = convertToType(value, propertyType);
          }
      }
  
      return instance;
  }
  
  function convertToType(value: any, type: string) {
      switch (type) {
          case "number":
              return Number(value);
          case "boolean":
              return value === "true";
          default:
              return value;
      }
  }


export function mapToAnyClass<T>(source: any, targetClass: new () => T): T {
    const instance = new targetClass(); // Crear una nueva instancia de la clase de destino
  
    for (const key in instance) {
      // Verificar si la propiedad existe en el objeto de origen
      if (key in source) {
        instance[key as keyof T] = source[key];
      }
    }
  
    return instance; // Devolver la instancia mapeada
  }

  export function getCurrentHarvest(): string {
    const ahora = new Date();
    const añoActual = ahora.getFullYear();
    const mesActual = ahora.getMonth() + 1; // getMonth() devuelve 0 para enero, por eso sumamos 1

    // Si el mes es septiembre (9) o mayor, la cosecha es "año actual - año actual + 1"
    if (mesActual >= 9) {
        return `${añoActual}-${añoActual + 1}`;
    }

    // Si el mes es menor a septiembre, la cosecha es "año anterior - año actual"
    return `${añoActual - 1}-${añoActual}`;
}

export function getCurrentTimeAsTimeSpan(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}:00`;
}

export function getBadgeColorByStatus(status: string): 'default' | 'outline' | 'secondary' | 'outlineYellow' | 'outlineGreen' | 'outlineBlue' | 'outlineOrange' {
  switch (status) { 
    case PENDING: 
      return 'outlineYellow'; 
    case COMPLETED:
      return 'outlineGreen'; 
    case IN_PROCESS:
      return 'outlineBlue';
    default:
      return 'outlineBlue'; 
  }
}

export const isString = (value:any) => typeof value === 'string';
export const isArray = Array.isArray;


type ObjectToSum<T> = {
  [key: string]: T; 
};


export function sumProp<T>(arreglo: ObjectToSum<T>[], propiedad: keyof ObjectToSum<T>): number {
  return arreglo.reduce((acumulador, objetoActual) => {
    return acumulador + (objetoActual[propiedad] as unknown as number); // Convertir a number
  }, 0);
}

export function parseCustomStringToDate(dateString:string) {
  
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  let [hour, minute, second] = timePart.split(':').map(Number);
  const amPm = timePart.slice(-2);

  if (amPm === 'PM' && hour < 12) {
      hour += 12;
  } else if (amPm === 'AM' && hour === 12) {
      hour = 0;
  }
  return new Date(year, month - 1, day, hour, minute, second);
}