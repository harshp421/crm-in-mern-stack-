/* eslint-disable react/display-name */
import React from "react";
import { lazy, Suspense } from "react";
import Layout from "./layout/admin/Layout";
import HomeLayout from "./layout/home/Layout";
import AuthLayout from "./layout/auth/Layout";
import { Outlet } from "react-router-dom";

import EmployeeLayout from "./layout/employee/EmployeeLayout";
import UserLayout from "./layout/user/Layout";
import ProfilePage from "./pages/home/ProfilePage";
// import AddCompany from "./pages/admin/company/AddCompany";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<p>loading ...</p>}>
      <Component {...props} />
    </Suspense>
  );

// LANDING PAGEll
const Home = Loadable(lazy(() => import("./pages/home/Homepage")));

const Signup = Loadable(lazy(() => import("./pages/auth/Signup")));
const Login = Loadable(lazy(() => import("./pages/auth/Login")));
const AdminLogin = Loadable(lazy(() => import("./pages/auth/AdminLogin")));
const ManagerLogin = Loadable(lazy(() => import("./pages/auth/ManagerLogin")));
const EmployeeLogin = Loadable(lazy(() => import("./pages/auth/EmployeeLogin")));
const Verification = Loadable(lazy(() => import("./pages/auth/Verification")));
const EmailVerify = Loadable(lazy(() => import("./pages/auth/EmailVerify")));
const ForgetPassword = Loadable(
  lazy(() => import("./pages/auth/ForgetPassword"))
);
const ResetPwd = Loadable(lazy(() => import("./pages/auth/ResetPwd")));

// const PrivacyPolicy = Loadable(
//   lazy(() => import("./pages/others/PrivacyPolicy"))
// );

// ADMIN PAGE
 const AdminDashboard = Loadable(lazy(() => import("./pages/admin/dashboard/Dashboard")));
 //employee Dashboard
 const EmployeeDashboard = Loadable(lazy(() => import("./pages/employee/dashboard/Dashboard")));
 const UserDashboard = Loadable(lazy(() => import("./pages/users/dashboard/Dashboard")));
const AddCompany = Loadable(
  lazy(() => import("./pages/admin/company/AddCompany"))
);
const Users = Loadable(lazy(() => import("./pages/admin/users/Users")));
const AddUser = Loadable(lazy(() => import("./pages/admin/users/AddUser")));


const Employee = Loadable(lazy(() => import("./pages/admin/employee/Users")));
const AddEmployee = Loadable(lazy(() => import("./pages/admin/employee/AddUser")));



const Contacts = Loadable(
  lazy(() => import("./pages/admin/contacts/Contacts"))
);
// const Contact = Loadable(lazy(() => import("./pages/admin/contact/Contact")));
//admin component route
const Tickets = Loadable(lazy(() => import("./pages/admin/tickets/Tickets")));
const ViewTicket = Loadable(lazy(() => import("./pages/admin/tickets/ViewTicket")));

const  Choice = Loadable(lazy(() => import("./pages/auth/Choice")));
const ErrorPage = Loadable(lazy(() => import("./pages/others/ErrorPage")));


//employee dashboard component
const EmployeeTickets = Loadable(lazy(() => import("./pages/employee/tickets/Tickets")));
const ViewEmployeeTicket = Loadable(lazy(() => import("./pages/employee/tickets/ViewTicket")));




//user deshboard component
const UserTickets = Loadable(lazy(() => import("./pages/users/tickets/Tickets")));
const UserAddTickets=Loadable(lazy(() => import("./pages/users/tickets/AddTickets")));
const ViewUserTicket = Loadable(lazy(() => import("./pages/users/tickets/ViewTicket")));

const routes = [
  {
    path: "",
    element: (
      <HomeLayout>
        <Home />
      </HomeLayout>
    ),
  },
  {
    path: "/profile-page",
    element: (
     
        <ProfilePage />
     
    ),
  },
{
  
    path:"choice",
    element:<Choice/>,
  
},
  {
    path: "",
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
       path:"admin-login",
       element:<AdminLogin/>
      },
      {
        path:"manager-login",
        element:<ManagerLogin/>
       },
       {
        path:"employee-login",
        element:<EmployeeLogin/>
       },
      {
        path: "user-login",
        element: <Login />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/email-verification/:id",
        element: <EmailVerify />,
      },
      {
        path: "/reset-password/:id",
        element: <ResetPwd />,
      },
    ],
  },
  // {
  //   path: "privacy-policy",
  //   element: <PrivacyPolicy />,
  // },
  {
    path: "admin-dashboard",
    element: <Layout />,
    children: [
      { 
        path:"",
        element:<AdminDashboard/>

      },
      {
        path: "add-company",
        element: <AddCompany />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/add-user",
        element: <AddUser />,
      },
      {
        path: "users/view-user/:id",
        element: <AddUser />,
      },

      {
        path:"employee",
        element:<Employee/>
      },
      {
        path:"employee/add-user",
        element:<AddEmployee/>
      },
      {
        path:"employee/view-user/:id",
        element:<AddEmployee/>
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      // {
      //   path: "contacts/:id",
      //   element: <Contact />,
      // },
      {
        path: "tickets",
        element: <Tickets />,
      },
      {
        path: "tickets/:id",
        element: <ViewTicket />,
      },
      
     
    ],
  },
  {
    path: "employee-dashboard",
    element: <EmployeeLayout />,
    children: [
      {
        path: "",
        element: <EmployeeDashboard />,
      },
      {
        path: "tickets",
        element: <EmployeeTickets />,
      },
      {
        path: "tickets/:id",
        element: <ViewEmployeeTicket />,
      },
      
     

    ],
  },
  {
    path: "user-dashboard",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <UserDashboard />,
      },
      {
        path: "tickets",
        element: <UserTickets />,
      },
      {
        path: "tickets/add-tickets",
        element: <UserAddTickets />,
      },
      {
        path: "tickets/:id",
        element: <ViewUserTicket />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
