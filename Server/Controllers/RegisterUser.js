const {RegisterUsers} = require('./YupValidator')



const Rigester_User_form_Validator = (req,res,next) =>{

    const allValues = req.body
  
    RegisterUsers.validate(allValues).catch(err =>{
         res.status(422).send()
        console.log(err.errors)
    }).then(valid => {
        if(valid){
           // res.status(200).send()
            next()
            console.log("Registration form passed validation")
        }else{
            res.status(422).send() 
        }
    })
}


module.exports =  {Rigester_User_form_Validator}