type ColumnsConfig = {
  default?: number; // Para dispositivos pequeños
  sm?: number;      // Para dispositivos pequeños a medianos
  md?: number;      // Para dispositivos medianos
  lg?: number;      // Para dispositivos grandes
  xl?: number;      // Para dispositivos extra grandes
};

export const FormSection = ({
  title,
  children,
  columns = { default: 1, sm: 1, md: 2, lg: 4 }, // Valores por defecto,
  isAuthorized = true,
  hideWhenUnauthorized = false,
  
}: {
  title?: string;
  children: React.ReactNode;
  columns?: ColumnsConfig;
  isAuthorized?: boolean;
  hideWhenUnauthorized?: boolean; 
}) => {
  const columnsClass = `
    grid
    grid-cols-${columns.default ?? 1} 
    ${columns.sm ? `sm:grid-cols-${columns.sm}` : ""}
    ${columns.md ? `md:grid-cols-${columns.md}` : ""}
    ${columns.lg ? `lg:grid-cols-${columns.lg}` : ""}
    ${columns.xl ? `xl:grid-cols-${columns.xl}` : ""}
    gap-1
  `;

  if (hideWhenUnauthorized && !isAuthorized) {
    return null;
  }


  return (
    <div  className={`mt-0 p-2 border rounded ${
                isAuthorized ? '' : 'border-gray-300 pointer-events-none opacity-50'
    }`}>
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>} 
      <div className={columnsClass}>
        {children}
      </div>
    </div>
  );
};
