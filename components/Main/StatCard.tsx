import { Card, CardContent, CardHeader, CardTitle } from "@/ui/controls/card"
import { ClipboardList, Clock } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card className="border-0 rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-slate-600">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

export function StatsCards({
    inProcessCount,
    pendingCount
}:{
    inProcessCount:number,
    pendingCount:number
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Pending Services"
        value={pendingCount}
        icon={<ClipboardList className="h-6 w-6 text-yellow-900" />}
        color="bg-yellow-100"
      />
      <StatCard
        title="Services In Process"
        value={inProcessCount}
        icon={<Clock className="h-6 w-6 text-blue-900" />}
        color="bg-blue-100"
      />
    </div>
  )
}

