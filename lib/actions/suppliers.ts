import { useFetchClient } from "../hooks/use-fetch-client";
import { utils } from "../utils/index";

export const useSupplierActions = () => {

  const { httpGet, httpPost } = useFetchClient();

  const fetchGetSuppliersAsync = async (request: any): Promise<any> => {
    if (request) {
        try {
            const response = await httpGet('/suppliers', request,false);
            return response;
        } catch (error) {
            console.error("Error fetching suppliers:", error);
            throw error;
        }
    } else {
        console.warn("Request object is not defined.");
        return null;
    }
};

const fetchGetSuppliersPagedAsync = async (request: any): Promise<any> => {
  if (request) {
      try {
          const response = await httpGet('/suppliers/paged', request,false);
          return response;
      } catch (error) {
          console.error("Error fetching suppliers:", error);
          throw error;
      }
  } else {
      console.warn("Request object is not defined.");
      return null;
  }
};



  const fetchCreateSupplier = async (request: any): Promise<any> => {
    if (request) {
      try {
        
        const response = await httpPost('/suppliers', request);

        if(utils.isResponseSucceeded(response)) {
          return response;
        }

      } catch (error) {
        console.error("Error creating suppliers:", error);
        throw error;
      }
    }
};


  return {
    fetchCreateSupplier,
    fetchGetSuppliersAsync,
    fetchGetSuppliersPagedAsync
  };
};