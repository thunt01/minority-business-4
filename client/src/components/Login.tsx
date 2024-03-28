import React, { useEffect, useState } from 'react';

import awsmobile from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(awsmobile);

export default function Login() {
  const [currentUser, setCurrentUser] = useState('');
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
              
              <button onClick={signOut}>Sign out</button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      )}
    </Authenticator>
  );
}

