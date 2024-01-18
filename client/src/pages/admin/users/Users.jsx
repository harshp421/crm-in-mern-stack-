import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { convertDateToDateWithoutTime } from "../../../utils/calendarHelpers";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "@mui/icons-material";
import { AdminApi } from "../../../service/api/admin/AdminApi";

const Users = () => {
 
 
  const [userData,setUserData] =useState();

  useEffect(()=>{
    AdminApi.showAllUser().then((res)=>{
          if(res.status===200)
          { 
              setUserData(res.data)
          }else
          {
             toast.error("Error While Fetch Data");
          }
    })
},[])
const columns = [
  { label: "Name", name: "name" },
  { label: "Email", name: "email" },
  {label:"Role",name:"role"},
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
    name: "url",
    label: "Actions",
    options: {
      customBodyRender: (tableMeta) => (
        <Button
          variant="contained"
          size="small"
          // onClick={() => {
          //   setIndex(tableMeta?.rowIndex);
          //   setOpen(true);
          // }}
        >
          View
        </Button>
      ),
    },
  },
];

  return (
    <>
      <Link to="add-user">
        <Button variant="contained" sx={{ marginLeft: "auto" }}>
          <AddIcon /> Add User
        </Button>
      </Link>

      <CustomTable
        columns={columns}
        data={userData}
        title="Contacts"
        downloadName="contacts"
      />
    </>
  );
};

export default Users;
