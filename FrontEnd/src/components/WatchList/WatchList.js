import React from 'react'
import { AccountContextData } from "../Context/AccountContext";
import AllTaskTodo from './AllTaskTodo';

const url = "http://localhost:5000/admin/get_all_task_data";


function WatchList() {


    const { Refresh } = React.useContext(AccountContextData);
    const [OderData, setOderData] = React.useState(null);
  

   
  
    React.useEffect(() => {
      
      fetch(url)
        .catch((err) => console.log(err.message))
        .then((res) => res.json())
        .then((data) => {
          setOderData({ data });
          
        });
    },[Refresh]);

  return (
    <div className='watchList-con Section Account-con'>



       <div className='inner-watchlist-con'>
         
         <div className='all_task_to_do'>
            
         {OderData &&
        OderData.data.map((info, key) => {
          return <AllTaskTodo OderInfo={info} mykey={key} />;
        })} 
         </div>


       </div>




    </div>
  )
}

export default WatchList