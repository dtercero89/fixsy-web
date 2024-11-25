import { useFetchClient } from "../hooks/use-fetch-client";

export const useAuthActions = () => {

  const { httpPost } = useFetchClient();

  const fetchRegisterUserAsync = async (request: any): Promise<any> => {
    if (request) {
        try {
            const response = await httpPost('/users', request,true,false);
            return response;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    } else {
        console.warn("Request object is not defined.");
        return null;
    }
};


  return {
    fetchRegisterUserAsync
  };
};