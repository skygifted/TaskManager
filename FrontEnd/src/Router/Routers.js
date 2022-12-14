import React, {useContext} from 'react'
import {Route ,Routes} from 'react-router-dom'
import Section from '../components/Section';
import AuthRouter from './AuthRouter';
import Login from '../components/Login';
import {AccountContextData} from '../components/Context/AccountContext';
import AdminRouteAthu from './AdminRouteAthu';
import Post from '../components/Post';
import WatchList from '../components/WatchList/WatchList';
import TaskDone from '../components/TaskDone/TaskDone';
import ShareAuth from './ShareAuth';






function MainRouter() {

  const { LoginStatus,User} = useContext(AccountContextData)

  return (
    <Routes>

      {
        LoginStatus ? null :  <Route path="/*" element={<Login/>}/>
      }

      {
       LoginStatus === null ? " " :
       
    <Route element={<AuthRouter/>}>
     
      <Route element={<AdminRouteAthu/>}>
      <Route path="/Section" element={<Section />} /> 
      </Route>
       
      <Route element={<ShareAuth/>}>
      <Route path='/Post' element={<Post/>} />
      </Route>

    <Route path='/WatchList' element={<WatchList/>} />
    <Route path='/TaskDone' element={<TaskDone/>} />
    </Route>
      }
     
    </Routes>
  )
}

export default MainRouter