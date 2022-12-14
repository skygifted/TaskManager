const express = require('express')
const router = express.Router()
const {Get_All_Users,Get_Employee_Data} = require('./employeeControllerFunc')



// Get All employees for a Task
router.get('/get_all_employee_for_task',Get_All_Users)
// Get  Employee data
router.get('/get_employee_data/:Choose',Get_Employee_Data)



module.exports = router