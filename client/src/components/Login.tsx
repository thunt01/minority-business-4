import React, { useEffect, useState } from 'react';
import { Grid, Button, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import ExploreIcon from '@mui/icons-material/Explore';

import awsmobile from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';


Amplify.configure(awsmobile);

export default function Login() {
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();
  const navToBusinessPage = () => {navigate("/BusinessForm")};
  const navToBrowsing = () => {navigate("/browsing")};


  useEffect(() => {
    const checkUserSignIn = async () => {
      try {
         const user_details = await fetchUserAttributes();
         if (user_details) {
          setCurrentUser(user_details.given_name|| '');
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
    <Authenticator>
      {({ signOut, user }) => (
          <main className="container">
            
            <div className="user-info">
              <h1>Hello {currentUser}</h1>
              <IconButton onClick={signOut} aria-label="Sign Out" className='sign-out-icon'>
              <ExitToAppIcon />
            </IconButton>
            </div>
         
          <Grid container direction="column" justifyContent="center"  alignItems="center" spacing={2} className="menu">
            <Grid item xs={12} sm={6}>
              <Button onClick={navToBusinessPage} variant="outlined" size="large" className="menu-item">
              Open Storefront
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={navToBrowsing} variant="outlined" size="large" className="menu-item" >
                Browse Products
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={navToBrowsing} variant="outlined" size="large" className="menu-item">
                User Profile
              </Button>
            </Grid>
          </Grid>
        </main>
      )}
    </Authenticator>
  );
}


