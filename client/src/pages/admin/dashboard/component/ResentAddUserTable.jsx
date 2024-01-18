import React, { useEffect, useState } from "react";

import {
  Button,

} from "@mui/material";
import { AdminApi } from "../../../../service/api/admin/AdminApi";
import CustomTable from "../../../../components/CustomTable";
import { convertDateToDateWithoutTime } from "../../../../utils/calendarHelpers";


const ResentAddUserTable = ({title,dawnloadName}) => {
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
    <CustomTable
              columns={columns}
              data={userData}
              title={title}
              downloadName={dawnloadName}
            />
  )
}

export default ResentAddUserTable