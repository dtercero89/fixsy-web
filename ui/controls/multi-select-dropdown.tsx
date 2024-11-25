"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { arrayHasItems } from "@/lib/utils";

type MultiSelectDropdownProps = {
  textSize?: string; 
  controlHeight?: string; 
  options: { value: string; label: string }[]; 
  onSelectedValues: (values: string[]) => void;
  placeHolder?: string;
  selectedAreaHeight?: string;
  selectedItems?:string[]
};

export default function MultiSelectDropdown({
  textSize = "text-xs",
  controlHeight = "h-10", 
  options,
  onSelectedValues,
  placeHolder,
  selectedItems,
  selectedAreaHeight = "max-h-20", // Altura predeterminada de la sección seleccionada
}: MultiSelectDropdownProps) {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedValues) {
      onSelectedValues(selectedValues);
    }
  }, [selectedValues]);

  React.useEffect(() => {
      if(selectedItems && arrayHasItems(selectedItems)){
        setSelectedValues(selectedItems);
      }
  },[selectedItems]);

  const toggleOption = (value: string) => {
    setSelectedValues((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild className={clsx(
              selectedAreaHeight, "text-xs"
            )}>
        <button
          className={clsx(
            "flex w-full items-start justify-between rounded border border-gray-300 bg-white px-3 py-2 shadow-sm hover:bg-gray-50 focus:outline-none text-xs",
            textSize,
            controlHeight
          )}
          aria-expanded={open}
        >
          <div
            className={clsx(
              "flex flex-wrap gap-1 overflow-auto text-xs", 
              "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            )}
          >
            {selectedValues.length > 0 ? (
              selectedValues.map((value) => (
                <span
                  key={value}
                  className={clsx(
                    "inline-block rounded bg-blue-100 px-2 py-0.5 text-ellipsis whitespace-nowrap overflow-hidden text-xs",
                    textSize
                  )}
                >
                  {options.find((item) => item.value === value)?.label}
                </span>
              ))
            ) : (
              <span className={clsx("text-gray-500", textSize)}>
                {placeHolder && placeHolder}
              </span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
        </button>
      </Popover.Trigger>
      <Popover.Content
        className="w-64 rounded h-64 border border-gray-300 bg-white p-2 shadow-md overflow-auto "
        sideOffset={4}
      >
        <div className="max-h-60 space-y-2">
          {options.map((item) => (
            <button
              key={item.value}
              onClick={() => toggleOption(item.value)}
              className={clsx(
                "flex w-full items-center space-x-2 rounded px-3 py-2 hover:bg-gray-100 focus:outline-none text-xs",
                selectedValues.includes(item.value) && "bg-gray-100 text-gray-800",
                textSize
              )}
            >
              <div
                className={clsx(
                  "flex h-4 w-4 items-center justify-center rounded border text-xs",
                  selectedValues.includes(item.value)
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300"
                )}
              >
                {selectedValues.includes(item.value) && (
                  <Check className="h-3 w-3" />
                )}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
