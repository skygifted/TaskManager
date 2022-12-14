import React from 'react'
import { AccountContextData } from "../Context/AccountContext";
import AllTaskDone from './AllTaskDone';

const url = "http://localhost:5000/admin/get_all_task_data_done";


function TaskDone() {


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
    <div className='watchList-con Section Account-con'>



       <div className='inner-watchlist-con'>
         
         <div className='all_task_to_do'>
            
         {OderData &&
        OderData.data.map((info, key) => {
          return <AllTaskDone OderInfo={info} mykey={key} />;
        })} 
         </div>


       </div>




    </div>
  )
}

export default TaskDone