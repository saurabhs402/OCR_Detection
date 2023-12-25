import { useState,useEffect } from "react";
import UserTable from "./UserTable";
import axios from 'axios';
const OcrHistory = ({ history }) => {

 const [userData, setUserData] = useState([]);

 const fetchData=()=>{
  // Fetch user data from your API endpoint
    axios.get('http://localhost:5000/getUsers')
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching user data:', error));
 }

  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <UserTable data={userData} refetchData={fetchData} />
    </div>
  );
};

export default OcrHistory;
