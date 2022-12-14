import React, { useState, useContext,useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { MakePostForm } from "../YupForm";
import { AccountContextData } from "../Context/AccountContext";
import ProgressSpinner from "../ProgressSpinner";
import Switch from '@mui/material/Switch';
import axios from 'axios'
const url = "http://localhost:5000/employee/get_all_employee_for_task";



function MakePost() {
  const [Task_ID, setTask_ID] = useState(Math.floor(Math.random() * 1676870));
  const [DisBtn, setDisBtn] = useState(false);
  const [Spin, setSpin] = useState(false);
  const { setRefresh, Refresh,User} = useContext(AccountContextData);
  const [checked, setChecked] = useState(false);
  const [Choose,setChoose] = useState()
  const [OderData, setOderData] = React.useState(null);
  const [Employee_ID, setEmployee_ID] = React.useState("");
  const [Employee_fname, setEmployee_fname] = React.useState("");
  const [Employee_lname, setEmployee_lname] = React.useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


   useEffect(()=>{
       
   
    axios.get("http://localhost:5000/employee/get_employee_data/"+Choose).then((res) => {
      setEmployee_fname(res.data[0].Fname);
        setEmployee_lname(res.data[0].Lname)
        setEmployee_ID(res.data[0].user_ID)
     
    });

   },[Choose])


   useEffect(()=>{
       
    fetch(url)
    .catch((err) => console.log(err.message))
    .then((res) => res.json())
    .then((data) => {
      setOderData({ data });
      //setShowSpin(false);
    });
        
   },[])
 
   const formik = useFormik({
    initialValues: {
      Task1: "",
      Task2: "",
      Task3: "",
      TextMsg: ""
    },
    validationSchema: MakePostForm,
    
    onSubmit: async (values, actions) => {
      setDisBtn(true);
      setSpin(true);
      //---------------------------------
      
      const allValues = {...values,
        UserType:User.UserType,
        task_id:Task_ID,
        employee_email: Choose,
        employee_id : Employee_ID,
        employee_fname : Employee_fname,
        employee_lname : Employee_lname,
        userTokenID:User.UserTokenID,
      };

      //--------------------------------------

        fetch("http://localhost:5000/admin/add_task", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allValues),
        })
          .catch((err) => {
            console.log(err);
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            actions.resetForm();
            toast.success(data.status);
            setDisBtn(false);
            setSpin(false);
            setRefresh(!Refresh);
            setTask_ID(Math.floor(Math.random() * 1676870))
          });
    },
  });

  return (
    <div className="w-80 flex justify-center self-center MakePost-con">
      {Spin && (
        <div className="ad-us-con-Post">
          <ProgressSpinner />
        </div>
      )}
      <h3 className="text-center mb-2 mt-2 h3">Post</h3>
      <small id="emailHelp" class="form-text text-muted">
        Post a Task to Employee
      </small>
      <form className="w-96" onSubmit={formik.handleSubmit}>
   
        <div class="form-group">
          <label className="pt-2 pb-2">
            <b> Choose an Employee for a Task</b>
          </label>
         
          <select
            className="form-select"
            value={Choose}
            onChange={(e)=> setChoose(e.target.value)}
            name="Choose"
          >
             <option value="">
              Choose...
            </option>
            <option disabled value="">
              ------------------------------------- 
            </option>
              {
             OderData !== null &&  OderData.data.map((list,index) =>{
               const {Email,user_ID} = list
                return(
                  <option key={index}>{Email}</option>
                ) 
            })
          }
          
          </select>
        </div>

       
 
        
        
        <label className="form-label mt-2 con-textarea">Slipt work for an Employee into micro tasks <b>Optional:</b></label>
          <p> <label>Slipt</label>
        <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
         /></p>
        <div class="form-group">
          <label className="pt-2 pb-2">
            <b>Task 1</b>
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Task"
            value={formik.values.Task1}
            name="Task1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Task1 && formik.errors.Task1 ? (
            <p className="required-p">{formik.errors.Task1}</p>
          ) : null}
        </div>
         
          {   
             checked &&
             <>
        <div class="form-group">
          <label className="pt-2 pb-2">
            <b>Task 2</b>
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Task"
            value={formik.values.Task}
            name="Task2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
         
        </div>
        <div class="form-group">
          <label className="pt-2 pb-2">
            <b>Task 3</b>
          </label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Task"
            value={formik.values.Task3}
            name="Task3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
         
        </div>    
     
             </>
          }

        <div className="mb-3">
            <label className="form-label con-textarea"><b>Description:</b></label>
            <textarea
            name="TextMsg"
            className="form-control  shadow-md"
            rows="10"
            value={formik.values.TextMsg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
               />
            { formik.touched.TextMsg&& formik.errors.TextMsg ? <p className='required-p'>{formik.errors.TextMsg}</p> : null}
             </div>
        <button
          disabled={DisBtn}
          type="submit"
          class="btn btn-primary bg-emerald-900 "
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default MakePost;
