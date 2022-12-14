const Yup = require('yup')


const RegisterUsers = Yup.object({

    Fname : Yup.string().required("required!"),
    Lname : Yup.string().required("required!"),
    Mobile : Yup.string().required("required!"),
    Email : Yup.string().required("required!"),
    UserType : Yup.string().required("required!"),
    Psswrd : Yup.string().required("required!")

  })

  const TaskGiver = Yup.object({

    task_name : Yup.string().required("required!"),
    task_date_given : Yup.string().required("required!"),
    assinged_task_to : Yup.string().required("required!"),
    employee_fullname : Yup.string().required("required!")

  })





  module.exports = {RegisterUsers,TaskGiver}