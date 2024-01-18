import React, { useEffect, useState } from "react";
import AppWidgetSummary from "./AppWIdetSummary";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import BarChart from "../../../components/customeChart/PieChart";
import PieChart from "../../../components/customeChart/PieChart";
import LineChart from "../../../components/customeChart/LineChart";
import { AdminApi } from "../../../service/api/admin/AdminApi";
import CustomTable from "../../../components/CustomTable";
import { convertDateToDateWithoutTime } from "../../../utils/calendarHelpers";
import ResentAddUserTable from "./component/ResentAddUserTable";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState();
  const fatchDashBoardData = async () => {
    try {
      const responce = await AdminApi.getDashBoardData();
      console.log(responce, "dasgbard");
      setDashboardData(responce.data);
    } catch (error) {
      console.log(error, "");
    }
  };

  useEffect(() => {
    fatchDashBoardData();
  }, []);
 

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Tickets"
              total={dashboardData?.totalTickets}
              color="success"
              // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tickets in-Process"
              total={dashboardData?.TicketInWorking}
              color="info"
              // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tickets Open"
              total={dashboardData?.pendingTickets}
              color="warning"
              // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Ticket Close"
              total={dashboardData?.closedTickets}
              color="error"
              // icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <LineChart />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <PieChart />
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Card
            component={Stack}
            spacing={3}
            sx={{
              px: 3,
              py: 5,
              my: 3,
              borderRadius: 2,
            }}
          >
            <CardHeader title="Resently Added Employe" sx={{ mb: 5 }} />
          
           <ResentAddUserTable 
              title="Employee"
              downloadName="employee" />
            {/* <CustomTable
              columns={columns}
              data={userData}
              title="Employee"
              downloadName="employee"
            /> */}
          </Card>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
