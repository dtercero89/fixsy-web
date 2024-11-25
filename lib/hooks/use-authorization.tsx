'use client';

import { useSession } from 'next-auth/react';
import { isNullOrEmpty } from '../utils';


export const useAuthorization = () => {
  const { data: session } = useSession();

  return (securityName: string): boolean => {
    
    if(!securityName || isNullOrEmpty(securityName)){
      return true;
    }

    const permissions = session?.user?.permissions;
    return Array.isArray(permissions) ? permissions.includes(securityName) : false;
  };
};