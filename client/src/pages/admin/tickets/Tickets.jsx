import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { userApi } from "../../../service/api/user/userApi";
import useGetuserData from "../../../Hooks/useGetuserData";
import { convertDateToDateWithoutTime } from "../../../utils/calendarHelpers";
import { AdminApi } from "../../../service/api/admin/AdminApi";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
       
          const response = await AdminApi.getAllTickets();
          const updatedTickets = response.data.message.map((ticket) => {
            const mergedTicket = { ...ticket };
            
            if (ticket.client) {
              // Merge client properties without overriding ticket properties
              Object.keys(ticket.client).forEach((key) => {
                if (!mergedTicket[key]) {
                  mergedTicket[key] = ticket.client[key];
                }
              });
            }
          
            return mergedTicket;
          });
        console.log(updatedTickets,"updated ticket");
          setTickets(updatedTickets);
          setLoading(false);

      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };
  
    fetchTickets();
  }, []); 
  
  
  // The dependency array now includes user, so it runs whenever user changes
 
  const columns = [
    {
      label: "Customer-Name",
      name: "name",
    },
    {
      label: "Customer-Email",
      name: "email",
    },
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
    { label: "priority", name: "priority" },
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
              navigate(`/admin-dashboard/tickets/${tableMeta}`)
            }}
          >
            View
          </Button>
         
        ),
      },
    },
  ];
  return (
    <React.Fragment>
       <Link to="add-tickets">
        <Button variant="contained" sx={{ marginLeft: "auto" }}>
          <AddIcon /> Add Tickets
        </Button>
      </Link> 
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CustomTable columns={columns} data={tickets} title="Tickets" />
      )}
    </React.Fragment>
  );
};

export default Tickets;
