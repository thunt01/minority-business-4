import React, { useEffect, useState } from 'react';

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
  const navToBusinessPage = (event: any) => {navigate("/BusinessForm")};
  const navToBrowsing = (event: any) => {navigate("/browsing")};

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
        <main>
          {currentUser ? (
            <>
              <h1>Hello {currentUser}</h1>
              
              <button onClick={signOut} className='secondary-button'>Sign out</button>

              <button onClick={navToBusinessPage} className="secondary-button" >
                  Business Admin Page 
              </button>

              <button onClick={navToBrowsing} className="secondary-button" >
                  Browse
              </button>

              
            </>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      )}
    </Authenticator>
  );
}

