import * as React from "react";
import { AccountContextData } from "./Context/AccountContext";
import ProgressSpinner from "./ProgressSpinner";
import MakePost from "./Post/MakePost";
import PostedData from "./Post/PostedData";

const url = "http://localhost:5000/user/Oder/";

function Post() {
  const { setAddHeight, Refresh, Noder } = React.useContext(AccountContextData);
  const [OderData, setOderData] = React.useState(null);
  const [ShowSpin, setShowSpin] = React.useState(false);
  const [Update, setUpdate] = React.useState(false);

  const HandlHeight = () => {
    setAddHeight(true);
    //  setUpdate(!Update)
  };

  const HandlHeightRemove = () => {
    setAddHeight(!Update);
  };

  const FetchOders = () => {
    setShowSpin(true);
    fetch(url)
      .catch((err) => console.log(err.message))
      .then((res) => res.json())
      .then((data) => {
        setOderData({ data });
        setShowSpin(false);
      });
  };

  React.useEffect(() => {
    FetchOders();
  }, [Refresh]);

  return (
    <div className="Section general-con exchange-con">
      <div
        onMouseLeave={HandlHeightRemove}
        onMouseEnter={HandlHeight}
        className="inner-exchange-con"
      >
        <div className="ex-user-con-inner">
          <MakePost />
        </div>
      </div>

     {/*  <div className="inner-exchange-con2">
        <h1 className="text-center h2">Posted Task</h1>
        <div className="ex-reqst-con-inner2">
          <PostedData />
        </div>
      </div> */}
    </div>
  );
}

export default Post;
