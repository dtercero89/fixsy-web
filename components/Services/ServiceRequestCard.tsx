import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/controls/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/controls/avatar"
import { Badge } from "@/ui/controls/badge"
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'
import { formatDate, getBadgeColorByStatus } from "@/lib/utils"
import ServiceRequestCardActions from "./ServiceRequestCardActions"

export interface ServiceRequestProps {
  jobId: number
  title: string
  description: string
  requirements: string
  status: string
  preferredSchedule: string
  createdAt: string
  customerName: string
  supplierName: string | null
  assignedAt: string
  completedAt: string | null
  notes: string | null
  supplierId: number | null
  serviceName: string | null
}

export function ServiceRequestCard({
  jobId,
  title,
  description,
  requirements,
  status,
  preferredSchedule,
  createdAt,
  customerName,
  supplierName,
  assignedAt,
  completedAt,
  notes
}: ServiceRequestProps) {

  return (
    <Card className="w-full h-full flex flex-col border-1 rounded-sm max-h-[30vh]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${customerName}`} />
              <AvatarFallback>{customerName && customerName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">Customer: {customerName}</p>
            </div>
          </div>
          <Badge variant={getBadgeColorByStatus(status)}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow text-slate-600">
        <p className="mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center">
            <ClockIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">Preferred Schedule: {preferredSchedule}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">Created at: {formatDate(new Date(createdAt))}</span>
          </div>
          {supplierName && (
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span className="text-sm">Assigned to: {supplierName}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <ServiceRequestCardActions status={status} jobId={jobId}/>
      </CardFooter>
    </Card>
  )
}

