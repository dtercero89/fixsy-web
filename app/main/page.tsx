import { StatsCards } from "@/components/Main/StatCard";
import { ServiceRequestList } from "@/components/Services/ServiceRequestList";
import { fetchServer } from "@/lib/fetchHelper/fetchServer";
import { PaginationURLParams } from "@/ui/controls/pagination-url-parms";



export default async function Page({
  params,
}: {
  params: Promise<{ page?: string, pageSize?:string }>
}) {

  const { page, pageSize } = await params;

  const pageLocal = page ? parseInt(page) : 1
  const pageSizeLocal = pageSize ? parseInt(pageSize) : 10

  const currentPage = page ?? 1;
  const currentPageSize = pageSize ?? 1;

  var jobsSummary = await fetchServer.httpGet(`/jobs/summary`, { });

  const request = {
    page : currentPage,
    pageSize :currentPageSize,
    customerId:0
  }

  var jobsPaged = await fetchServer.httpGet(`/jobs/paged`, request);

  const jobs = jobsPaged ? jobsPaged.items : [];
  const totalPages = jobsPaged ? jobsPaged.totalPages : 1; 

  return (
<div className="flex flex-col h-[92vh] md:h-[94vh] lg:h-[91vh]">
  <div className="container mx-auto p-4 flex-grow">
    <StatsCards inProcessCount={jobsSummary && jobsSummary?.inProcess} pendingCount={jobsSummary && jobsSummary?.pending} />

    <ServiceRequestList jobs={jobs} />
  </div>

  <div className="sticky bottom-0 bg-white shadow-md rounded-sm">
    <PaginationURLParams className="p-1" currentPage={pageLocal} totalPages={totalPages} pageSize={pageSizeLocal} />
  </div>
</div>

  )
}

