import { useFetchClient } from "../hooks/use-fetch-client";
import { utils } from "../utils/index";

export const useServicesActions = () => {

  const { httpGet } = useFetchClient();

  const fetchServices = async (request: any): Promise<any> => {
    if (request) {
      try {
        
        const response = await httpGet('/services', request);

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
    fetchServices}
};