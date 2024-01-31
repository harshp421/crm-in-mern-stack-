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
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (tableMeta) => (
    
          <Button variant="contained" sx={{ marginLeft: "auto" }}>
             view
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


// import React, { useEffect, useState } from "react";
// import CustomTable from "../../../components/CustomTable";
// import { convertDateToDateWithoutTime } from "../../../utils/calendarHelpers";
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import { Link } from "react-router-dom";
// import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import { AdminApi } from "../../../service/api/admin/AdminApi";
// import toast from "react-hot-toast";

// const Users = () => {
//   const [userData, setUserData] = useState([]);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const columns = [
//     { label: "Name", name: "name" },
//     { label: "Email", name: "email" },
//     { label: "Role", name: "role" },
//     {
//       label: "Created At",
//       name: "date",
//       options: {
//         customBodyRender: (data) => (
//           <span>{convertDateToDateWithoutTime(data)}</span>
//         ),
//       },
//     },
//     {
//       name: "url",
//       label: "Actions",
//       options: {
//         customBodyRender: (tableMeta) => (
//           <>
//             <Button
//               variant="contained"
//               size="small"
//               onClick={() => handleViewButtonClick(tableMeta)}
//             >
//               View
//             </Button>
//             <Button
//               variant="contained"
//               size="small"
//               onClick={() => handleDeleteButtonClick(tableMeta)}
//             >
//               Delete
//             </Button>
//           </>
//         ),
//       },
//     },
//   ];

//   const handleViewButtonClick = (tableMeta) => {
//     // Handle view button click, you can implement this logic
//   };

//   const handleDeleteButtonClick = (tableMeta) => {
//     setDeleteDialogOpen(true);
//     setSelectedRow(tableMeta.rowData);
//   };

//   const handleDeleteConfirmed = async () => {
//     console.log("op")
//     try {
//       // Assuming 'id' is the unique identifier for your rows
//       const rowId = selectedRow[/* index of id in your data */];
//       await AdminApi.deleteEmployee(rowId);
      
//       // Update the state to reflect the changes
//       setUserData((prevData) => {
//         const newData = [...prevData];
//         const rowIndex = newData.findIndex(row => row.id === rowId);
//         newData.splice(rowIndex, 1);
//         return newData;
//       });

//       toast.success("Row deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting row:", error);
//       toast.error("Error deleting row.");
//     } finally {
//       setDeleteDialogOpen(false);
//     }
//   };

//   const handleDeleteCancelled = () => {
//     setDeleteDialogOpen(false);
//     setSelectedRow(null);
//   };

//   useEffect(() => {
//     AdminApi.showAllEmployee().then((res) => {
//       if (res.status === 200) {
//         setUserData(res.data);
//       } else {
//         toast.error("Error While Fetching Data");
//       }
//     });
//   }, []);

//   return (
//     <>
//       <Link to="add-user">
//         <Button variant="contained" sx={{ marginLeft: "auto" }}>
//           <AddIcon /> Add Employee
//         </Button>
//       </Link>

//       <CustomTable
//         columns={columns}
//         data={userData}
//         title="Employee"
//         downloadName="employee"
//       />

//       <Dialog open={deleteDialogOpen} onClose={handleDeleteCancelled}>
//         <DialogTitle>Delete Row</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this row?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteCancelled}>No</Button>
//           <Button onClick={handleDeleteConfirmed}>Yes</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Users;
