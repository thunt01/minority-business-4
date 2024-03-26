import awsmobile from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from "react";

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
