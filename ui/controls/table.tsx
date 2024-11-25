import * as React from "react"
import { cn } from "@/lib/utils"
import { Edit, Trash2 } from "lucide-react"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary font-medium text-primary-foreground", className)}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}


export interface TableControlColumn {
  header: string;
  accessor: string;
  hiddenAt?: string[]; // Por ejemplo: ['md', 'lg', 'xl']
  onRender?: (item: any) => React.ReactNode; 
  width?: string; 
  includeInExcel?: boolean;
}

interface TableControlProps {
  data: any[];
  columns: TableControlColumn[];
}


const onRenerContent =(row:any, column:any) => {
  if(row){
    if(row[column.onRender]){
      return row[column.onRender()];
    }
    return row[column.accessor];
  }
  
}

const TableControl = ({ data, columns }:TableControlProps) => {
  return (
    <Table className="min-w-full bg-white">
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <th key={index} className="px-4 py-2"   style={{
              width: col.width ? col.width : 'auto',
              minWidth: col.width ? col.width : 'auto',
              maxWidth: col.width ? col.width : 'auto',
            }}>
              {col.header}
            </th>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.map((item, index) => (
          <TableRow key={index} className="border-t" >
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex} className="px-4 py-2 text-black"   style={{
                width: col.width ? col.width : 'auto',
                minWidth: col.width ? col.width : 'auto',
                maxWidth: col.width ? col.width : 'auto',
              }}>
                {col.onRender ? col.onRender(item) : item[col.accessor]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


export default TableControl;
