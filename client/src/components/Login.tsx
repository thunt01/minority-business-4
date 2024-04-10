import React, { useEffect, useState } from 'react';
import {  IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MenuList } from './LoginOptions';
import awsmobile from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

Amplify.configure(awsmobile);

export default function Login() {
  const [currentUser, setCurrentUser] = useState('');
  
  function sendReq(info) {
    fetch('/adduser', {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  useEffect(() => {
    const checkUserSignIn = async () => {
      try {
         const user_details = await fetchUserAttributes();
         if (user_details) {
          setCurrentUser(user_details.given_name|| '');
          sendReq(JSON.parse(JSON.stringify({ Username: user_details.given_name, Email: user_details.email})));
        } else {
          console.log('User not signed in. Trying again...');
          // Retry after a short delay
          setTimeout(checkUserSignIn, 3000); // Retry after 3 seconds
        }
      } catch (error) {
        console.log('Error fetching user:', error);
        console.log('User not signed in. Trying again...');
          // Retry after a short delay
          setTimeout(checkUserSignIn, 3000); // Retry after 3 seconds
      }
    };
    checkUserSignIn(); // Start checking user sign-in status
  }, []); // Empty dependency array to run the effect only once after component mount

   

  return (
    <div>
    <Navbar></Navbar>
    <Authenticator>
      {({ signOut, user }) => (
          <main className="container">
            {/* <div className="banner" style={{ backgroundColor: '#DB920C  ', padding: '10px 0', position: 'relative' }}>
          Add a banner behind the user-info container
            </div> */}
            <div className="user-info" style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ display: 'flex', alignItems: 'center' }}>
            Hello {currentUser}
            <AccountCircleIcon sx={{ fontSize: 34, marginLeft: '8px' }} />
            </h1>
              <IconButton onClick={signOut} aria-label="Sign Out" className='sign-out-icon'>
               Sign out <ExitToAppIcon />
            </IconButton>
            </div>
            
         <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {MenuList.map((menu) => (
              <Link className='card' to={menu.route} key={menu.name} style={{ textDecoration: 'none' }}>
          <Card sx={{ maxWidth: "320px", display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
                sx={{ width: "100%", height: "400px" }}
                component={"img"}
                src={menu.image}
                alt={menu.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.name}
                </Typography>
                <Typography variant="body2">{menu.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>
        ))}
      </Box>
        </main>
      )}
    </Authenticator>
    </div>
  );
}


