import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface FormProps {
  message?: string;
};

export const FormSuccess = ({
  message,
}: FormProps) => {
  if (!message) return null;

  return (
    <div>
    <div className="bg-green-900 text-slate-50 p-2 mt-2 rounded-md flex items-center gap-x-2 text-sm text-destructive">
       <CircleCheck className="h-4 w-4" />
      <p>{message}</p>
    
    </div>
        <Link className="flex text-blue-500 hover:underline px-2 text-xs md:text-sm justify-center" href="/auth/login">Sign in</Link>
    </div>

  );
};
