import {BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Nav from './components/Nav';
import Checkout from './components/Checkout';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';



Amplify.configure(awsExports);

interface User {
    username: string;
    // Add other user properties as needed
  }

  const App: React.FC = () => {
    return (
//             <div>
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/">Home</Link>
//                         </li>
//                         <li>
//                             <Link to="/about">About</Link>
//                         </li>
//                         <li>
//                             <Link to="/contact">Contact</Link>
//                         </li>
//                     </ul>
//                 </nav>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/contact" element={<Contact />} />
//                     <Route path="/auth" element={<AuthenticatorWrapper />} />
//                 </Routes>
//             </div>
        
//     );
// };

// // AuthenticatorWrapper is used to wrap the Authenticator component
// // It can be used to handle authentication routes if needed
// const AuthenticatorWrapper: React.FC = () => {
//     return (
    <Authenticator>
      {({ signOut, user }: { signOut: () => void, user: User | null }) => (
        <main>
          <h1>Hello </h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
    );
};
export default App;