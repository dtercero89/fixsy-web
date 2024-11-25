'use client';

import { ReactNode } from 'react';
import MainLayout from '@/components/Main/MainLayout';
import { adminMenuItems } from '@/components/Main/settings';


export default function MainAdmin({ children }: { children: ReactNode }) {
  return(  <MainLayout rootPath='main'  menuItems={adminMenuItems}>
        {children}
      </MainLayout>)
}
