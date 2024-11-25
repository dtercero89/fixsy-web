'use client';

import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/ui/controls/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormError } from './form-error';
import FormInputField from '@/ui/controls/form-input-field';
import { RegisterCustomerInputs } from '@/lib/definitions';
import { useAuthActions } from '@/lib/actions/auth';
import { RegisterSchema } from '@/lib/schema';
import { FormSuccess } from './form-success';
import { isNullOrEmpty } from '@/lib/utils';

export default function RegisterForm() {
  const [validationMessages, setValidationMessages] = useState<string>();
  const [successMessages, setSuccessMessages] = useState<string>();
  const [registerFormData, setRegisterFormData] =
    useState<RegisterCustomerInputs>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const { fetchRegisterUserAsync } = useAuthActions();

  const processForm: SubmitHandler<RegisterCustomerInputs> = async (data) => {
    setValidationMessages('');
    setSuccessMessages('');

    const request = {
      user: {...data, isCustomer:true},
    };

    const response = await fetchRegisterUserAsync(request);

      if (response && !isNullOrEmpty(response.validationErrorMessage)) {
         setValidationMessages(response.validationErrorMessage);
         return;
      }

      if (response && !isNullOrEmpty(response.successMessage)) {
        setSuccessMessages(response.successMessage);
        reset();
        return;
     }
  };

  async function onSubmitForm(event: any) {
    event.preventDefault();
    await handleSubmit(processForm)();
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterCustomerInputs>({
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <form onSubmit={onSubmitForm}>
      <div className="rounded-md bg-gray-50 p-1 md:p-6">
        <div className="mb-2">
          <FormInputField
            errorMessage={errors.name?.message}
            fieldName="name"
            label="Name"
            type="text"
            key="regF-name"
            defaultValue={registerFormData && registerFormData.name}
            placeholder="Enter your name"
            register={register}
          />

          <FormInputField
            errorMessage={errors.phoneNumber?.message}
            fieldName="phoneNumber"
            label="Phone Number"
            type="number"
            key="regF-phoneNumberReg"
            defaultValue={registerFormData && registerFormData.name}
            placeholder="Enter your phone number"
            register={register}
          />

          <FormInputField
            errorMessage={errors.email?.message}
            fieldName="email"
            label="Email"
            type="email"
            key="regF-email"
            defaultValue={registerFormData && registerFormData.email}
            placeholder="Enter your email"
            register={register}
          />

          <FormInputField
            errorMessage={errors.address?.message}
            fieldName="address"
            label="Address"
            type="text"
            key="regF-addressReg"
            defaultValue={registerFormData && registerFormData.name}
            placeholder="Enter your address"
            register={register}
            multiLine
          />

          <FormInputField
            errorMessage={errors.password?.message}
            fieldName="password"
            label="Password"
            type="password"
            key="regF-pasw"
            defaultValue={registerFormData && registerFormData.password}
            placeholder="Enter your password"
            register={register}
          />

          <FormInputField
            errorMessage={errors.password?.message}
            fieldName="passwordConfirm"
            label="Confirm Password"
            type="password"
            key="regF-pasw-confirm"
            defaultValue={registerFormData && registerFormData.passwordConfirm}
            placeholder="Enter your password"
            register={register}
          />
        </div>
      </div>

      {!isNullOrEmpty(validationMessages) && (
        <Suspense>
         <FormError key="formErrorRegister" message={validationMessages} />
        </Suspense>
      )}

      {!isNullOrEmpty(successMessages) && (
        <Suspense>
          <FormSuccess key="formSuccessRegister" message={successMessages} />
        </Suspense>
      )}

      <div className="flex justify-end gap-4">
        <Link
          href="/auth/login"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button className="flex w-auto items-center justify-center space-x-1 rounded-md bg-[#017269] px-2 py-1 text-xs font-bold text-white transition duration-300 hover:bg-slate-300 hover:text-[#017269] sm:space-x-2 sm:px-4 sm:py-2 sm:text-sm md:text-base">
          Sign up
        </Button>
      </div>
    </form>
  );
}
