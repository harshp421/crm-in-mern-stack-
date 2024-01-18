import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import CustomToggle from "../../components/CustomToggle";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeContext } from "../../context/ThemeContext";
import useGetuserData from "../../Hooks/useGetuserData";
import { useNavigate } from "react-router-dom";

const HomeLayout = ({ children }) => {
  const [darkTheme] = useContext(ThemeContext);
  const navigate=useNavigate();
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
            sx={{ flexGrow: 1, fontWeight: 800}}
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
        {children}
      </Container>
    
    </React.Fragment>
  );
};

export default HomeLayout;
