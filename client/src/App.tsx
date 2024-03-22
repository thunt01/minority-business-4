import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing'
import Contact from './components/Contact'
import Checkout from './components/Checkout';
import Login from './components/Login';
import About from './components/About';

function App(){
    return (    
        <div className='App'>
                <Routes>
                    <Route path="/" element={ <Landing /> }/>
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path='/About' element ={<About/>}/>
                    
                </Routes>
        </div>
        

    )
}


export default App;