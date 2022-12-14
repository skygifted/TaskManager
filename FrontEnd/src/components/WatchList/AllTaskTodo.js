import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from '@mui/material/Switch';
import { AccountContextData } from "../Context/AccountContext";
import axios from "axios";
import { toast } from "react-toastify";



const url = "http://localhost:5000/admin/updatetask/";
const url2 = "http://localhost:5000/admin/reassign/";
const url3 = "http://localhost:5000/admin/deletetask/";
const url4 = "http://localhost:5000/admin/update_task_s/";

export default function AllTaskTodo(props, mykey) {
  const [expanded, setExpanded] = React.useState(false);
  const { Refresh, setRefresh,User } = React.useContext(AccountContextData);
  const [Des,setDes] = React.useState("")
  const [checked, setChecked] = React.useState(false);
  const [Task1,setTask1] = React.useState()
  const [Task2,setTask2] = React.useState()
  const [Task3,setTask3] = React.useState()

  const handleChangeChkh = (event) => {
    setChecked(event.target.checked);
  };

  const EnableUser = (param) => {

    const paramData = {
      param: param,
      Des : Des
    };
    axios.put(url, paramData).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      setRefresh(!Refresh);
    });
  };

  const Reassign = (param) => {
    const paramData = {
      param: param,
    };
    axios.put(url2, paramData).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      setRefresh(!Refresh);
    });
  };

  const DeleteTask = (param) => {
    const paramData = {
      param: param,
    };
    axios.put(url3, paramData).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      setRefresh(!Refresh);
    });
  };

  const UpdateTasks = (param) => {
    const paramData = {
      param: param,
      Task1 : Task1,
      Task2 : Task2,
      Task3 : Task3
    };
    axios.put(url4,paramData).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      setRefresh(!Refresh);
    });
  };

  const Headerdata = [
    "Task to do",
    "Task Completation data",
    "Supervisor Description",
    "Company Provided Account",
    "Employee data",
    "Transfer Aprroval",
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const subhead = {
    backgroundColor: "rgb(228, 228, 228)",
    fontWeight: "800",
    color: "rgb(68, 58, 4)",
  };

  return (
    <div key={mykey} className="request-ex-con">
      <style>
        {`
     .MuiButton-textSizeMedium:hover{
       color: white;
     }  `}
      </style>

      <Accordion
        sx={{ bgcolor: expanded ? "rgb(68, 58, 4)" : "" }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            sx={{
              width: "30vw",
              fontWeight: expanded ? "800" : "",
              color: expanded ? "white" : "text.secondary",
            }}
          >
            {props.OderInfo.Employee_fname + "  " + props.OderInfo.Employee_lname}
            <p className="">
              {"Task ID"+" "+ props.OderInfo.task_id}{" "}
              <span className="ml-1">
                {props.OderInfo.submit_status === "1" ? (
                  <span style={{ color: "green" }}>Submitted Task</span>
                ) : (
                  <span style={{ color: "blue" }}>New Task</span>
                )}
              </span>
            </p>
            {
            
            }{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            sx={{
              width: "100%",
              maxWidth: "auto",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            <li>
              <ul>
                <ListSubheader sx={subhead}>{`${Headerdata[4]}`}</ListSubheader>

                <ListItem>
                  {" "}
                  <small>
                    <b>Employee ID:</b>
                  </small>{" "}
                  <small className="ml-2"> {props.OderInfo.employee_id}</small>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <small>
                    <b>Full name:</b>
                  </small>{" "}
                  <small className="ml-2">
                    {props.OderInfo.Employee_fname + " " + props.OderInfo.Employee_lname}
                  </small>{" "}
                </ListItem>


                <ListSubheader sx={subhead}>{`${Headerdata[2]}`}</ListSubheader>

                <ListItem>
                  {" "}
                  <small>
                    <b>Task Description:</b>
                  </small>{" "}
                  <small className="ml-2">
                    {props.OderInfo.TextMsg}
                  </small>{" "}
                </ListItem>
               
    
                <ListSubheader sx={subhead}>{`${Headerdata[0]}`}</ListSubheader>
                  
                   <ListItem>
                    {
                      User.UserType === "Admin" &&
                      <label>Switch to update Tasks</label>
                    }
                   
                </ListItem>
                
                <ListItem>
                  {
                     User.UserType === "Admin" &&
                     <Switch
                     checked={checked}
                     onChange={handleChangeChkh}
                     inputProps={{ 'aria-label': 'controlled' }}
                     />
                  }
                </ListItem>
                
                  {

                  checked  === false &&
                    <>
                        <ListItem>
                  {" "}
                  <small>
                    <b>Task 1:</b>
                  </small>{" "}
                  <small className="ml-2">{props.OderInfo.Task1}</small>{" "}
                </ListItem>
                
                <ListItem>
                  {" "}
                  <small>
                    <b>Task 2:</b>
                  </small>{" "}
                  <small className="ml-2">{props.OderInfo.Task2}</small>{" "}
                </ListItem>

                <ListItem>
                  {" "}
                  <small>
                    <b>Task 3:</b>
                  </small>{" "}
                  <small className="ml-2">{props.OderInfo.Task3}</small>{" "}
                </ListItem>
                    </>
                  }
              

              {
                  checked  === true &&
                <>
                
                
                <ListItem>
                  {" "}
                  <small>
                  <b>Task 1:</b>
                  </small>{" "}
                  <small className="ml-2"> 
                   <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Task"
                  value={Task1}
                  onChange={(e)=> setTask1(e.target.value)}
                  />
                  </small>{" "}
                </ListItem>
                
                <ListItem>
                  {" "}
                  <small>
                  <b>Task 2:</b>
                  </small>{" "}
                  <small className="ml-2"> 
                   <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Task"
                  value={Task2}
                  onChange={(e)=> setTask2(e.target.value)}
                  />
                  </small>{" "}
                </ListItem>

                <ListItem>
                  {" "}
                  <small>
                  <b>Task 3:</b>
                  </small>{" "}
                  <small className="ml-2">
                  <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Task"
                  value={Task3}
                  onChange={(e)=> setTask3(e.target.value)}
                  />
                  </small>{" "}
                </ListItem>

                <ListItem>
                  {" "}
                  <small>
                  <b>Update Tasks:</b>
                  </small>{" "}
                  <small className="ml-2">  <Button
                        onClick={() => UpdateTasks(props.OderInfo.task_id)}
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        disabled={ props.OderInfo.submit_status === '1' ? true: false}
                      >
                        {" "}
                         Update Task
                        {" "}
                      </Button>
                
                  </small>{" "}
                </ListItem>
                
                      
                
                
                </>
              }
            

                <ListSubheader sx={subhead}>{`${Headerdata[1]}`}</ListSubheader>
                

                <ListItem>
                  {" "}
                  <div className="mb-3">
                  <label className="form-label con-textarea"><b>Description:</b></label>
                  <textarea 
                  readOnly = { props.OderInfo.submit_status === '0' ? false: true}
                  name="TextMsg"
                  className="form-control  shadow-md"
                  rows="10"
                  value={Des}
                  onChange={(e)=> setDes(e.target.value)}
               
                  />
{/*                   { formik.touched.TextMsg&& formik.errors.TextMsg ? <p className='required-p'>{formik.errors.TextMsg}</p> : null} */}
                  </div>
             {" "}
                </ListItem>
                  
                         

                <ListItem>


                  {" "}
                  <small>
                    <b>Status:</b>
                  </small>{" "}
                  <small className="ml-2">
                  <Button
                        onClick={() => EnableUser(props.OderInfo.task_id)}
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        disabled={ props.OderInfo.submit_status === '1' ? true: false}
                      >
                        {" "}
                         {props.OderInfo.submit_status === '1' ? "Task submitted": "Submit Task"}
                        {" "}
                      </Button>
                       <span className="ml-2">
                       {User.UserType === "Admin" && 
                        <Button
                        onClick={() => Reassign(props.OderInfo.task_id)}
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        disabled={ props.OderInfo.submit_status === '0' ? true: false}
                      >
                        {" "}
                         Reassign Task
                        {" "}
                      </Button> }
                     
                       </span>

                       <span className="ml-2">
                       {User.UserType === "Admin" && 
                        <Button
                        onClick={() => DeleteTask(props.OderInfo.task_id)}
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        disabled={ props.OderInfo.submit_status === '1' ? true: false}
                      >
                        {" "}
                         Delete Task
                        {" "}
                      </Button> }
                     
                       </span>
                  </small>
                </ListItem>





              </ul>
            </li>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
