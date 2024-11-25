"use client"

import { TooltipProps } from "recharts"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/controls/card"

const CustomTooltip = ({
  active,
  payload,
  label,
  config,
}: TooltipProps<number, string> & { config?: Record<string, any> }) => {
  if (active && payload && payload.length) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          {payload.map((item:any, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium">
                {config?.[item.dataKey]?.label || item.dataKey}:{" "}
              </span>
              <span className="text-sm font-bold ml-1">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return null
}

export function ChartContainer({
  children,
  config,
  ...props
}: {
  children: any
  config?: Record<string, any>
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export function ChartTooltip({ config, ...props }: TooltipProps<number, string> & { config?: Record<string, any> }) {
  return <Tooltip content={<CustomTooltip config={config} {...props} />} />
}

export function ChartTooltipContent({ config, ...props }: TooltipProps<number, string> & { config?: Record<string, any> }) {
  return <CustomTooltip config={config} {...props} />
}