import React from 'react';

interface LabeledFieldProps {
  label: string;
  value: string;
  labelSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  valueSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  fontFamily?: 'sans' | 'serif' | 'mono';
}

export default function LabeledField({ 
  label, 
  value, 
  labelSize = 'xs', 
  valueSize = 'xs', 
  fontFamily = 'sans' 
}: LabeledFieldProps) {
  const labelSizeClass = `text-${labelSize}`;
  const valueSizeClass = `text-${valueSize}`;
  const fontFamilyClass = `font-${fontFamily}`;

  return (
    <div className={`mb-4 ${fontFamilyClass}`}>
      <label className="block">
        <span className={`font-bold mb-1 block ${labelSizeClass}`}>{label}</span>
        <span className={`block pb-1 ${valueSizeClass}`}>{value}</span>
      </label>
    </div>
  );
}