import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { convertDateToDateWithoutTime } from "../../../utils/calendarHelpers";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Add as AddIcon } from "@mui/icons-material";
import { AdminApi } from "../../../service/api/admin/AdminApi";
import toast from "react-hot-toast";

const Users = () => {
  const [userData, setUserData] = useState();

  const columns = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email" },
    { label: "Role", name: "role" },
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
  useEffect(() => {
    AdminApi.showAllEmployee().then((res) => {
      if (res.status === 200) {
        setUserData(res.data);
      } else {
        toast.error("Error While Fetch Data");
      }
    });
  }, []);

  return (
    <>
      <Link to="add-user">
        <Button variant="contained" sx={{ marginLeft: "auto" }}>
          <AddIcon /> Add Employee
        </Button>
      </Link>

      <CustomTable
        columns={columns}
        data={userData}
        title="Employee"
        downloadName="employee"
      />
    </>
  );
};

export default Users;
