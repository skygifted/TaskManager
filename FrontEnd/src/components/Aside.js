import React, { useState, useEffect, useContext } from "react";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineTransaction } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import { BiRepost } from "react-icons/bi";
import { BsCurrencyExchange } from "react-icons/bs";
import { MdDynamicFeed } from "react-icons/md";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { AccountContextData } from "./Context/AccountContext";
const url = "http://localhost:5000/user/countoder/";

function Aside() {
  const [ExchangeAlert, setExchangeAlert] = useState(null);
  const [Test,setTest] = useState(true)
  const {
    Refresh,
    setRefresh,
    setNoder,
    LoginStatus,
    User,
  } = useContext(AccountContextData);

  const Timercount = setInterval(() => {
    setRefresh(!Refresh);
  }, 800000);

  useEffect(() => {
    fetch(url)
      .catch((err) => console.log(err.message))
      .then((res) => res.json())
      .then((data) => {
        setExchangeAlert(JSON.stringify(data[0].amount));
        setNoder(JSON.stringify(data[0].amount));
        return () => clearInterval(Timercount);
      });
  }, [Refresh]);

  if (LoginStatus) {
    return (
      <div className="Aside">
        <div className="Aside-ul-Con-">
          <div className="ul">
            {User.UserType === "Admin" && (

              <Link to="/Section">
                <li className="flex">
                  <b>
                    <HiOutlineUsers />
                  </b>
                  Users
                </li>
              </Link>
            )}

            {
              (User.UserType === "Supervisor" || User.UserType === "Admin" ) &&
           
           <Link to='/Post'>
            <li className="flex">
              <b>
                <BiRepost />
              </b>
              Post Task
            </li> 
            </Link>
            }


            <Link to="/WatchList">
              <li className="flex lis-con">
                <b>
                  <AiOutlineTransaction />{" "}
                </b>
                WatchList
                {ExchangeAlert == 0 ? (
                  ""
                ) : (
                  <div className="badge-con">
                    {ExchangeAlert !== null && (
                      {/* <Badge badgeContent={ExchangeAlert} color="secondary">
                        <MailIcon color="white" />
                      </Badge> */}
                    )}
                  </div>
                )}
              </li>
            </Link>

            <Link to="/TaskDone">
              <li className="flex lis-con">
              <b>
                <MdDynamicFeed />
              </b>
              Task done
              <div className="badge-con">
           <Badge badgeContent={0} color="secondary">
          <MailIcon color="white" />
        </Badge> 
              </div>
            </li>
               </Link>
        

          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default Aside;
