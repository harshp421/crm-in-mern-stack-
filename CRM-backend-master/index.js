const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4050;
//dotenv.config();
require('dotenv').config()
//IMPORT ROUTES

const authRoute = require("./routes/auth/auth");
const contactsRoute = require("./routes/contacts/contacts");
const usersRoute = require("./routes/user/users");
const companyRoute = require("./routes/company/company");
const adminRoute = require("./routes/adminauth/adminauth");

const employeeRoute = require("./routes/employeeauth/employeeauth");
const adminDashboardRoute = require("./routes/adminauth/adminDashboard");

const employeeDashboardRoute = require("./routes/employeeauth/employeeDashboard");
const ticketRoute = require("./routes/tickets/tickets");


//CONNECTION TO DATABASE
console.log(process.env.DB_CONNECT,"connect t")
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db"));



//MIDDLEWARE
app.use(cors());
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 120 request per 1 minute
    max: 160,
  })
);
app.use(express.json());
app.use(cookieParser());

//ROUTE MIDDLEWARE

app.use("/api/auth", authRoute);
app.use("/api/contacts", contactsRoute);
app.use("/api/users", usersRoute);
app.use("/api/company", companyRoute);
app.use("/api/admin", adminRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/admindashboard", adminDashboardRoute);
app.use("/api/employeedashboard", employeeDashboardRoute);
app.use("/api/tickets",ticketRoute );


app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));

// "start": "nodemon index.js"
