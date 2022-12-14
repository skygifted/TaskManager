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
import { AccountContextData } from "../Context/AccountContext";
import axios from "axios";
import { toast } from "react-toastify";


const url = "http://localhost:5000/admin/enableuser/";
const url2 = "http://localhost:5000/admin/disenableuser/";
const url3 = "http://localhost:5000/admin/deleteuser/";

export default function AllAdminUsers(props, mykey) {
  const [expanded, setExpanded] = React.useState(false);
  const { Refresh, setRefresh } = React.useContext(AccountContextData);

  const EnableUser = (param) => {
    const paramData = {
      param: param,
    };
    axios.put(url, paramData).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      setRefresh(!Refresh);
    });
  };

  const DisenableUser = (param) => {
    const paramData = {
      param: param,
    };
    axios.put(url2, paramData).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      setRefresh(!Refresh);
    });
  };

  const DeleteUser = (param) => {
    const paramData = {
      param: param,
    };
    axios.put(url3, paramData).then((res) => {
      console.log(res.data);
      toast.success(res.data);
      setRefresh(!Refresh);
    });
  };

  const Headerdata = [
    "Currency",
    "Receive Methode",
    "Transfer Information",
    "Company Provided Account",
    "User Information",
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
            {props.OderInfo.Fname + " " + props.OderInfo.Lname}
            <p className="">
              {props.OderInfo.UserType}{" "}
              <span className="ml-1">
                {props.OderInfo.acc_status === "1" ? (
                  <span style={{ color: "green" }}>Active</span>
                ) : (
                  <span style={{ color: "red" }}>Deactive</span>
                )}
              </span>
            </p>
            {
              <span className="notApp">
                <sub>{props.OderInfo.registerDate}</sub>
              </span>
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
                    <b>User ID:</b>
                  </small>{" "}
                  <small className="ml-2"> {props.OderInfo.user_ID}</small>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <small>
                    <b>Full name:</b>
                  </small>{" "}
                  <small className="ml-2">
                    {props.OderInfo.Fname + " " + props.OderInfo.Lname}
                  </small>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <small>
                    <b>Mobile:</b>
                  </small>{" "}
                  <small className="ml-2">{props.OderInfo.Mobile}</small>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <small>
                    <b>Email:</b>
                  </small>{" "}
                  <small className="ml-2">{props.OderInfo.Email}</small>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <small>
                    <b>User Type:</b>
                  </small>{" "}
                  <small className="ml-2">{props.OderInfo.UserType}</small>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <small>
                    <b>Register Date:</b>
                  </small>{" "}
                  <small className="ml-2">{props.OderInfo.registerDate}</small>{" "}
                </ListItem>
                <ListItem>
                  {" "}
                  <small>
                    <b>Status:</b>
                  </small>{" "}
                  <small className="ml-2">
                    {props.OderInfo.acc_status == 0 ? (
                      <Button
                        onClick={() => EnableUser(props.OderInfo.userTokenID)}
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                      >
                        {" "}
                        Enable{" "}
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          DisenableUser(props.OderInfo.userTokenID)
                        }
                        sx={{
                          textTransform: "capitalize",
                          background: "rgba(119, 34, 34, 0.87)",
                        }}
                        variant="contained"
                      >
                        {" "}
                        Disenable{" "}
                      </Button>
                    )}

                    <Button
                      onClick={() => DeleteUser(props.OderInfo.userTokenID)}
                      sx={{
                        marginLeft: "1em",
                        textTransform: "capitalize",
                        background: "rgba(119, 34, 34, 0.87)",
                      }}
                      variant="contained"
                    >
                      Remove
                    </Button>
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
