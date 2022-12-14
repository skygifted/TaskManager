import './App.css';
import React, { useContext, useState } from 'react'
import Header from './components/Header'
import Aside from './components/Aside';
import Footer from './components/Footer';
import {BrowserRouter as Router,Route ,Routes,Navigate} from 'react-router-dom'
import MainRouter from './Router/Routers';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextData from './components/Context/AccountContext';



function App() {

 

  

  return (
      
       <div className='maincon'>
      <Router>  
      <ContextData>
      {/* Router Block Start */}

      <Header />
      <div className='tostfy'>
      <ToastContainer position="top-center"/>
      </div>
      <Aside />
      <MainRouter />
      <Footer />
      

      {/* Router Block End */}
        </ContextData>
        </Router>
      </div>
    
  );
}

export default App;
