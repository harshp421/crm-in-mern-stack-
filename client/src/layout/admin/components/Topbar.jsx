import React, { useContext } from "react";
import {
  ConfirmationNumberOutlined,
  Dashboard,
  // Dashboard,
  EmailOutlined,
  FactCheckOutlined,
  LocalPhoneOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoreVert,
  PeopleAlt,
  PersonOutlineOutlined,
  SourceOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CustomToggle from "../../../components/CustomToggle";
import { primary } from "../../../theme/themeColors";
import BadgeIcon from '@mui/icons-material/Badge';
import { ThemeContext } from "../../../context/ThemeContext";
// import DashboardIcon from '@mui/icons-material/admin-dashboard';

const Topbar = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [darkTheme] = useContext(ThemeContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderMenu = (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem >
        <CustomToggle />
      </MenuItem>
      <MenuItem >
    
        <ListItemIcon>
          <PersonOutlineOutlined />
        </ListItemIcon>
        <Link to={'/profile-page'}> <Typography variant="inherit">Profile</Typography>
         </Link> 
      </MenuItem>
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <Typography variant="inherit">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
      
       <Link to="/admin-dashboard">
       <Typography variant="h6" noWrap component="div">
          Crish BALA CRM
        </Typography>
       </Link>
       
      
        <Box sx={{ flexGrow: 1 }} />
        <List sx={{ display: { xs: "none", sm: "flex" } }}>
          {menuContents.map((item, index) => (
            <ListItemButton
              key={index}
              component={NavLink}
              to={item.link}
              style={({ isActive, isPending }) => {
                return {
                  // color: isActive ? primary[500] : "inherit",
                  backgroundColor: isActive ? primary[500] : "inherit",
                  color: isActive ? "#fff" : "inherit",
                  // color: isPending ? "red" : "black",
                };
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
        {renderMenu}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

export const menuContents = [
  // {
  //   title: "Dashboard",
  //   link: "/admin-dashboard",
  //   icon: <Dashboard />,
  // },
  {
    title: "Users",
    link: "/admin-dashboard/users",
    icon: <PeopleAlt />,
  },
  {
    title:"Employee",
    link:"/admin-dashboard/employee",
    icon:<BadgeIcon/>
  },
  {
    title: "Tickets",
    link: "/admin-dashboard/tickets",
    icon: <ConfirmationNumberOutlined />,
  },

];
