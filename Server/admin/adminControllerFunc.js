const db = require('../DataBase/DbConnection')
const bcrypt = require('bcrypt')
const SaltRound = 10
 





 RegisterSupervisor = async(req,res) =>{
     

   // All variables 
    const {Fname,Lname,Mobile,Email,user_ID,UserType,Psswrd,userTokenID} = req.body

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let MM = today.getMonth()
    let yyyy = today.getFullYear();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    today = mm + '/' + dd + '/' + yyyy;

    const registerDate = `${months[MM]}-${yyyy}`
    const acc_status = 1
    const acc_type = "user"
    const picture = ''

  // Getting user data into dataBase 
   // Chechking if email exist
   const sql = "SELECT * FROM register_user WHERE Email = ?";
    db.query(sql,[Email],(err, result)=>{
            if(err) console.log(err)
       // Passed condition  to chack of email existance
       if(result.length === 0){
        const sq2 = "SELECT * FROM register_user WHERE Mobile = ?";
          // Checking if Phone Number exist
          db.query(sq2,[Mobile],(err,result)=>{
            
              if(err) console.log(err)

              // Passed condition to check if mobile number exist
              if(result.length === 0){

                // Finally user passed the conditions then be register

                // Password Hash
                bcrypt.hash(Psswrd,SaltRound,(err,hash)=>{

                       if(err) console.log(err)
                       const sql3 = "INSERT INTO register_user (Fname,Lname,Mobile,Email,user_ID,UserType,Psswrd,registerDate,picture,acc_status,acc_type,userTokenID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
                       
                       db.query(sql3,[Fname,Lname,Mobile,Email,user_ID,UserType,hash,registerDate,picture,acc_status,acc_type,userTokenID],(err,result) =>{

                              if(err) console.log(err)
                              console.log(result);
                              console.log(`${UserType} Registered`);
                              res.json({loggedIn:true})
                       })

                })
                
              }else{
                res.json({loggedIn: false, status: "Mobile number taken"})
                console.log('Mobile number taken')
              }

          })

       }else{
        res.json({loggedIn: false, status: "Email taken"})
        console.log('Email taken')
       }

   })
   
 }


 // Task given function 

 TaskGiverFunc = async (req,res) =>{
  
      const {userTokenID,employee_fname,employee_lname,employee_id,task_id,Task1,Task2,Task3,TextMsg,employee_email,UserType} = req.body
     
      const submit_status = 0




     // Check if Task Id exist before
     const sql = "SELECT *  FROM task_giver WHERE task_id = ?"
     db.query(sql,[task_id],(err,result) =>{
        
          if(err) console.log(err)

          if(result.length === 0){
              const sql2 = "INSERT INTO task_giver (employee_fname,employee_lname,employee_id,task_id,Task1,Task2,Task3,TextMsg,employee_email,submit_status,UserType,userTokenID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
              db.query(sql2,[employee_fname,employee_lname,employee_id,task_id,Task1,Task2,Task3,TextMsg,employee_email,submit_status,UserType,userTokenID],(err,result) =>{
                
                      if(err) console.log(err)
                      console.log(result)
                      res.send({status: "Task successfully set"})
              })

               
          }else{
            res.json({status: "Task ID exist"})
            console.log('Task ID exist')   
          }

     })
    
   
     
 }



 // Login 


 AdminUserLoginRequest1 = async (req,res) =>{
    // console.log(req.session.user)
    console.log(req.session)
    if(req.session.adminLoginuser && req.session.adminLoginuser.Email){
    //  console.log('Login in in')
    res.json({loggedIn: 'dash' , UserType:req.session.adminLoginuser.UserType, UserTokenID:req.session.adminLoginuser.UserTokenID})
    }else{
    res.json({loggedIn: false})
    }

    }   

    AdminUserLoginRequest2 =  async (req,res) =>{

  //  AdminUserLogin(req,res)

    const {Email, Password} = req.body
  

    // Chechking if email exist
    const sql = "SELECT * FROM register_user WHERE Email = ?";
   
    db.query(sql,[Email], async (err, result)=>{     
    if(err) throw err
    if( result.length > 0 ){

         
    // Check account status 

    db.query(sql,[Email],async (err,result)=>{

        if(err) throw err

        if( result[0].acc_status === '1'){


            const SeEmail = result[0].Email
            const isSamePass = await bcrypt.compare(
            Password,
            result[0].Psswrd 
            ); 
      
            if(isSamePass){
            // Login
            req.session.adminLoginuser = {
            Email: SeEmail,
            UserTokenID: result[0].userTokenID,
            UserType: result[0].UserType,
            EmployeeID: result[0].user_ID  
            }
           
            res.json({
                UserTokenID:result[0].userTokenID, 
                UserType: result[0].UserType,
                Email: SeEmail,
                loggedIn:'dash',
                status:`You're Logged ${result[0].UserType}`,
             })
            
            console.log('You are loggein')
        
           
            }else{

            // not Login Get_All_Users_For_Admin
            res.json({loggedIn: false, status:"Wrong username or password"})
            console.log('Wrong Password')
            }


        }else{
            res.json({loggedIn: false, status:"You can't login"})
            console.log('Locked Account')  
        }
         
    })
    
    
    }else{
    res.json({loggedIn: false, status:"Wrong username or password"})
    console.log('Wrong Username')
    }
    })

    }
    
      // Get all users
    Get_All_Users = async(req,res) =>{

              const sql = "SELECT * FROM register_user WHERE NOT acc_type = ?"
               const acc_type = "Admin"
              db.query(sql,[acc_type],(err,result) =>{

                     if(err) console.log(err)
                      res.send(result)
              })
    }

     // Delete user 
     DeleteUser =  async (req,res) =>{

      const {param} = req.body

      const sql = "DELETE FROM register_user WHERE userTokenID = ?  "
      db.query(sql,[param],(err,result) =>{
      if (err) console.log (err);
      console.log(result)
     res.send('Deleted')
     console.log('Deleted')
      })
  
      }

        // Enable user account 
      Enable_User = async (req,res) =>{
                
        const {param} = req.body
        const approve = 1

       const sql = "UPDATE register_user SET acc_status = ? WHERE userTokenID = ?";

       db.query(sql,[approve,param],(err,result) =>{
        
       if (err) console.log (err);
       console.log(result)
       res.send('Account enable')
       console.log('Account enable')
       })
   
       } 
        // DisEnable User account

       Disenable_User = async (req,res) =>{
            
        const {param} = req.body
        const approve = 0

       const sql = "UPDATE register_user SET acc_status = ? WHERE userTokenID = ?";

       db.query(sql,[approve,param],(err,result) =>{
        
       if (err) console.log (err);
       console.log(result)
       res.send('Account Disenable')
       console.log('Account Disenable')
       })
   
       } 


       // Get Task data

       Get_Task_Data = async(req,res) =>{
        
        const choose = req.params.Choose
        const sql = "SELECT * FROM task_giver"
        db.query(sql,(err,result) =>{
    
               if(err) console.log(err)
                res.send(result)
        })
    }
   
     // get_all_task_data_done
    get_all_task_data_done =  async(req,res) =>{

      const sql = "SELECT * FROM task_giver WHERE submit_status = ?"
       const submit_status = "1"
      db.query(sql,[submit_status],(err,result) =>{
  
             if(err) console.log(err)
              res.send(result)
      })
  }


    // Update Des for Task
    
    Updatetask = async (req,res) =>{
            
      const {Des,param} = req.body
      const approve = 1

     const sql = "UPDATE task_giver SET submit_status = ? , employee_des = ?  WHERE task_id = ?";

     db.query(sql,[approve,Des,param],(err,result) =>{
      
     if (err) console.log (err);
     console.log(result)
     res.send('Task submitted')
     console.log('Task submitted')
     })
 
     } 

     // Reassign  Task

     Reassign = async (req,res) =>{
            
      const {param} = req.body
      const approve = 0

     const sql = "UPDATE task_giver SET submit_status = ?  WHERE task_id = ?";

     db.query(sql,[approve,param],(err,result) =>{
      
     if (err) console.log (err);
     console.log(result)
     res.send('Task reset')
     console.log('Task reset')
     })
 
     } 


   // Delete Task

   DeleteTask =  async (req,res) =>{

    const {param} = req.body

    const sql = "DELETE FROM task_giver WHERE task_id = ?  "
    db.query(sql,[param],(err,result) =>{
    if (err) console.log (err);
    console.log(result)
   res.send(' Task Deleted')
   console.log(' Task Deleted')
    })

    }

    UpdateTaskss = async (req,res) =>{
            
      const {param,Task1,Task2,Task3} = req.body
     

     const sql = "UPDATE task_giver SET Task1 = ?,Task2 = ?,Task3 = ?  WHERE task_id = ?";

     db.query(sql,[Task1,Task2,Task3,param],(err,result) =>{
      
     if (err) console.log (err);
     console.log(result)
     res.send('Task Updated')
     console.log('Task Updated')
     })
 
     } 

     Logout =  (req, res) => {
      
      if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.status(400).send('Unable to log out')
          } else {
            res.send('Logout successful')
          }
        });
      } else {
        res.end()
      }
    }

 module.exports = {RegisterSupervisor,TaskGiverFunc,AdminUserLoginRequest1,AdminUserLoginRequest2,Get_All_Users,DeleteUser,Enable_User,
  Disenable_User,Get_Task_Data,Updatetask,Reassign,DeleteTask,get_all_task_data_done,UpdateTaskss,Logout}

