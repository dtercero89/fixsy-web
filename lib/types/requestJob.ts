export class RequestJob {
   jobId:number = 0;
   customerId: number = 0;
   title: string = "";
   description: string = "";
   preferredSchedule: string = "";
   preferredScheduleDate: Date = new Date();
   requirements:string = "";
   serviceId: number =0;
   serviceName: string = "";
   supplierName: string = "";
   supplierPhoneNumber: string = "";
   supplierEmail: string = "";
   assignedAt: Date | null = null;
   createdAt: Date = new Date();


}