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
    },
    getDashBoardData:async(userId)=>{
        try
        {
         const response=await AxiosInstance.get(`/users/ticket/${userId}`)
         return handleResponse(response)
        }catch(error)
        {  
            handleError(error)
        }
      },
      getTicketById:async(id)=>{
        try
        {
         const response=await AxiosInstance.get(`/tickets/view/${id}`);
         return handleResponse(response)
        }catch(error)
        {  
            handleError(error)
        }
    },
    updateTicket:async(data,id)=>{
        try
        {
         const response=await AxiosInstance.put(`/tickets/employee/${id}`,data);
         return handleResponse(response)
        }catch(error)
        {  
            handleError(error)
        }
       },
       sendTicketMessage:async(id,values)=>{
        try
        {
         const response=await AxiosInstance.put(`/tickets/${id}/message`,values);
         return handleResponse(response)
        }catch(error)
        {  
            handleError(error)
        }
       }
}