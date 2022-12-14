import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";




export default function AllPost(props, mykey) {
  const [expanded, setExpanded] = React.useState(false);
  //const { Refresh, setRefresh } = React.useContext(AccountContextData);

 

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
                  
                </ListItem>
               


              </ul>
            </li>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
