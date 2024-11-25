import { useFetchClient } from "../hooks/use-fetch-client";

export const useJobsActions = () => {

    const {  httpGet,httpPut } = useFetchClient();

    const fetchJobsPagedAsync = async (request: any): Promise<any> => {
        if (request) {
            try {
                const response = await httpGet('/jobs/paged', request,false);
                return response;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        } else {
            console.warn("Request object is not defined.");
            return [];
        }
    };

    
    const fetchCompleteRequestedServicesAsync = async (request: any): Promise<any> => {
        if (request) {
            try {
                const response = await httpPut('/jobs/complete', request,false);
                return response;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        } else {
            console.warn("Request object is not defined.");
            return [];
        }
    };

    const fetchUpdateRequestedServicesAsync = async (request: any): Promise<any> => {
        if (request) {
            try {
                const response = await httpPut('/jobs/update', request,false);
                return response;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        } else {
            console.warn("Request object is not defined.");
            return [];
        }
    };
    
    return {
        fetchJobsPagedAsync,
        fetchCompleteRequestedServicesAsync,
        fetchUpdateRequestedServicesAsync
        ,
      };
}

