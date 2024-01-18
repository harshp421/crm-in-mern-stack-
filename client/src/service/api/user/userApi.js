import axios from "axios"
import { handleError, handleResponse } from "../../axios/response"
import AxiosInstance from "../../axios/SetupAxios"

export const userApi={
    createTicket: async(data)=>{
        console.log(data,"ticletdata");
         try
         {
          const response=await AxiosInstance.post('/tickets',data);
          return handleResponse(response)
         }catch(error)
         {  
             handleError(error)
         }
    },
    getTickets:async(clientId)=>{
        try
        {
         const response=await AxiosInstance.get(`/tickets/${clientId}`);
         return handleResponse(response)
        }catch(error)
        {  
            handleError(error)
        }
    }
}