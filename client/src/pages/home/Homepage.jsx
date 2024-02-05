import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

const Homepage = () => {
  // const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  return (
    <Box component="section">
      <Box>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }} align="center">
          CRISH BALA CRM for Your Basic CRM needs
        </Typography>
       
        <Box align="center">
          <Button variant="contained" onClick={() => navigate("/choice")}>
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/signup")}
            sx={{ ml: 1 }}
          >
            Get started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
