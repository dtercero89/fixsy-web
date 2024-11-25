import { CircleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
};

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-500 text-slate-50 p-1 mb-2 rounded-md flex items-center gap-x-2 text-sm text-destructive">
       <CircleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
