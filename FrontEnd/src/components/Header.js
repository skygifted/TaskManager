import React,{useContext} from 'react'
import {AccountContextData} from '../components/Context/AccountContext';
import Logout from './Logout';
import RefreshDash from './RefreshDash';




function Header() {

  const { 
    LoginStatus,setLoginStatus, 
    User,setUser,
  } = useContext(AccountContextData)

  if(LoginStatus){
    return(
      <div className='Header flex justify-center items-center'>
        <RefreshDash/>
      <h1 className='h4  text-white font-bold uppercase'>Task Manager</h1>
      <Logout/>
    </div>
     )
  }else{
     return ''
  }
  
}

export default Header