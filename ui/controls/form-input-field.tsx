interface FormInpitFieldProps {
  type: string;
  fieldName: string;
  errorMessage: string | undefined;
  placeholder: string;
  required?: boolean | false;
  label: string;
  icon?: any | undefined;
  register: ReturnType<any>['register'];
  defaultValue?: string | number | undefined;
  onBlur?: (value: any) => void;
  multiLine?: boolean;
}

export default function FormInputField({
  type,
  fieldName,
  errorMessage,
  placeholder,
  required,
  label,
  icon,
  register,
  defaultValue,
  onBlur,
  multiLine = false,
}: FormInpitFieldProps) {

  return (
    <div className="mb-3 md:mb-4">
      <label
        htmlFor={fieldName}
        className="ml-1 block text-xs font-medium md:text-sm mb-1"
      >
        {label}
      </label>

      <div className="relative">
        {multiLine ? (
          <textarea
            id={fieldName}
            type={type}
            defaultValue={defaultValue}
            {...register(fieldName)}
            placeholder={placeholder}
            required={required}
            onBlur={onBlur}
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
          />
        ) : (
          <input
            className="peer block w-full rounded-md border border-gray-200 py-2 text-xs outline-2 placeholder:text-gray-500 md:text-sm"
            id={fieldName}
            type={type}
            defaultValue={defaultValue}
            {...register(fieldName)}
            placeholder={placeholder}
            required={required}
            onBlur={onBlur}
          />
        )}

        {icon}
      </div>

      <div id="customer-error" aria-live="polite" aria-atomic="true">
        <p className="ml-1 text-xs text-red-400">{errorMessage}</p>
      </div>
    </div>
  );
}
