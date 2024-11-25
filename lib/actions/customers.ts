import { useFetchClient } from "../hooks/use-fetch-client";
import { utils } from "../utils/index";

export const useCustomersActions = () => {

  const { httpPost } = useFetchClient();

  const fetchPublishRequestService = async (request: any): Promise<any> => {
    if (request) {
      try {
        
        const response = await httpPost('/customer', request);

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
    fetchPublishRequestService}
};