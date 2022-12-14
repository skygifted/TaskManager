import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {AccountContextData} from '../components/Context/AccountContext';

const useAuth = () =>{

    const {User} = React.useContext(AccountContextData)
       return  User.UserType
}

function AdminRouteAthu() {
  
  const IsAuth = useAuth() 
 return IsAuth === 'Admin' ? <Outlet /> : <Navigate to="Exchange" />
 
}

export default AdminRouteAthu