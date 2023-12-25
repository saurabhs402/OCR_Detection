import { useState,useEffect } from "react";
import UserTable from "./UserTable";
import axios from 'axios';
const OcrHistory = ({ history }) => {

 const [userData, setUserData] = useState([]);

 const fetchData=()=>{
  // Fetch user data from your API endpoint
    axios.get('https://ocr-backend-kx3u.onrender.com/getUsers')
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching user data:', error));
 }
 function refresh(){
  
  window.location.reload();

 }

  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-1">
      <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">User Table</h1>
          <button onClick={refresh} className="flex items-center px-4 mb-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-400 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80">
            <svg className="w-5 h-5 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span className="mx-1">Refresh</span>
          </button>
      </div>
      <UserTable data={userData} refetchData={fetchData} />

       
      
    </div>
  );
};

export default OcrHistory;
