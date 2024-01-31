import axios from "axios"
import { handleError, handleResponse } from "../../axios/response"
import AxiosInstance from "../../axios/SetupAxios"

export const EmployeeApi={
    login: async(data)=>{
         try
         {
          const response=await AxiosInstance.post('/employee/login',data);
          return handleResponse(response)
         }catch(error)
         {  
             handleError(error)
         }
    },
    getAllTicketsforEmployee:async(employeeId)=>{
        try
        {
         const response=await AxiosInstance.get(`/tickets/employee/${employeeId}`);
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
   },
   getDashBoardData:async(id)=>{
    try
    {
     const response=await AxiosInstance.get(`/employeedashboard/${id}`);
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