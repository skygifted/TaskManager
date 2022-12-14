import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AccountContextData } from "../components/Context/AccountContext";

function Logout() {
  const Navigate = useNavigate();
  const { LoginStatus, setLoginStatus, User, setUser } =
    React.useContext(AccountContextData);

  const LogoutAdminUser = () => {
    setLoginStatus(false);
    axios
      .delete("http://localhost:5000/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data);
        setUser({ loggedIn: false });
        setLoginStatus(false);
        Navigate("/*");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="absolute logout-btn-con right-5">
      <Button
        onClick={LogoutAdminUser}
        sx={{ textTransform: "capitalize" }}
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
