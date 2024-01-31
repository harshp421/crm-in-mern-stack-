import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  CustomMultipleCheckBoxField,
  CustomSelectField,
  CustomTextField,
} from "../../../components/CustomInputs";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AdminApi } from "../../../service/api/admin/AdminApi";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string("Should be string").required("Name is required !"),
    email: Yup.string()
      .email("Enter valid email!")
      .required("Email is required !"),
    role: Yup.string(),
    permissions: Yup.array(),
    password: Yup.string().required("Password is required !"),
  });

  const initialValues = {
    name: "",
    email: "",
    role: "user",
    permissions: ["user-All"],
    password: "",
  };
  const { errors, values, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      inviteUser(values);
    },
  });

  const inviteUser = (values) => {
    // console.log(values);  apiUsers.post({ ...values}, "", true)
    AdminApi.addUser({...values},"auth","register").then((res) => {
      console.log(res,"responc");
      if (res.status === 200) {
        toast.success("User has been invited");
        setIsLoading(false);
        navigate("/admin-dashboard/users")
      } else {
        // console.log(res);
        toast.error(res.data?.message);
        setIsLoading(false);
      }
    });
  };



  return (
    <Box component="section">
      <Container>
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Add User
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                // marginTop: 5,
              }}
            >
              <CustomTextField
                label="Name"
                name="name"
                placeholder="ex: Ram"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <CustomTextField
                label="Email"
                name="email"
                placeholder="ex: james@company.com"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
             
              <CustomTextField
                label="password"
                name="password"
                placeholder="enter password"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                type="password"
              />
            </Box>
            <LoadingButton
                loading={isLoading}
                loadingIndicator="Loading…"
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  marginTop:2,
                }}
              >
                Invite User
              </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                // marginTop: 5,
              }}
            >
              {/* <Typography component={"p"} variant={"h6"}>
                Permissions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={4} md={3}>
                  <CustomMultipleCheckBoxField
                    label="User"
                    labelItms={["Users View", "Users Edit", "Users Delete"]}
                    checked={checkedUsers}
                    setChecked={setCheckedUsers}
                  />
                </Grid>
                <Grid item xs={3} sm={4} md={3}>
                  <CustomMultipleCheckBoxField
                    label="Contacts"
                    labelItms={[
                      "Contacts View",
                      "Contacts Edit",
                      "Contacts Delete",
                    ]}
                    checked={checkedContacts}
                    setChecked={setCheckedContacts}
                  />
                </Grid>
                <Grid item xs={3} sm={4} md={3}>
                  <CustomMultipleCheckBoxField
                    label="Tickets"
                    labelItms={[
                      "Tickets View",
                      "Tickets Edit",
                      "Tickets Delete",
                    ]}
                    checked={checkedTickets}
                    setChecked={setCheckedTickets}
                  />
                </Grid>
                <Grid item xs={3} sm={4} md={3}>
                  <CustomMultipleCheckBoxField
                    label="Todos"
                    labelItms={["Todos View", "Todos Edit", "Todos Delete"]}
                    checked={checkedTodos}
                    setChecked={setCheckedTodos}
                  />
                </Grid>
              </Grid> */}
             
              {/* <Button onClick={handleSubmit} variant="contained">
                Invite User
              </Button> */}
            </Box>
          </Grid>
        </Grid>

        {/* <CustomSelectChipField
            label="Permissions"
            name="permissions"
            placeholder="permissions"
            labelItms={[
              { val: "users-view", label: "Users view" },
              { val: "users-edit", label: "Users Edit" },
              { val: "users-delete", label: "Users-delete" },
              { val: "contact-view", label: "Contact-view" },
              { val: "contact-edit", label: "Contact-edit" },
              { val: "contact-delete", label: "Contact-delete" },
              { val: "ticket-view", label: "Ticket-view" },
              { val: "ticket-edit", label: "Ticket-edit" },
              { val: "ticket-delete", label: "Ticket-delete" },
              { val: "todo-view", label: "Todo-View" },
              { val: "todo-edit", label: "Todo-edit" },
              { val: "todo-delete", label: "Todo-delete" },
            ]}
          /> */}
      </Container>
    </Box>
  );
};

export default AddUser;
