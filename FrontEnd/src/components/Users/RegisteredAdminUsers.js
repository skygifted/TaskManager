import * as React from "react";
import { AccountContextData } from "../Context/AccountContext";
import ProgressSpinner from "../ProgressSpinner";
import AllAdminUsers from "./AllAdminUsers";
const url = "http://localhost:5000/admin/getallusers";

export default function RegisteredAdminUsers() {

 
  const { Refresh } = React.useContext(AccountContextData);
  const [OderData, setOderData] = React.useState(null);
  const [ShowSpin, setShowSpin] = React.useState(false);


  React.useEffect(() => {
    setShowSpin(true);
    fetch(url)
      .catch((err) => console.log(err.message))
      .then((res) => res.json())
      .then((data) => {
        setOderData({ data });
        setShowSpin(false);
      });
  },[Refresh]);

  return (
    <div className="accpt-con2">
      {ShowSpin && (
        <div className="spin-con">
          {" "}
          <ProgressSpinner />{" "}
        </div>
      )}

      {OderData &&
        OderData.data.map((info, key) => {
          return <AllAdminUsers OderInfo={info} mykey={key} />;
        })}
    </div>
  );
}
