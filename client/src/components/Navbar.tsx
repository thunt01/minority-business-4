import React, { useState } from "react";
import '../App.css';
import CultureCartLogo from "../assets/CultureCartLogo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Link } from 'react-router-dom';
import { fetchUserAttributes } from 'aws-amplify/auth';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
      {
        text: "Home",
        icon: <HomeIcon />,
      },
      {
        text: "About",
        icon: <InfoIcon />,
      },
      {
        text: "Team",
        icon: <Diversity3Icon />,
      },
    ];

    const [currentUser, setCurrentUser] = useState('');
    async function currentAuthenticatedUser() {
        try {
            const user_details = await fetchUserAttributes();
            setCurrentUser(user_details.email);
        } catch (err) {
            console.log(err);
        }
    }
    currentAuthenticatedUser();
    return (
      <nav>
        <div className="nav-logo-container">
            <img style= {{width: 100, height: 100}}src={CultureCartLogo} alt=""/>
        </div>
        <div className="navbar-links-container">
          <a href="/">Home</a>
          <a href="/#about-us">About</a>
          <a href="/#team">Team</a>
          <a href="/#work">Work</a>
          {currentUser ? (
              <Link to="/Login" className="primary-button">Profile</Link>
            ) : (
              <Link to="/Login" className="primary-button">Log in</Link>
          )}
        </div>

        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider/>
          </Box>
        </Drawer>
      </nav>
    );
  };

export default Navbar;