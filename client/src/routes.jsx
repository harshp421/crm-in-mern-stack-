/* eslint-disable react/display-name */
import React from "react";
import { lazy, Suspense } from "react";
import Layout from "./layout/admin/Layout";
import HomeLayout from "./layout/home/Layout";
import AuthLayout from "./layout/auth/Layout";
import { Outlet } from "react-router-dom";
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
// const Dashboard = Loadable(lazy(() => import("./pages/admin/admin-dashboard/admin-dashboard")));
const AddCompany = Loadable(
  lazy(() => import("./pages/admin/company/AddCompany"))
);
const Users = Loadable(lazy(() => import("./pages/admin/users/Users")));
const AddUser = Loadable(lazy(() => import("./pages/admin/users/AddUser")));

const Contacts = Loadable(
  lazy(() => import("./pages/admin/contacts/Contacts"))
);
// const Contact = Loadable(lazy(() => import("./pages/admin/contact/Contact")));
const Tickets = Loadable(lazy(() => import("./pages/admin/tickets/Tickets")));

const Projects = Loadable(lazy(() => import("./pages/admin/todos/Projects")));
const Todos = Loadable(lazy(() => import("./pages/admin/todos/Todos")));

const Emails = Loadable(lazy(() => import("./pages/admin/emails/Emails")));
const CDA = Loadable(lazy(() => import("./pages/admin/cda/CDA")));
const  Choice = Loadable(lazy(() => import("./pages/auth/Choice")));

const ErrorPage = Loadable(lazy(() => import("./pages/others/ErrorPage")));


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
        path: "login",
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
        path: "todos",
        element: <Projects />,
      },
      {
        path: "todos/:id",
        element: <Todos />,
      },
      {
        path: "emails",
        element: <Emails />,
      },
      {
        path: "cda",
        element: <CDA />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
