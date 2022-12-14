const db = require('../DataBase/DbConnection')



   // Get all employee for a Task

   Get_All_Users = async(req,res) =>{

    const sql = "SELECT * FROM register_user WHERE UserType = ?"
     const UserType = "Employee"
    db.query(sql,[UserType],(err,result) =>{

           if(err) console.log(err)
            res.send(result)
    })
}



// Get Employee data

Get_Employee_Data = async(req,res) =>{
        
    const choose = req.params.Choose
    const sql = "SELECT * FROM register_user WHERE Email = ?"
    db.query(sql,[choose],(err,result) =>{

           if(err) console.log(err)
            res.send(result)
    })
}



module.exports = {Get_All_Users,Get_Employee_Data}