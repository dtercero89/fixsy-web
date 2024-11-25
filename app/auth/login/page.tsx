import React from 'react'
import Image from 'next/image'
import LoginForm from '@/components/Login/LoginForm';
import { Card } from '@/ui/controls/card';
import Link from 'next/link';

export default async function LoginScreen() {
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-[#017269] to-black p-4 sm:p-6 md:p-8">
      <div className="relative w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="absolute inset-0 bg-white/30 blur-3xl rounded-full"></div>
        <Card className="w-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white/95 backdrop-blur-md rounded-lg shadow-2xl relative z-10 border-2 border-[#017269]/20">
          <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="relative w-28 h-12 sm:w-32 sm:h-16 md:w-48 md:h-24 lg:w-64 lg:h-32 mb-2 sm:mb-4">
             <Link href="/">
              <Image
                src="/images/fixsy.png"
                alt="Fixsy Logo"
                layout="fill"
                objectFit="contain"
              />
              </Link>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#017269] mb-1 sm:mb-2">Welcome</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center">Log in to continue</p>
          </div>
          
          <LoginForm />
          
          <div className="mt-4 sm:mt-6 flex items-center justify-between">
          </div>
      
        </Card>
      </div>
    </div>
  )
}
