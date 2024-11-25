import { cn } from "@/lib/utils"
import * as React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface FractionInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

const FractionInput = React.forwardRef<HTMLInputElement, FractionInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(value);

    React.useEffect(() => {
      setDisplayValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value.replace(/[^\d/]/g, '');
      const parts = newValue.split('/');

      if (parts.length > 2) {
        newValue = parts[0] + '/' + parts[1];
      } else if (parts.length === 1 && newValue.length > 2) {
        newValue = newValue.slice(0, 2) + '/' + newValue.slice(2);
      }

      // Limitar a dos dígitos antes y después de la barra
      if (parts.length === 2) {
        newValue = parts[0].slice(0, 2) + '/' + parts[1].slice(0, 2);
      }

      setDisplayValue(newValue);
      onChange(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        let newValue = displayValue.slice(0, -1);
        if (newValue.endsWith('/')) {
          newValue = newValue.slice(0, -1);
        }
        setDisplayValue(newValue);
        onChange(newValue);
      }
    };

    return (
      <Input
        type="text"
        className={cn("text-center", className)}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={5}
        ref={ref}
        {...props}
      />
    )
  }
)

FractionInput.displayName = "FractionInput"

export { FractionInput, Input }