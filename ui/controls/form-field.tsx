import { Label } from "./label";

export const FormField = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      {children}
    </div>
  );