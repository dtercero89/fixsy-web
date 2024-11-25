
'use client'
import { Input } from "@/ui/controls/input"
import * as z from "zod";
import { Button } from "@/ui/controls/button"
import { KeyRound, LockIcon, UserIcon } from 'lucide-react'
import { FormEvent, startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/auth/actions";
import { FormError } from "./form-error";
import Link from "next/link";
import { Label } from "@/ui/controls/label";
import { LoginSchema, LoginSchemaNew } from "@/lib/schema";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

const LoginForm = ()=>{
  const [error, setError] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const user = useCurrentUser();

  function parseFormDataToLoginSchema(formData: FormData): z.infer<typeof LoginSchemaNew> {
    const userId = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    const userInfoData = { userId, password };
    const userInfo = LoginSchemaNew.parse(userInfoData);
  
    return userInfo;
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    const formData = new FormData(event.currentTarget);
    const values = parseFormDataToLoginSchema(formData);

    startTransition(async () => {
      try {
        const result = await login(values, callbackUrl);
        
        if (result?.error) {
          setError(result.error);
        } else if (result?.url) {

          router.push(result.url);
        } else if (result?.success) {

          router.push('/');
          
        }
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        setError("No se logró conectar con el servidor. Por favor, contacte al administrador del sistema.");
      }
    });
  }

  return (
        <form onSubmit={onSubmit}
                 className="space-y-3 sm:space-y-4 md:space-y-5">
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="email" className="block text-xs sm:text-sm md:text-base font-medium text-gray-700">{'Email'}</label>
          <div className="relative">
            <UserIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              id="email"
              name="email"
              type="text"
              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017269] focus:border-transparent transition duration-200"
              placeholder={'user@mail.com'}
            /> 
          </div>
        </div>
        <div className="space-y-1 sm:space-y-2">
          <label htmlFor="password" className="block text-xs sm:text-sm md:text-base font-medium text-black">{'Password'}</label>
          <div className="relative">
            <LockIcon className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              id="password"
              name="password"
              type="password"
              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1 sm:py-2 text-xs sm:text-sm md:text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#017269] focus:border-transparent transition duration-200"
              placeholder="enter your password"
            />
          </div>
        </div>
        
        <Button className="w-full bg-[#017269] hover:bg-slate-300 hover:text-[#017269] text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-md transition duration-300 text-xs sm:text-sm md:text-base flex items-center justify-center space-x-1 sm:space-x-2">
          <KeyRound className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>Log in</span>
        </Button>

       
        <div>

        <Label className="font-normal text-xs md:text-sm">
        Do not have an account yet?
        </Label>
        <Link className='text-blue-500 hover:underline px-2 text-xs md:text-sm' href="/auth/register">
        Sign up!
        </Link>
        </div>

        

        <FormError message={error}/>
      </form>
    );
}

export default LoginForm;