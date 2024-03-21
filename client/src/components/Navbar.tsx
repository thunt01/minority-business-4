import React, { useState } from "react";
import '../App.css'
import Logo from "../assets/Logo.svg"
import CultureCartLogo from "../assets/CultureCartLogo.png"
import { BsCart2 } from "react-icons/bs";
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
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link } from 'react-router-dom';
import Search from "./Search";


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
    return (
      <nav>
        <div className="nav-logo-container">
            <img style= {{width: 75, height: 75}}src={CultureCartLogo} alt=""/>
            
        </div>
        <div className="navbar-links-container">
          <Search></Search>
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Team</a>

            <Link to="/Login" className="primary-button">Log in</Link>



          {/* <button className="primary-button">Log in</button> */}



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
            <Divider />
          </Box>
        </Drawer>
      </nav>
    );
  };
  
 


export default Navbar;