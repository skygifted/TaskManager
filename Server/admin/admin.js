const express = require('express')
const router = express.Router()
const {RegisterSupervisor,TaskGiverFunc,AdminUserLoginRequest1,AdminUserLoginRequest2,Get_All_Users,DeleteUser,Enable_User,Disenable_User,Get_Task_Data,Updatetask,Reassign,DeleteTask,get_all_task_data_done,UpdateTaskss,Logout} = require('./adminControllerFunc')
const {Rigester_User_form_Validator} = require('../Controllers/RegisterUser')
// This is the Amdin sub routes and functions moreover the imported functions located in controllers folder

//  Register route  admin user
router.post('/register_users',Rigester_User_form_Validator,RegisterSupervisor)
// Get all users 
router.get('/getallusers',Get_All_Users)
// Delete User
router.put('/deleteuser',DeleteUser)
// Enable user account
router.put('/enableuser',Enable_User)
router.put('/disenableuser',Disenable_User)
// Get all Task data
router.get('/get_all_task_data',Get_Task_Data)
// get_all_task_data_done
router.get('/get_all_task_data_done',get_all_task_data_done)
// Update Des for Task
router.put('/updatetask',Updatetask)
// Reassign Task
router.put('/reassign',Reassign)
// Delete Task
router.put('/deletetask',DeleteTask)
// UpdateTask
router.put('/update_task_s',UpdateTaskss)
// LogOut
router.get('/logout',Logout)
// Add task route
router.post('/add_task',TaskGiverFunc)


// Login 
router.route('/login').get(AdminUserLoginRequest1).post(AdminUserLoginRequest2)




module.exports = router