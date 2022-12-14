const {TaskGiver} = require('./YupValidator')



const Task_form_Validator = (req,res,next) =>{

    const allValues = req.body
  
    TaskGiver.validate(allValues).catch(err =>{
         res.status(422).send()
        console.log(err.errors)
    }).then(valid => {
        if(valid){
           // res.status(200).send()
            console.log("Task form passed validation")
            next()
        }else{
            res.status(422).send() 
        }
    })
}


module.exports = {Task_form_Validator}