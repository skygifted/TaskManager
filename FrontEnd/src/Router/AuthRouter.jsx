import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {AccountContextData} from '../components/Context/AccountContext';

const useAuth = () =>{

    const { LoginStatus} = React.useContext(AccountContextData)
       return  LoginStatus
}

function AuthRouter() {
  const IsAuth = useAuth() 
  return IsAuth === 'dash' ? <Outlet /> : <Navigate to="/*" />
}

export default AuthRouter