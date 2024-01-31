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
    addUser:async(data,resource,additionalParam="")=>{
        try {
            console.log(data,resource,additionalParam)
            let response;
            if (additionalParam === "") {
              response = await AxiosInstance.post(`${resource}`, data);
            } else {
              response = await AxiosInstance.post(
                `/${resource}/${additionalParam}`,
                data,
              );
            }
            return handleResponse(response);
          } catch (error) {
            return handleError(error);
          }
    },
  
    showAllEmployee:async()=>{
 
      try
      {
        const responce=await AxiosInstance.get("/admindashboard/employee");
        return responce;
       }catch(error)
      {
        return handleError(error);
      }
    },
    updateUser: async (userId, data) => {
      try {
        const response = await AxiosInstance.put(`/user/${userId}`, data);
        return handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },
  
    showAllUser:async()=>{
      try
      {
        const responce=await AxiosInstance.get("/admindashboard/users");
        return responce;
       }catch(error)
      {
        return handleError(error);
      }
    },
    getUserById: async (userId) => {
      try {
        const response = await AxiosInstance.get(`/admindashboard/user/${userId}`);
        return handleResponse(response);
      } catch (error) {
        return handleError(error);
      }
    },
   
    getAllTickets:async()=>{
      try
      {
       const response=await AxiosInstance.get(`/tickets`);
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
   const response=await AxiosInstance.put(`/tickets/${id}`,data);
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
,
getDashBoardData:async()=>{
  try
  {
   const response=await AxiosInstance.get("/admindashboard");
   return handleResponse(response)
  }catch(error)
  {  
      handleError(error)
  }
}
}