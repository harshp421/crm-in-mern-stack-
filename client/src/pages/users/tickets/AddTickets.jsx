// AddTicket.js
import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CustomTextField, CustomSelectField } from '../../../components/CustomInputs';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useGetuserData from '../../../Hooks/useGetuserData';
import { userApi } from '../../../service/api/user/userApi';

const AddTicket = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user=useGetuserData();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required!'),
    desc: Yup.string().min(3, 'Description should be at least 3 characters').required('Please Enter Problem description'),
    status: Yup.string().required('Status is required!'),
    priority: Yup.string().required('Priority is required!'),
    category: Yup.string().required('Category is required!'),
  });

  const initialValues = {
    title: '',
    desc: '',
    status: '',
    priority: '',
    category: '',
  };
  
  const { errors, values, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(false);
      
      createTicket(values,user.user.id);
    },
  });

  const createTicket = async (values,id) => {
    try {
     
      const response = await userApi.createTicket({...values,client:id});
      if (response) {
        toast.success('Ticket has been created');
        setIsLoading(false);
        navigate('/user-dashboard/tickets'); // Redirect to the ticket page or wherever you want
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create ticket');
      setIsLoading(false);
    }
  };

  return (
    <Box component="section">
      <Container>
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Add Ticket
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <CustomTextField
                label="Title"
                name="title"
                placeholder="Enter title"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <CustomTextField
                label="Description"
                name="desc"
                placeholder="Enter description"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <CustomSelectField
                label="Category"
                name="category"
                placeholder="Select category"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                labelItems={[
                  { val: 'technical-support', label: 'Technical Support' },
                  { val: 'feature-request', label: 'Feature Request' },
                  { val: 'bug-report', label: 'Bug Report' },
                  { val: 'general', label: 'General' },
                  
                ]}
              />
              
              <CustomSelectField
                label="Status"
                name="status"
                placeholder="Select status"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                labelItems={[
                  { val: 'open', label: 'Open' },
                  { val: 'in-progress', label: 'In Progress' },
                  { val: 'closed', label: 'Closed' },
                ]}
              />
              <CustomSelectField
                label="Priority"
                name="priority"
                placeholder="Select priority"
                values={values}
                handleChange={handleChange}
                touched={touched}
                errors={errors}
                labelItems={[
                  { val: 'high', label: 'High' },
                  { val: 'medium', label: 'Medium' },
                  { val: 'low', label: 'Low' },
                ]}
              />
            </Box>
            <LoadingButton
              loading={isLoading}
              loadingIndicator="Loading…"
              variant="contained"
              onClick={handleSubmit}
              sx={{
                marginTop: 2,
              }}
            >
              Create Ticket
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddTicket;
