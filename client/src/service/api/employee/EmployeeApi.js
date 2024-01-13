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
    }
}