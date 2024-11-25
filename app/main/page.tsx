import { StatsCards } from "@/components/Main/StatCard";
import { ServiceRequestList } from "@/components/Services/ServiceRequestList";
import { fetchServer } from "@/lib/fetchHelper/fetchServer";
import { PaginationURLParams } from "@/ui/controls/pagination-url-parms";

export default async function DashboardPage(
  { searchParams }: { searchParams: { page?: string, pageSize?:string } }
) {

  const page = searchParams.page;
  const pageSize = searchParams.pageSize;

  const currentPage = parseInt(page || '1', 10);
  const currentPageSize = parseInt(pageSize|| '10', 10);


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
    <PaginationURLParams className="p-1" currentPage={currentPage} totalPages={totalPages} pageSize={currentPageSize} />
  </div>
</div>

  )
}

