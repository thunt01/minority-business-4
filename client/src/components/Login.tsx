
import { Amplify } from 'aws-amplify';

import awsmobile from '../aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsmobile);

export default function Login() {
  
  return (
    
    <Authenticator>
      {({ signOut, user }) => (
       
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    
  );
  
}
