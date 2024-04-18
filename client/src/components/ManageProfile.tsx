
import React, { useEffect, useState } from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 
import TextareaAutosize from '@mui/material/TextareaAutosize'; 
import { fetchUserAttributes } from 'aws-amplify/auth';
import ProductRow from './ProductRow';
import ProductBox from './ProductBox';

const defaultTheme = createTheme();

export default function Profile() {
  const [aboutMe, setAboutMe] = React.useState("Enter information about yourself...");
  const [editMode, setEditMode] = React.useState(false);
  const [userFName, setuserFname] = useState('');
  const [userLName, setuserLName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPhone, setuserPhone] = useState('');
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [userWishlist, setuserWishlist] = useState([]);

  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutMe(event.target.value);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
         const user_details = await fetchUserAttributes();
         if (user_details) {
          setuserFname(user_details.given_name|| '');
          setuserLName(user_details.family_name|| '');
          setuserEmail(user_details.email||'');
          setuserPhone(user_details.phone_number||'');
          fetch('/wishlist/' + user_details.sub)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setuserWishlist(JSON.parse(JSON.stringify(data)))
          })
          fetch('/recentlyViewed')
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setRecentlyViewed(JSON.parse(JSON.stringify(data)))
          })
        } else {
          console.log('User not signed in. Trying again...');
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    checkUser();
  }, []);

  
  const recentlyViewedItems = recentlyViewed.map((product: any) => (
    <ProductBox props={product}></ProductBox>
  ));
  const wishlistItems = userWishlist.map((product: any) => (
      <ProductRow props={product}></ProductRow>
  ));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
   
        <Box
          component="main"
          sx={{
            bgcolor: '#1f2029',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Box>
          <Container maxWidth="lg" sx={{ bgcolor: '#1f2029', mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recently viewed items*/}
              <Grid className = "profile-box" item xs={12} md={8} lg={9}>
                <Paper className = "profile-box"
                  sx={{
                    bgcolor: '#1f2029',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 290,
                  }}
                >
                <h3 className=' text-white'>Recently Viewed</h3>
                <div className="row">{recentlyViewedItems}</div>
               
                </Paper>
              </Grid>
              {/* Profile picture */}
              <Grid className = "profile-box" item xs={12} md={5} lg={3}>
                <Paper sx={{ bgcolor: '#1f2029', p: 2, display: 'flex', flexDirection: 'column', height: 290 }}>
                  <Typography sx={{ color: "white"}}variant="h6" gutterBottom>
                    User Details
                  </Typography>
                  <Typography sx={{ color: "white"}}variant="body1" gutterBottom>
                     Name: {userFName} {userLName}
                  </Typography>
                  <Typography sx={{ color: "white"}}variant="body1" gutterBottom>
                    Email: {userEmail}
                  </Typography>
                  <Typography sx={{ color: "white"}} variant="body1" gutterBottom>
                    Phone: {userPhone}
                  </Typography>
                </Paper>
              </Grid>
              {/* About me section */}
            <Grid className = "profile-box" item xs={12}>
              <Paper sx={{ bgcolor: '#1f2029', p: 2, display: 'flex', flexDirection: 'column' }}>
                {editMode ? (
                  <Box sx={{ bgcolor: '#1f2029', width: '100%', mb: 1 }}>
                    <TextareaAutosize
                      aria-label="about-me"
                      value={" " + aboutMe}
                      onChange={handleChange}
                      autoFocus
                      style={{ width: '100%', minHeight: 100 }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ color: "white", whiteSpace: 'pre-wrap' }}>
                    {aboutMe}
                  </Typography>
                )}
                <Button onClick={toggleEditMode} variant="outlined" sx={{ mt: 1 }}>
                  {editMode ? "Save" : "Edit"}
                </Button>
              </Paper>
            </Grid>
            <Grid className = "profile-box" item xs={12}>
              <Paper sx={{ bgcolor: '#1f2029', p: 2, display: 'flex', flexDirection: 'column' }}>
                <h2>Wishlist</h2>
                {wishlistItems}
              </Paper>
            </Grid>
            
          </Grid>
            
          </Container>
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
}