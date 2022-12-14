import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AccountContextData } from "./Context/AccountContext";
import { CircleRounded } from "@mui/icons-material";

function RefreshDash() {
  
  const {  setRefresh,Refresh } =
    React.useContext(AccountContextData);

  const RefreshDash = () => {
       setRefresh(!Refresh);
        toast.success('Dashboard refreshed');
  };

  return (
    <div className="absolute logout-btn-con left-5">
      <Button
        onClick={RefreshDash}
        sx={{ textTransform: "capitalize",background: 'darkblue' }}
        variant="contained"
      >
        Refresh <CircleRounded/>
      </Button>
    </div>
  );
}

export default RefreshDash;
