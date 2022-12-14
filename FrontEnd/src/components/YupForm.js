const Yup = require("yup")


  const AdminUserForm = Yup.object({
    Fname: Yup.string().required("required!"),
    Lname: Yup.string().required("required!"),
    Mobile: Yup.string().required("required!"),
    Email: Yup.string().required("required!"),
    UserType : Yup.string().required("required"),
    Psswrd: Yup.string().required("required!"),
    Rpt_Psswrd: Yup.string().required("required!")

 })

 const UserLogin = Yup.object({
  Email: Yup.string().required("required!"),
  Password: Yup.string().required("required!"),
})
const MakePostForm = Yup.object({
  Task1: Yup.string().required("required!"),
  TextMsg: Yup.string().required("required!")
})
 module.exports = {AdminUserForm,UserLogin,MakePostForm}