'use client';

import { ReactNode } from 'react';
import MainLayout from '@/components/Main/MainLayout';
import { customerMenuItems } from '@/components/Main/settings';


export default function MainAdmin({ children }: { children: ReactNode }) {
    return (
      <MainLayout rootPath='customer' menuItems={customerMenuItems}>
          {children}
      </MainLayout>)
}
