import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
} from "@mui/material";
import { AdminApi } from "../../../service/api/admin/AdminApi";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import useGetuserData from "../../../Hooks/useGetuserData";
import { CustomTextField } from "../../../components/CustomInputs";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { EmployeeApi } from "../../../service/api/employee/EmployeeApi";
import { userApi } from "../../../service/api/user/userApi";
const validationSchema = Yup.object().shape({
  message: Yup.string().required("Message is required!"),
});

const ViewTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [status, setStatus] = useState("");
  const [conversation, setConversation] = useState([]);

  const user = useGetuserData();
  const initialValues = {
    message: "",
    senderId: user.user._id,
    senderName: user.user.name,
    role:"user"
  };

  const { errors, values, handleChange, handleSubmit, touched,resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      //setIsLoading(false);

      console.log(values, user, "message calue");
      handleSendMessage(values);
    },
  });

  const fetchTicket = async () => {
    try {
      const response = await userApi.getTicketById(id);
      setTicket(response.data.message[0]);
      setStatus(response.data.message[0].status);
      setConversation(response.data.message[0].conversation);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };
  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleUpdateTicket = async () => {
    // Your logic for updating the ticket, you can use a form/dialog here
    console.log(status);
    if (status === "") {
      toast.error("please select some value in status ");
      return;
    }
    // After updating, you might want to refresh the ticket details
    try {
      const response = await userApi.updateTicket({ status }, id);
      console.log(response, "res");
      toast.success(response.data.message);
      setTicket(response.data.ticket);
    } catch (error) {
      console.error("Error fetching updated ticket:", error);
    }
  };

  const handleSendMessage = async (values) => {
    try {
      // Your API call to send a new message
     const response= await userApi.sendTicketMessage(id, values);
      toast.success(response.data.message);
      setTicket(response.data.ticket);
      setConversation(response.data.ticket.conversation);
      resetForm();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        View Ticket
      </Typography>
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>
          Ticket Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Title: {ticket.title}</Typography>
            <Typography variant="subtitle1">
              Description: {ticket.desc}
            </Typography>
            <Typography variant="subtitle1">
              Category: {ticket.category}
            </Typography>

            <Typography variant="subtitle1">
              Priority: {ticket.priority}
            </Typography>

            <Typography variant="subtitle1">
              Status:{" "}
              <select
                value={status}
                className="disabled-input"
                onChange={(event) => {
                  console.log("Selected value:", event.target.value);
                  setStatus(event.target.value);
                }}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </Typography>
          </Grid>
          {/* Add more details here based on your ticket structure */}
        </Grid>
      </Paper>
      
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>
          Conversation
        </Typography>
        <List>
          {conversation.map((message) => (
            <ListItem key={message.id}>
              <ListItemAvatar>
                <Avatar>{message.senderName.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={message.senderName} 
                secondary={message.message}
              />
            
            </ListItem>
          ))}
        </List>
        <Divider />
        <CustomTextField
          label="New Message"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          name="message"
          placeholder="Enter messsage"
          values={values}
          handleChange={handleChange}
          touched={touched}
          errors={errors}
        />

        <LoadingButton
          loading={false}
          loadingIndicator="Sending…"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: 10 }}
        >
          Send Message
        </LoadingButton>
      </Paper>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h6" gutterBottom>
          Update Ticket
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateTicket}
          type="button"
        >
          Update Ticket
        </Button>
      </Paper>
    </div>
  );
};

export default ViewTicket;
