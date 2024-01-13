import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import CustomToggle from "../../components/CustomToggle";
import TopImg from "../../assets/card-primary copy.png";
import useGetuserData from "../../Hooks/useGetuserData";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const [darkTheme] = useContext(ThemeContext);
  const matches = useMediaQuery("(min-width:500px)");
  const navigate=useNavigate();
    //jypter notebook 
    const {user}=useGetuserData();
    
     useEffect(() => {
      if(user !== null)
      {  
         navigate(`/${user.role}-dashboard`)
      }
     }, [])
     
   
  return (
    <React.Fragment>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 800 }}
          >
            CRISH BALA CRM
          </Typography>
         
          <Box sx={{ display: "flex" }}>
            <CustomToggle />
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Card sx={{ width: matches ? 425 : "90%" }}>
          <img src={TopImg} alt="" style={{ height: 200 }} />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 1, pt: 0 }}
          >
            {children}
          </CardContent>
        </Card>
      </Container>
     
    </React.Fragment>
  );
};

export default AuthLayout;
