import React, { useEffect, useState } from "react";

import {
  Button,

} from "@mui/material";
import { AdminApi } from "../../../../service/api/admin/AdminApi";
import CustomTable from "../../../../components/CustomTable";
import { convertDateToDateWithoutTime } from "../../../../utils/calendarHelpers";
import { useNavigate } from "react-router-dom";


const ResentComplateTicket = ({title,dawnloadName,Data}) => {
   const navigate=useNavigate();

  const columns = [

    {
      label: "Ticket-Title",
      name: "title",
    },
    {
      label: "desc",
      name: "desc",
    },
    {
      label: "category",
      name: "category",
    },
    { label: "Status", name: "status" },
    { 
      label: "priority", 
      name: "priority"
        
    },
    {
      label: "Created At",
      name: "date",
      options: {
        customBodyRender: (data) => (
          <span>{convertDateToDateWithoutTime(data)}</span>
        ),
      },
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (tableMeta) => (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              navigate(`/employee-dashboard/tickets/${tableMeta}`)
            }}
          >
            View
          </Button>
         
        ),
      },
    },
  ];
  return (
    <CustomTable
              columns={columns}
              data={Data}
              title={title}
              downloadName={dawnloadName}
            />
  )
}

export default ResentComplateTicket