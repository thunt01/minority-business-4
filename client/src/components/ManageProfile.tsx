
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


const defaultTheme = createTheme();


export default function Profile() {
  const [aboutMe, setAboutMe] = React.useState("Enter information about yourself...");
  const [editMode, setEditMode] = React.useState(false);
  const [userFName, setuserFname] = useState('');
  const [userLName, setuserLName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPhone, setuserPhone] = useState('');

  
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
        } else {
          console.log('User not signed in. Trying again...');
        }
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    checkUser(); // Start checking user sign-in status
  }, []); // Empty dependency array to run the effect only once after component mount


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
   
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recently viewed items*/}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
               
                </Paper>
              </Grid>
              {/* Profile picture */}
              <Grid item xs={12} md={5} lg={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                  <Typography variant="h6" gutterBottom>
                    User Details
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                     Name:{userFName} {userLName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email:{userEmail}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Phone:{userPhone}
                  </Typography>
                </Paper>
              </Grid>
              {/* About me section */}
              <Grid item xs={12}>
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    {editMode ? (
      <Box sx={{ width: '100%', mb: 1 }}>
        <TextareaAutosize
          aria-label="about-me"
          value={aboutMe}
          onChange={handleChange}
          autoFocus
          style={{ width: '100%', minHeight: 100 }}
        />
      </Box>
    ) : (
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {aboutMe}
      </Typography>
    )}
    <Button onClick={toggleEditMode} variant="outlined" sx={{ mt: 1 }}>
      {editMode ? "Save" : "Edit"}
    </Button>
  </Paper>
</Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}