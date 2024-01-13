import axios from "axios"
import { handleError, handleResponse } from "../../axios/response"
import AxiosInstance from "../../axios/SetupAxios"

export const AdminApi={
    login: async(data)=>{
         try
         {
          const response=await AxiosInstance.post('/admin/login',data);
          return handleResponse(response)
         }catch(error)
         {  
             handleError(error)
         }
    },
    addUser:async(data,additionalParam="",resource)=>{
        try {
            let response;
            if (additionalParam === "") {
              response = await axios.post(`${resource}`, data);
            } else {
              response = await axios.post(
                `/${resource}/${additionalParam}`,
                data,
              );
            }
            return handleResponse(response);
          } catch (error) {
            return handleError(error);
          }
    }
}